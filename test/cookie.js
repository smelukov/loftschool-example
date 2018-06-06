import assert from 'assert';
let template = require('../cookie-content.hbs');

function getCookies() {
    return document.cookie
        .split('; ')
        .filter(Boolean)
        .map(cookie => cookie.match(/^([^=]+)=(.+)/))
        .reduce((obj, [, name, value]) => {
            obj[name] = value;

            return obj;
        }, {});
}

describe('ДЗ 7.2 - Cookie editor', () => {
    let homeworkContainer = document.createElement('div');
    let filterNameInput;
    let addNameInput;
    let addValueInput;
    let addButton;
    let listTable;

    homeworkContainer.id = 'homework-container';
    homeworkContainer.innerHTML = template();
    document.body.appendChild(homeworkContainer);
    require('../src/cookie');

    describe('Интеграционное тестирование', () => {
        beforeEach(() => {
            let oldCookies = getCookies();

            Object.keys(oldCookies).forEach(cookie => document.cookie = `${cookie}=;expires=${new Date(0)}`);

            if (listTable) {
                listTable.innerHTML = '';
            }
        });

        it('на старнице должны быть элементы с нужными id', () => {
            filterNameInput = homeworkContainer.querySelector('#filter-name-input');
            addNameInput = homeworkContainer.querySelector('#add-name-input');
            addValueInput = homeworkContainer.querySelector('#add-value-input');
            addButton = homeworkContainer.querySelector('#add-button');
            listTable = homeworkContainer.querySelector('#list-table tbody');

            assert(filterNameInput !== null, 'элемент не найден');
            assert(filterNameInput instanceof Element, 'id элемента должен быть filter-name-input');
            assert(addNameInput !== null, 'элемент не найден');
            assert(addNameInput instanceof Element, 'id элемента должен быть add-name-input');
            assert(addValueInput !== null, 'элемент не найден');
            assert(addValueInput instanceof Element, 'id элемента должен быть add-value-input');
            assert(addButton !== null, 'элемент не найден');
            assert(addButton instanceof Element, 'id элемента должен быть add-button');
            assert(listTable !== null, 'элемент не найден');
            assert(listTable instanceof Element, 'id элемента должен быть list-table');
        });

        it('cookie должны добавляться при нажатии на "добавить"', () => {
            let cookies;

            addNameInput.value = 'test-cookie-name-1';
            addValueInput.value = 'test-cookie-value-1';
            addButton.click();

            cookies = getCookies();
            assert(cookies.hasOwnProperty(addNameInput.value), 'cookie не добавлена в барузер');
            assert.equal(cookies[addNameInput.value], addValueInput.value, 'cookie не добавлена в барузер');
            assert.equal(listTable.children.length, 1, 'cookie не добавлена в таблицу');

            addNameInput.value = 'test-cookie-name-2';
            addValueInput.value = 'test-cookie-value-2';
            addButton.click();

            cookies = getCookies();
            assert(cookies.hasOwnProperty(addNameInput.value), 'cookie не добавлена в барузер');
            assert.equal(cookies[addNameInput.value], addValueInput.value, 'cookie не добавлена в барузер');
            assert.equal(listTable.children.length, 2, 'cookie не добавлена в таблицу');
        });

        it('если при добавлении указано имя существующей cookie, то в таблице не должно быть дублей', () => {
            let cookies;

            addNameInput.value = 'test-cookie-name-1';
            addValueInput.value = 'test-cookie-value-1';
            addButton.click();

            addNameInput.value = 'test-cookie-name-2';
            addValueInput.value = 'test-cookie-value-2';
            addButton.click();

            addNameInput.value = 'test-cookie-name-2';
            addValueInput.value = 'test-cookie-value-2';
            addButton.click();

            cookies = getCookies();
            assert(cookies.hasOwnProperty(addNameInput.value), 'cookie не добавлена в барузер');
            assert.equal(cookies[addNameInput.value], addValueInput.value, 'не изменено значение cookie');
            assert.equal(listTable.children.length, 2, 'в таблице обнаружен дубль');
        });

        it('если при добавлении указано имя существующей cookie, то в таблице должно быть изменено ее значение', () => {
            let rows;
            let changedRow;

            addNameInput.value = 'test-cookie-name-1';
            addValueInput.value = 'test-cookie-value-1';
            addButton.click();

            addNameInput.value = 'test-cookie-name-2';
            addValueInput.value = 'test-cookie-value-2';
            addButton.click();

            addNameInput.value = 'test-cookie-name-2';
            addValueInput.value = 'other-test-cookie-value-2';
            addButton.click();

            rows = [...listTable.children];
            changedRow = rows.filter(row => row.children[1].textContent.trim() == 'other-test-cookie-value-2');
            assert.equal(changedRow.length, 1, 'новое значение для cookie не найдено в таблице');
        });

        it('cookie должны удаляться при нажатии на "удалить"', () => {
            let cookies;
            let deleteButton;

            addNameInput.value = 'test-cookie-name-1';
            addValueInput.value = 'test-cookie-value-1';
            addButton.click();

            addNameInput.value = 'test-cookie-name-2';
            addValueInput.value = 'test-cookie-value-2';
            addButton.click();

            deleteButton = listTable.querySelector('button');

            deleteButton.click();
            cookies = getCookies();
            assert.equal(Object.keys(cookies).length, 1, 'cookie не удалена из браузера');
            assert.equal(listTable.children.length, 1, 'cookie не удалена из таблицы');

            deleteButton = listTable.querySelector('button');
            deleteButton.click();
            cookies = getCookies();
            assert.equal(Object.keys(cookies).length, 0, 'cookie не удалена из браузера');
            assert.equal(listTable.children.length, 0, 'cookie не удалена из таблицы');
        });

        describe('Фильтрация', () => {
            it('выводить список cookie, имя или значение которых соответствует фильтру', () => {
                addNameInput.value = 'test-cookie-name-1';
                addValueInput.value = 'test-cookie-value-1';
                addButton.click();

                addNameInput.value = 'test-cookie-name-2';
                addValueInput.value = 'test-cookie-value-2';
                addButton.click();

                filterNameInput.value = 'test-cookie';
                filterNameInput.dispatchEvent(new KeyboardEvent('keyup'));
                assert.equal(listTable.children.length, 2);

                filterNameInput.value = 'name-1';
                filterNameInput.dispatchEvent(new KeyboardEvent('keyup'));
                assert.equal(listTable.children.length, 1);

                filterNameInput.value = 'name-2';
                filterNameInput.dispatchEvent(new KeyboardEvent('keyup'));
                assert.equal(listTable.children.length, 1);
            });

            it('добавлять cookie в таблицу, только если значение cookie соответствует фильтру', () => {
                let cookies;

                addNameInput.value = 'test-cookie-name-1';
                addValueInput.value = 'test-cookie-value-1';
                addButton.click();

                addNameInput.value = 'test-cookie-name-2';
                addValueInput.value = 'test-cookie-value-2';
                addButton.click();

                filterNameInput.value = 'value-2';
                filterNameInput.dispatchEvent(new KeyboardEvent('keyup'));
                assert.equal(listTable.children.length, 1);

                addNameInput.value = 'test-cookie-name-3';
                addValueInput.value = 'test-cookie-more-value-2';
                addButton.click();

                cookies = getCookies();
                assert(cookies.hasOwnProperty(addNameInput.value), 'должна быть добавлена в браузер');
                assert.equal(cookies[addNameInput.value], addValueInput.value, 'должна быть добавлена в браузер');
                assert.equal(listTable.children.length, 2, 'должна быть в таблице т.к. соответствует фильтру');
            });

            it('не добавлять cookie в таблицу, если значение cookie не соответствует фильтру', () => {
                let cookies;

                addNameInput.value = 'test-cookie-name-1';
                addValueInput.value = 'test-cookie-value-1';
                addButton.click();

                addNameInput.value = 'test-cookie-name-2';
                addValueInput.value = 'test-cookie-value-2';
                addButton.click();

                filterNameInput.value = 'value-2';
                filterNameInput.dispatchEvent(new KeyboardEvent('keyup'));
                assert.equal(listTable.children.length, 1);

                addNameInput.value = 'test-cookie-name-3';
                addValueInput.value = 'test-cookie-value-3';
                addButton.click();

                cookies = getCookies();
                assert(cookies.hasOwnProperty(addNameInput.value), 'должна быть добавлена в браузер');
                assert.equal(cookies[addNameInput.value], addValueInput.value, 'должна быть добавлена в браузер');
                assert.equal(listTable.children.length, 1, 'не должна быть в таблице т.к. не соответствует фильтру');
            });

            it('удалить cookie из табилицы, если ее значение перестало соответствовать фильтр', () => {
                let cookies;

                addNameInput.value = 'test-cookie-name-1';
                addValueInput.value = 'test-cookie-value-1';
                addButton.click();

                addNameInput.value = 'test-cookie-name-2';
                addValueInput.value = 'test-cookie-value-2';
                addButton.click();

                addNameInput.value = 'test-cookie-name-3';
                addValueInput.value = 'test-cookie-value-2';
                addButton.click();

                filterNameInput.value = 'value-2';
                filterNameInput.dispatchEvent(new KeyboardEvent('keyup'));
                assert.equal(listTable.children.length, 2);

                addNameInput.value = 'test-cookie-name-3';
                addValueInput.value = 'test-cookie-value-3';
                addButton.click();

                cookies = getCookies();
                assert(cookies.hasOwnProperty(addNameInput.value), 'должна оставться в браузере');
                assert.equal(cookies[addNameInput.value], addValueInput.value, 'значение в браузере должно измениться');
                assert.equal(listTable.children.length, 1, 'уже не соответствует фильтру и не должна быть в таблице');
            });

            it('выводить все cookie, если фильтр не задан', () => {
                addNameInput.value = 'test-cookie-name-1';
                addValueInput.value = 'test-cookie-value-1';
                addButton.click();

                addNameInput.value = 'test-cookie-name-2';
                addValueInput.value = 'test-cookie-value-2';
                addButton.click();

                filterNameInput.value = '';
                filterNameInput.dispatchEvent(new KeyboardEvent('keyup'));
                assert.equal(listTable.children.length, 2);
            });
        });
    });
});
