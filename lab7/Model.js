const dom = (function () {
  return {
    page() {
      pageView = new View();
    },
    setPageUser(user) {
      pageView.setUser(user);
    },
    setPosts(posts) {
      pagePosts = posts;
      actuallAmount = 10;
    },
    getPosts() {
      return pagePosts.getPosts();
    },
    getPost(id) {
      return pagePosts.get(id);
    },
    addPost(post) {
      if (pagePosts.add(post)) {
        save(pagePosts);
        displayPosts();
        return true;
      }
      return false;
    },
    createPage(filterConfig) {
      const feed = document.getElementById('feed');
      feed.childNodes.forEach(el => el.remove());
      feed.innerHTML = '';
      if (actuallAmount < 10) {
        actuallAmount = 10;
      }
      const found = pagePosts.getPage(0, actuallAmount, filterConfig);
      found.forEach((element) => { pageView.pushBackPost(element); });
      actuallAmount = document.getElementsByClassName('post').length;
      if (pagePosts.getPage(actuallAmount, 1, filterConfig).length === 0) {
        const loadMore = document.getElementById('load_more');
        loadMore.style.display = 'none';
      } else {
        const loadMore = document.getElementById('load_more');
        loadMore.style.display = 'flex';
      }
    },
    pressLike(id) {
      if (localStorage.user !== '') {
        if (pagePosts.get(id).likes.includes(localStorage.user)) {
          pagePosts.get(id).likes = pagePosts.get(id).likes.filter(el => el !== localStorage.user);
        } else {
          pagePosts.get(id).likes.push(localStorage.user);
        }
        save(pagePosts);
        displayPosts();
      }
    },
    removePost(id) {
      displayPosts();
      if (pagePosts.remove(id)) {
        save(pagePosts);
        pageView.removePost(id);
        return true;
      }
      return false;
    },
    editPost(id, post) {
      if (pagePosts.edit(id, post)) {
        save(pagePosts);
        pageView.editPost(id, post);
        return true;
      }
      return false;
    },
    loadMorePosts() {
      actuallAmount = document.getElementsByClassName('post').length;
      pagePosts.getPage(actuallAmount, 10, filterConfig).forEach((element) => { pageView.pushBackPost(element); });
      actuallAmount = document.getElementsByClassName('post').length;
      if (pagePosts.getPage(actuallAmount, 1, filterConfig).length === 0) {
        const loadMore = document.getElementById('load_more');
        loadMore.style.display = 'none';
      } else {
        const loadMore = document.getElementById('load_more');
        loadMore.style.display = 'flex';
      }
    },
  };
}());
