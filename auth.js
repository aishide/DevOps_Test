const currentUser = localStorage.getItem('icyyUser');
if (!currentUser) {
  window.location.href = 'login.html';
}

const userNameElement = document.getElementById('userName');
if (userNameElement) {
  userNameElement.textContent = currentUser;
}
