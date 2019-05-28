const DisplayLogIn = () => {
  localStorage.state = '0';
  const feed = document.getElementById('feed');
  const filters = document.getElementsByClassName('filters')[0];
  const loadMore = document.getElementById('load_more');
  const addPhotoForm = document.getElementsByClassName('addPhotoForm')[0];
  const menu = document.getElementsByClassName('menu')[0];
  if (addPhotoForm) { addPhotoForm.remove(); }
  if (feed) { feed.remove(); }
  if (filters) { filters.remove(); }
  if (loadMore) { loadMore.remove(); }
  if (menu) { menu.style.display = 'none'; }
  const main = document.getElementsByClassName('main')[0];
  const logIN = document.createElement('div');
  logIN.classList.add('logIN');
  logIN.innerHTML = `
              <form name="logInForm" "onsubmit="return false;">
                  <input placeholder="username" class="username"/>
                  <input type="password" placeholder="password" class="password"/>
                  <button type="button" class="btn btn-log-in" onclick="checkUser()">log in</button>
              </form>
              `;
  main.insertBefore(logIN, main.childNodes[1]);
};

function checkUser() {
  const form = document.forms.logInForm;
  const name = form[0].value;
  const password = form[1].value;
  const error = document.getElementsByClassName('error')[0];

  for (let i = 0; i < users.length; i++) {
    if (users[i].username === name) {
      if (users[i].password === password) {
        if (error) {
          error.remove();
        }
        localStorage.user = name;
        dom.setPageUser(localStorage.user);
        DisplayFeed();
        displayPosts();
        return true;
      }

      if (!error) {
        const error = document.createElement('div');
        error.classList.add('error');
        error.innerHTML = 'Enter a correct password. Field is case sensitive.';
        form.insertBefore(error, form[2]);
      } else {
        error.innerHTML = 'Enter a correct password. Field is case sensitive.';
      }
      return false;
    }
  }
  if (!error) {
    const error = document.createElement('div');
    error.classList.add('error');
    error.innerHTML = 'Enter a valid username. Fields are case sensitive.';
    form.insertBefore(error, form[2]);
  } else {
    error.innerHTML = 'Enter a valid username. Fields are case sensitive.';
  }
  return false;
}

function logOut() {
  localStorage.state = '0';
  localStorage.user = '';
  const feed = document.getElementById('feed');
  const filters = document.getElementsByClassName('filters')[0];
  const loadMore = document.getElementById('load_more');
  const addPhotoForm = document.getElementsByClassName('addPhotoForm')[0];
  const menu = document.getElementsByClassName('menu')[0];
  if (addPhotoForm) { addPhotoForm.remove(); }
  if (feed) { feed.remove(); }
  if (filters) { filters.remove(); }
  if (loadMore) { loadMore.remove(); }
  if (menu) { menu.style.display = 'none'; }
  dom.setPageUser('');
  DisplayFeed();
  displayGuest();
  displayPosts();
}
