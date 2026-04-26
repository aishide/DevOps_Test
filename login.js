const loginForm = document.getElementById('loginForm');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const loginError = document.getElementById('loginError');

if (localStorage.getItem('icyyUser')) {
  window.location.href = 'index.html';
}

loginForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!username || !password) {
    loginError.textContent = 'Please enter both username and password.';
    return;
  }

  localStorage.setItem('icyyUser', username);
  window.location.href = 'index.html';
});
