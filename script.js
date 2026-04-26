const flavorOptions = [
  { name: 'Minty Dream', emoji: '🍃', colors: ['#d3fff2', '#b9f7e8', '#92ead4'] },
  { name: 'Strawberry Swirl', emoji: '🍓', colors: ['#ffb7c5', '#ff91a8', '#ff6f94'] },
  { name: 'Blueberry Blast', emoji: '🫐', colors: ['#cde0ff', '#a6c6ff', '#8dbdff'] },
  { name: 'Vanilla Cloud', emoji: '🍦', colors: ['#fff7d8', '#fff0b0', '#ffe590'] },
  { name: 'Mango Magic', emoji: '🥭', colors: ['#ffe8a5', '#ffd37b', '#ffb953'] }
];

const toppingOptions = [
  { name: 'Chocolate Chips', emoji: '🍫', badge: '🍫' },
  { name: 'Rainbow Sprinkles', emoji: '🌈', badge: '🌈' },
  { name: 'Cookie Crumbs', emoji: '🍪', badge: '🍪' },
  { name: 'Caramel Drip', emoji: '🥄', badge: '🥄' },
  { name: 'Cherry Pop', emoji: '🍒', badge: '🍒' }
];

const flavorContainer = document.getElementById('flavorOptions');
const toppingContainer = document.getElementById('toppingOptions');
const selectedFlavorText = document.getElementById('selectedFlavor');
const selectedToppingText = document.getElementById('selectedTopping');
const toppingBadge = document.getElementById('toppingBadge');
const toast = document.getElementById('toast');
const orderButton = document.getElementById('orderButton');
const surpriseButton = document.getElementById('surpriseButton');
const scoop1 = document.querySelector('.scoop-1');
const scoop2 = document.querySelector('.scoop-2');
const scoop3 = document.querySelector('.scoop-3');

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
      updateVisual();
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
      updateVisual();
      renderOptions();
    });
    toppingContainer.appendChild(button);
  });
}

function updateSummary() {
  selectedFlavorText.textContent = selectedFlavor.name;
  selectedToppingText.textContent = selectedTopping.name;
}

function updateVisual() {
  scoop1.style.background = selectedFlavor.colors[0];
  scoop2.style.background = selectedFlavor.colors[1];
  scoop3.style.background = selectedFlavor.colors[2];
  toppingBadge.textContent = selectedTopping.badge;
}

function randomizeCone() {
  const flavorIndex = Math.floor(Math.random() * flavorOptions.length);
  const toppingIndex = Math.floor(Math.random() * toppingOptions.length);
  selectedFlavor = flavorOptions[flavorIndex];
  selectedTopping = toppingOptions[toppingIndex];
  updateSummary();
  updateVisual();
  renderOptions();
  showToast(`Surprise combo: ${selectedFlavor.name} with ${selectedTopping.name}!`);
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2200);
}

orderButton.addEventListener('click', () => {
  showToast(`Ordered: ${selectedFlavor.name} with ${selectedTopping.name}!`);
});

surpriseButton.addEventListener('click', () => {
  randomizeCone();
});

renderOptions();
updateSummary();
updateVisual();
