import assert from 'assert';
import {
    createDivWithText,
    createAWithHref,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
} from '../src/index';

describe('ДЗ 4 - Работа с DOM', () => {
    describe('createDivWithText', () => {
        it('должна возвращать элемент с тегом DIV', () => {
            let text = 'привет!';
            let result = createDivWithText(text);

            assert(result instanceof Element);
            assert.equal(result.tagName, 'DIV');
        });

        it('должна добавлять текст в элемент', () => {
            let text = 'привет!';
            let result = createDivWithText(text);

            assert.equal(result.innerText, text);
        });
    });

    describe('createAWithHref', () => {
        it('должна возвращать элемент с тегом A', () => {
            let href = 'http://loftschool.com';
            let result = createAWithHref(href);

            assert(result instanceof Element);
            assert.equal(result.tagName, 'A');
        });

        it('должна добавлять атрибут href', () => {
            let href = 'http://loftschool.com';
            let result = createAWithHref(href);

            assert.equal(result.getAttribute('href'), href);
        });
    });

    describe('prepend', () => {
        it('должна добавлять элемента в начало', () => {
            let where = document.createElement('div');
            let what = document.createElement('p');

            where.innerHTML = ', <b>loftschool</b>!';
            what.innerText = 'привет';

            prepend(what, where);

            assert.equal(where.firstChild, what);
            assert.equal(where.innerHTML, '<p>привет</p>, <b>loftschool</b>!');
        });
    });

    describe('findAllPSiblings', () => {
        it('должна возвращать массив с элементами, соседями которых являются P', () => {
            let where = document.createElement('div');
            let result;

            where.innerHTML = '<div></div><p></p><span></span><span></span><p></p>';
            result = findAllPSiblings(where);

            assert(Array.isArray(result));
            assert.deepEqual(result, [where.children[0], where.children[3]]);
        });
    });

    describe('findError', () => {
        it('должна возвращать массив из текстового содержимого элементов', () => {
            let where = document.createElement('div');
            let result;

            where.innerHTML = ' <div>привет</div>, <div>loftschool</div>!!!';
            result = findError(where);

            assert(Array.isArray(result));
            assert.deepEqual(result, ['привет', 'loftschool']);
        });
    });

    describe('deleteTextNodes', () => {
        it('должна удалить все текстовые узлы', () => {
            let where = document.createElement('div');

            where.innerHTML = ' <div></div>привет<p></p>loftchool!!!';
            deleteTextNodes(where);

            assert.equal(where.innerHTML, '<div></div><p></p>');
        });
    });

    describe('deleteTextNodesRecursive', () => {
        it('должна рекурсивно удалить все текстовые узлы', () => {
            let where = document.createElement('div');

            where.innerHTML = '<span> <div> <b>привет</b> </div> <p>loftchool</p> !!!</span>';
            deleteTextNodesRecursive(where);

            assert.equal(where.innerHTML, '<span><div><b></b></div><p></p></span>');
        });
    });


});
