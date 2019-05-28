const DisplayEditForm = (id) => {
  const main = document.getElementsByClassName('main')[0];
  const feed = document.getElementById('feed');
  const filters = document.getElementsByClassName('filters')[0];
  const loadMore = document.getElementById('load_more');
  const menu = document.getElementsByClassName('menu')[0];
  if (feed) { feed.remove(); }
  if (filters) { filters.remove(); }
  if (loadMore) { loadMore.remove(); }
  if (menu) { menu.style.display = 'none'; }

  const post = dom.getPost(id);
  const editPhoto = document.createElement('div');
  editPhoto.classList.add('editPhoto');
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  let tagsText = '';
  post.tags.forEach((element) => {
    tagsText += `#${element}`;
  });
  editPhoto.innerHTML = `<div class="post">
            <div class="post_img"><img alt="${post.description}" style = "object-position: 50% 0;" src=${post.photoLink}></div>
            <div class="post_data">
            <div class="post_auth">${post.author}</div>
            <div class="post_date">${months[post.createdAt.getMonth()]} ${post.createdAt.getDate()}, 
            ${post.createdAt.getFullYear()}</div>
  
          <div class="post_description"><textarea placeholder="Provide your posts with description, so others can appreciate your photos even more." class="description">${post.description}</textarea></div>
          <textarea placeholder="Tagging helps other users to find your posts easier. Please start each tag with '#' symbol." class="tags">${tagsText}</textarea>
          <div class="post_menu">
              <button OnClick="pressEditPost('${id}')">publish</button>
              <button OnClick="display()">discard</button>
          </div>
      </div>
      </div>`;
  const form = document.createElement('form');
  form.classList.add('editPhotoForm');
  form.appendChild(editPhoto);

  main.insertBefore(form, main.childNodes[1]);
  document.getElementsByClassName('main')[0].style.margin = '70px 0 0 0';
};

function pressEditPost(id) {
  const PostTags = document.querySelector('textarea[class="tags"]').value.split('#');
  PostTags.shift();
  const PostDescription = document.querySelector('textarea[class="description"]').value || '';
  document.getElementsByClassName('main')[0].style.margin = '0';
  DisplayFeed();
  let post = dom.getPost(id);
  dom.editPost(post.id, {
    description: PostDescription,
    tags: PostTags,
  });
  post = dom.getPost(id);
}
