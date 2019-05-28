class PostCollection {
  constructor(posts) {
    let _posts = posts;
    this.setPosts = function (postsToSet) { _posts = postsToSet; };
    this.getPosts = () => _posts;
  }

  getPage(skip = 0, top = 10, filterConfig) {
    let posts = this.getPosts();
    posts.sort((p1, p2) => (p2.createdAt - p1.createdAt));
    if (typeof skip !== 'number' || typeof top !== 'number') {
      return [];
    }
    if (typeof filterConfig === 'object') {
      posts = posts.filter((post) => {
        if (filterConfig.hasOwnProperty('dateBegin')) {
          if (Date.parse(post.createdAt) < Date.parse(filterConfig.dateBegin)) {
            return false;
          }
        }
        if (filterConfig.hasOwnProperty('dateEnd')) {
          if (Date.parse(post.createdAt) > Date.parse(filterConfig.dateEnd)) {
            return false;
          }
        }
        if (filterConfig.hasOwnProperty('author')) {
          if (post.author.search(new RegExp(filterConfig.author, 'i')) === -1) { return false; }
        }
        if (filterConfig.hasOwnProperty('tags')) {
          if (!filterConfig.tags.every((tag) => {
            // eslint-disable-next-line no-restricted-syntax
            for (const postTag of post.tags) {
              if (postTag.search(new RegExp(tag, 'i')) !== -1) { return true; }
            }
            return false;
          })) { return false; }
        }
        return true;
      });
    }
    return posts.slice(skip, top + skip);
  }

  get(id) {
    if (typeof id !== 'string' || id === '') {
      return undefined;
    }
    return this.getPosts().find(post => post.id === id);
  }

  static validate(post) {
    if (typeof post !== 'object') { return false; }
    if (typeof post.id !== 'string' || post.id === '') { return false; }
    if (typeof post.description !== 'string') { return false; }
    if (!(post.createdAt instanceof Date)) { return false; }
    if (typeof post.author !== 'string' || post.author === '') { return false; }
    if (typeof post.photoLink !== 'string' || post.photoLink === '') { return false; }
    if (typeof post.tags === 'undefined' || !Array.isArray(post.tags)) { return false; }
    if (typeof post.likes === 'undefined' || !Array.isArray(post.likes)) { return false; }
    return true;
  }

  add(photoPost) {
    if (!this.constructor.validate(photoPost)) { return false; }
    const newPostCollection = this.getPosts();
    newPostCollection.push(photoPost);
    newPostCollection.sort((p1, p2) => (p2.createdAt - p1.createdAt));
    this.setPosts(newPostCollection);
    return true;
  }

  edit(id, photoPost) {
    if (typeof id !== 'string' || id === '' || typeof photoPost !== 'object') {
      return false;
    }
    const post = this.get(id);
    if (post) {
      if (photoPost.hasOwnProperty('description')) { post.description = photoPost.description; }
      if (photoPost.hasOwnProperty('tags')) { post.tags = photoPost.tags; }
      return true;
    }
    return false;
  }

  remove(id) {
    if (typeof id !== 'string' || id === '') { return false; }
    const post = this.get(id);
    if (post !== undefined) {
      const i = this.getPosts().indexOf(post);
      this.getPosts().splice(i, 1);
      return true;
    }
    return false;
  }

  addAll(posts) {
    // eslint-disable-next-line prefer-const
    let notAdded = [];
    for (let index = 0; index < posts.length; index++) {
      if (!this.add(posts[index])) { notAdded.push(posts[index]); }
    }
    return notAdded;
  }
}
