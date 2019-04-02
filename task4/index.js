var methods = (function() {

        function getPhotoPosts (skip = 0 ,top = 10 , filterConfig)  {

            if (typeof skip !== 'number' || typeof top !== 'number') {
                return;
            }

            var posts = this;

            if (typeof filterConfig === 'object') {
                posts = posts.filter( function(post)  {

                    if (filterConfig.hasOwnProperty('createdAt')) {
                       return Date.parse(post.createdAt) === Date.parse(filterConfig.createdAt);
                }

                if (filterConfig.hasOwnProperty('author')) {
                    if (filterConfig.author !== post.author)
                        return false;
                }

                if (filterConfig.hasOwnProperty('tags')) {
                    if (!filterConfig.tags.every(function(tag)  {
                        return post.tags.includes(tag);
                }))
                    return false;
                }
                return true;
            });
            }
            return posts.slice(skip, top + skip);
        }

         function getPhotoPost  (id) {
             var flag = false;
             for (var i = 0; i < photoPosts.length; i++) {
                 if (photoPosts[i].id === id) {
                     flag = true;
                     return photoPosts[i];
                 }
             }
             if (!flag) {
                 console.log("No such ID");
                 return flag;
             }
        }

        function  validatePhotoPost(post) {
            if (typeof post !== 'object') {
                return false;
            }
            if (typeof post.id !== 'string' || post.id === '')
                return false;
            if (typeof post.description !== 'string')
                return false;
            if (!(post.createdAt instanceof Date))
                return false;
            if (typeof post.author !== 'string' || post.author === '')
                return false;
            if (typeof post.photoLink !== 'string' || post.photoLink === '')
                return false;
            if (typeof post.tags === 'undefined' || !Array.isArray(post.tags))
                return false;
            if (typeof post.likes === 'undefined' || !Array.isArray(post.likes))
                return false;

            return true;
        }

         function addPhotoPost(photoPost) {
            if (!photoPost)
                return false;
            this.push(photoPost);
            this.sort(function(post1, post2) {
                return post2.createdAt - post1.createdAt;
        });
            return true;
        }

        function sortPostsByDate(somePost) {
        somePost.sort(function (a, b) {
            if (a.createdAt - b.createdAt < 0) {
                return 1;
            } else {
                return -1;
            }
        });
        }

        function  editPhotoPost(id, photoPost) {
            if (typeof id !== 'string' || id === '' || typeof photoPost !== 'object') {
                return false;
            }
            var post = this.getPhotoPost(id);
            if (post) {

                if (photoPost.hasOwnProperty('description')) {
                    post.description = photoPost.description;
                }
                if (photoPost.hasOwnProperty('photoLink')) {
                    post.photoLink = photoPost.photoLink;
                }
                if (photoPost.hasOwnProperty('tags')) {
                    post.hashTags = photoPost.tags;
                }
                if (photoPost.hasOwnProperty('likes')) {
                    post.likes = photoPost.likes;
                }
                return true;
            }
            return false;
        }

        function removePhotoPost(id) {
            if (typeof id !== 'string' || id === '') {
                return false;
            }
            var posts = this;
            for (var i = 0; i < posts.length; ++i) {
                if(posts[i].id === id) {
                    posts.splice(i, 1);
                    return true;
                }
            }

            return false;
        }

        return{
            getPhotoPosts: getPhotoPosts,
            getPhotoPost: getPhotoPost,
            validatePhotoPost :validatePhotoPost,
            addPhotoPost :addPhotoPost,
            editPhotoPost : editPhotoPost,
            removePhotoPost: removePhotoPost,
        }

}());

for (method in methods) {
    photoPosts.__proto__[method] = methods[method];
}

console.log('getPhotoPosts');
console.log('invalid args: ',photoPosts.getPhotoPosts('arg1','arg2'));
console.log('skip = 3, default top: ', photoPosts.getPhotoPosts(3));
console.log('skip = 4, top = 4: ', photoPosts.getPhotoPosts(4, 4));
console.log('filter by author=\'Elizaveta Sheshko\': ', photoPosts.getPhotoPosts(0,3,{author:'Elizaveta Sheshko'}));
console.log('\n');
console.log('getPhotoPost:');
console.log('invalid argument: ', photoPosts.getPhotoPost(''));
console.log('id=100 (invalid): ', photoPosts.getPhotoPost('100'));
console.log('id = 3: ', photoPosts.getPhotoPost('3'));
console.log('\n');
console.log('validatePhotoPost:');
console.log('valid post: ', photoPosts.validatePhotoPost({
    id: '10',
    description: 'descript',
    createdAt: new Date('2019-02-23T23:00:00'),
    author: 'auth',
    photoLink: 'images/img1.jpg',
    tags: ['tag1'],
    likes: ['likeuser']
}));
console.log('invalid post: ', photoPosts.validatePhotoPost({
    id: '10',
    description: 'descript',
    createdAt: new Date('2019-02-23T23:00:00'),
    author: 'auth',
    photoLink: null,
    tags: ['tag1'],
    likes: ['likeuser']
}));
console.log('\n');
console.log('addPhotoPost:');
console.log('valid post: ', photoPosts.addPhotoPost({
    id: '21',
    description: 'Танго',
    createdAt: new Date('2022-03-05T01:46:00'),
    author: 'person',
    photoLink: 'images/img1.jpg',
    tags: ['hello'],
    likes: []
}));

console.log('all posts after adding:', photoPosts);
console.log('\n')
console.log('editPhotoPost:');
console.log('post with id=\'1\': ', photoPosts.getPhotoPost('1'));
console.log('edit post with id=\'1\': ', photoPosts.editPhotoPost('1', {
    description: 'edited description'
}));
console.log('edited post with id=\'1\': ', photoPosts.getPhotoPost('1'));
console.log('trying to edit with invalid args: ', photoPosts.getPhotoPost('', 1));
console.log('\n');
console.log('removePhotoPost:');
console.log('remove post with id=\'5\': ', photoPosts.removePhotoPost('5'));
console.log('get post with id=\'5\':', photoPosts.getPhotoPost('5'));
console.log('all posts after removing post:', photoPosts);