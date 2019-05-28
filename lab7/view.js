/* eslint-disable class-methods-use-this */
class View {
  setUser(user) {
    this._user = user;
    const username = document.getElementById('username');
    username.innerHTML = user;
    const addButton = document.getElementById('add_button');
    addButton.style.display = 'inline';
    const loginButton = document.getElementById('log_in_button');
    loginButton.style.display = 'none';
    const logoutButton = document.getElementById('log_out_button');
    logoutButton.style.display = 'inline';
  }

  _generatePostHTML(post) {
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let postHTML = `<div class="post">
    <div class="post_img"><img alt="${post.description}" style = "object-position: 50% 0;" src=${post.photoLink}></div>
    <div class="post_data">
        <div class="post_auth">${post.author}</div>
        <div class="post_date">${months[post.createdAt.getMonth()]} ${post.createdAt.getDate()}, 
        ${post.createdAt.getFullYear()}</div>
        <div class="post_description">${post.description}</div>
        <div class="tags">`;
    for (let i = 0; i < post.tags.length; i++) {
      postHTML += `<div class="tag">${post.tags[i]}</div>`;
    }
    postHTML += `</div>
        <div class="post_menu">`;
    if (post.likes.includes(this._user)) {
      postHTML += `<img OnClick="dom.pressLike('${post.id}')" style="height: 1.7em; object-fit: contain; " src="images/liked.PNG">`;
    } else {
      postHTML += `<img OnClick="dom.pressLike('${post.id}')" style="height: 1.7em; object-fit: contain; " src="images/not_liked.PNG">`;
    }
    postHTML += `<div class="likes">${post.likes.length}</div>`;
    if (post.author === this._user) {
      postHTML += `<button OnClick="DisplayEditForm('${post.id}')">edit</button>
        <button OnClick="dom.removePost('${post.id}')">delete</button>`;
    }
    postHTML += `    </div>
    </div>
    </div>`;
    return postHTML;
  }

  pushBackPost(post) {
    const feed = document.getElementById('feed');
    const postInFeed = document.createElement('post');
    postInFeed.id = `${post.id}post`;
    postInFeed.innerHTML = this._generatePostHTML(post);
    feed.appendChild(postInFeed);
  }

  removePost(id) {
    const list = document.getElementById('feed');
    const elem = document.getElementById(`${id}post`);
    list.removeChild(elem);
  }

  editPost(id, post) {
    const elem = document.getElementById(`${id}post`);
    elem.innerHTML = this._generatePostHTML(post);
    console.log(elem.innerHTML);
  }

  insertPost(post, nextId) {
    const feed = document.getElementById('feed');
    const postInFeed = document.createElement('postInFeed');
    postInFeed.id = `${post.id}post`;
    postInFeed.innerHTML = this._generatePostHTML(post);
    feed.insertBefore(postInFeed, feed.children[nextId]);
  }
}
