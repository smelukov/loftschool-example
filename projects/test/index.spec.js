beforeAll(() => {
  require('./index');
});

test('При нажатии на кнопку, DOM-дерево должно быть изменено', () => {
  const button = document.querySelector('#my-button');
  const result = document.querySelector('#my-result');

  button.click();

  expect(result.textContent).toBe('42');
});
