const flavorOptions = [
  { name: 'Minty Dream', emoji: '🍃' },
  { name: 'Strawberry Swirl', emoji: '🍓' },
  { name: 'Blueberry Blast', emoji: '🫐' },
  { name: 'Vanilla Cloud', emoji: '🍦' },
  { name: 'Mango Magic', emoji: '🥭' }
];

const toppingOptions = [
  { name: 'Chocolate Chips', emoji: '🍫' },
  { name: 'Rainbow Sprinkles', emoji: '🌈' },
  { name: 'Cookie Crumbs', emoji: '🍪' },
  { name: 'Caramel Drip', emoji: '🥄' },
  { name: 'Cherry Pop', emoji: '🍒' }
];

const flavorContainer = document.getElementById('flavorOptions');
const toppingContainer = document.getElementById('toppingOptions');
const selectedFlavorText = document.getElementById('selectedFlavor');
const selectedToppingText = document.getElementById('selectedTopping');
const toast = document.getElementById('toast');
const orderButton = document.getElementById('orderButton');
const logoutButton = document.getElementById('logoutButton');

let selectedFlavor = flavorOptions[0];
let selectedTopping = toppingOptions[1];

function renderOptions() {
  flavorContainer.innerHTML = '';
  toppingContainer.innerHTML = '';

  flavorOptions.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option' + (option.name === selectedFlavor.name ? ' selected' : '');
    button.innerHTML = `<span>${option.name}</span> <span class="emoji">${option.emoji}</span>`;
    button.addEventListener('click', () => {
      selectedFlavor = option;
      updateSummary();
      renderOptions();
    });
    flavorContainer.appendChild(button);
  });

  toppingOptions.forEach((option) => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'option' + (option.name === selectedTopping.name ? ' selected' : '');
    button.innerHTML = `<span>${option.name}</span> <span class="emoji">${option.emoji}</span>`;
    button.addEventListener('click', () => {
      selectedTopping = option;
      updateSummary();
      renderOptions();
    });
    toppingContainer.appendChild(button);
  });
}

function updateSummary() {
  selectedFlavorText.textContent = selectedFlavor.name;
  selectedToppingText.textContent = selectedTopping.name;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2200);
}

orderButton.addEventListener('click', () => {
  showToast(`Ordered: ${selectedFlavor.name} with ${selectedTopping.name}!`);
});

if (logoutButton) {
  logoutButton.addEventListener('click', () => {
    localStorage.removeItem('icyyUser');
    window.location.href = 'login.html';
  });
}

renderOptions();
updateSummary();
