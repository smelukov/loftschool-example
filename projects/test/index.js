import './index.html';

const button = document.querySelector('#my-button');
const result = document.querySelector('#my-result');

button.addEventListener('click', () => {
  result.textContent = 42;
});
