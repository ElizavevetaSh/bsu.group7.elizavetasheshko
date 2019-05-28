function display() {
  // eslint-disable-next-line default-case
  switch (localStorage.state) {
    case '0': {
      localStorage.user = '';
      dom.setPageUser('');
      DisplayFeed();
      displayGuest();
      displayPosts();
      break;
    }
    case '1': {
      DisplayLogIn();
      break;
    }
    case '2': {
      dom.setPageUser(localStorage.user);
      DisplayFeed();
      displayPosts();
      break;
    }
    case '3': {
      DisplayAddForm();
      break;
    }
  }
}

display();
