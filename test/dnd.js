import assert from 'assert';
let template = require('../dnd-content.hbs');

describe('ДЗ 5.2 - Div D&D', () => {
    let homeworkContainer = document.createElement('div');
    let addDivButton;
    let dndPage;

    homeworkContainer.id = 'homework-container';
    homeworkContainer.innerHTML = template();
    document.body.appendChild(homeworkContainer);
    dndPage = require('../src/dnd');

    describe('Функциональное тестирование', () => {
        describe('createDiv', () => {
            it('должна создавать div с произвольными размерами/позицией/цветом', () => {
                let result = dndPage.createDiv();

                assert(result instanceof Element, 'не элемент');
                assert.equal(result.tagName, 'DIV', 'имя тега не DIV');
                assert.notEqual(result.style.backgroundColor || result.style.background, '', 'не указан цвет фона');
                assert.notEqual(result.style.top, '', 'не указана позиция по оси Y');
                assert.notEqual(result.style.left, '', 'не указана позиция по оси X');
                assert.notEqual(result.style.width, '', 'не указана ширина');
                assert.notEqual(result.style.height, '', 'не указана высота');
            });
        });
    });

    describe('Интеграционное тестирование', () => {
        it('на старнице должна быть кнопка с id addDiv', () => {
            addDivButton = homeworkContainer.querySelector('#addDiv');
            assert(addDivButton instanceof Element, 'не элемент');
            assert.equal(addDivButton.tagName, 'BUTTON', 'имя тега не BUTTON');
        });

        it('создавать div с классом draggable-div при клике на кнопку', () => {
            let divsCount = homeworkContainer.querySelectorAll('.draggable-div').length;
            let newDivsCount;

            addDivButton.dispatchEvent(new MouseEvent('click', { view: window }));
            newDivsCount = homeworkContainer.querySelectorAll('.draggable-div').length;

            assert.equal(newDivsCount - divsCount, 1);
        });
    });
});
