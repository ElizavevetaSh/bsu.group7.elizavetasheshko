const DisplayAddForm = () => {
  const main = document.getElementsByClassName('main')[0];
  const feed = document.getElementById('feed');
  const filters = document.getElementsByClassName('filters')[0];
  const loadMore = document.getElementById('load_more');
  const menu = document.getElementsByClassName('menu')[0];
  if (feed) { feed.remove(); }
  if (filters) { filters.remove(); }
  if (loadMore) { loadMore.remove(); }
  if (menu) { menu.style.display = 'none'; }

  const addPhoto = document.createElement('div');
  addPhoto.classList.add('addPhoto');
  const now = new Date();
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  addPhoto.innerHTML = `<div class="post">
      <div class="post_img">
          <div class ="DragDropText">Drag&drop or click here to incert a picture.</div>
          <input class="DragDropInput" type="file" accept="image/*" onchange="displayPhotoInAddForm(this.parentNode)" >
          <img class="background" style="display: none; ">
      </div>
      <div class="post_data" style="width: 100%">
        <div class="post_auth">${localStorage.user}</div>
        <div class="post_date">${months[now.getMonth()]} ${now.getDate()}, 
        ${now.getFullYear()}</div>
        <div class="post_description"><textarea placeholder="Provide your posts with description, so others can appreciate your photos even more." class="description"></textarea></div>
        <textarea placeholder="Tagging helps other users to find your posts easier. Please start each tag with '#' symbol." class="tags"></textarea>
        <div class="post_menu">
            <button OnClick="pressAddPost()">publish</button>
            <button OnClick="display()">discard</button>
        </div>
    </div>
    </div>`;
  const form = document.createElement('form');
  form.classList.add('addPhotoForm');
  form.appendChild(addPhoto);

  main.insertBefore(form, main.childNodes[1]);
  document.getElementsByClassName('main')[0].style.margin = '70px 0 0 0';
};

function displayPhotoInAddForm(form) {
  const input = document.getElementsByClassName('DragDropInput')[0];
  input.style.display = 'none';
  form.style.height = 'auto';
  const img = document.getElementsByClassName('DragDropInput')[0].files[0];
  const background = form.getElementsByClassName('background')[0];
  background.style.display = 'inline';
  form.getElementsByClassName('background')[0].src = URL.createObjectURL(img);
  form.querySelector('.DragDropText').style.display = 'none';
}

function pressAddPost() {
  const PostTags = document.querySelector('textarea[class="tags"]').value.split('#');
  PostTags.shift();
  const PostDescription = document.querySelector('textarea[class="description"]').value || '';
  let PostPhotoLink;
  const input = document.getElementsByClassName('DragDropInput')[0].files[0];

  if (input) {
    PostPhotoLink = `images/${input.name}`;
  } else {
    return;
  }
  document.getElementsByClassName('main')[0].style.margin = '0';

  DisplayFeed();

  dom.addPost({
    id: `${dom.getPosts().length + 1}`,
    description: PostDescription,
    createdAt: new Date(),
    author: localStorage.user,
    photoLink: PostPhotoLink,
    tags: PostTags,
    likes: [],
  });
}
