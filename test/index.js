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

    describe('collectDOMStat', () => {
        it('должна вернуть статистику по переданному дереву', () => {
            let where = document.createElement('div');
            let stat = {
                tags: { DIV: 1, B: 2 },
                classes: { 'class-1': 2, 'class-2': 1 },
                texts: 3
            };
            let result;

            where.innerHTML = '<div class="class-1"><b>привет!</b> <b class="class-1 class-2">loftschool</b></div>';
            result = collectDOMStat(where);
            assert.deepEqual(result, stat);
        });
    });

    describe('observeChildNodes', () => {
        it('должна вызывать fn при добавлении элементов в указанный элемент', done => {
            let where = document.createElement('div');
            let fn = info => {
                assert(typeof info == 'object' && info, 'info должен быть объектом');
                assert.equal(info.type, targetInfo.type, `info.type должен быть равен ${targetInfo.type}`);
                assert(Array.isArray(info.nodes), 'info.nodes должен быть массивом');
                assert.equal(info.nodes.length, targetInfo.nodes.length, 'некорректный размер info.nodes');
                targetInfo.nodes.forEach(n => assert(info.nodes.indexOf(n) > -1, 'некорректный элемент в info.nodes'));
                done();
            };
            let elementToInsert = document.createElement('div');
            let targetInfo = {
                type: 'insert',
                nodes: [elementToInsert]
            };

            document.body.appendChild(where);

            observeChildNodes(where, fn);
            where.appendChild(elementToInsert);

            document.body.removeChild(where);
        });

        it('должна вызывать fn при добавлении множества элементов в указанный элемент', done => {
            let where = document.createElement('div');
            let fn = info => {
                assert(typeof info == 'object' && info, 'info должен быть объектом');
                assert.equal(info.type, targetInfo.type, `info.type должен быть равен ${targetInfo.type}`);
                assert(Array.isArray(info.nodes), 'info.nodes должен быть массивом');
                assert.equal(info.nodes.length, targetInfo.nodes.length, 'некорректный размер info.nodes');
                targetInfo.nodes.forEach(n => assert(info.nodes.indexOf(n) > -1, 'некорректный элемент в info.nodes'));
                done();
            };
            let elementToInsert1 = document.createElement('div');
            let elementToInsert2 = document.createElement('div');
            let elementToInsert3 = document.createElement('div');
            let targetInfo = {
                type: 'insert',
                nodes: [elementToInsert1, elementToInsert2, elementToInsert3]
            };
            let fragment = new DocumentFragment();

            document.body.appendChild(where);

            fragment.appendChild(elementToInsert1);
            fragment.appendChild(elementToInsert2);
            fragment.appendChild(elementToInsert3);

            observeChildNodes(where, fn);
            where.appendChild(fragment);

            document.body.removeChild(where);
        });

        it('должна вызывать fn при удалении элементов из указанного элемента', done => {
            let where = document.createElement('div');
            let fn = info => {
                assert(typeof info == 'object' && info, 'info должен быть объектом');
                assert.equal(info.type, targetInfo.type, `info.type должен быть равен ${targetInfo.type}`);
                assert(Array.isArray(info.nodes), 'info.nodes должен быть массивом');
                assert.equal(info.nodes.length, targetInfo.nodes.length, 'некорректный размер info.nodes');
                targetInfo.nodes.forEach(n => assert(info.nodes.indexOf(n) > -1, 'некорректный элемент в info.nodes'));
                done();
            };
            let elementToRemove = document.createElement('div');
            let targetInfo = {
                type: 'remove',
                nodes: [elementToRemove]
            };

            document.body.appendChild(where);

            where.appendChild(elementToRemove);
            observeChildNodes(where, fn);
            where.removeChild(elementToRemove);

            document.body.removeChild(where);
        });

        it('должна вызывать fn при удалении множества элементов из указанного элемента', done => {
            let where = document.createElement('div');
            let fn = info => {
                assert(typeof info == 'object' && info, 'info должен быть объектом');
                assert.equal(info.type, targetInfo.type, `info.type должен быть равен ${targetInfo.type}`);
                assert(Array.isArray(info.nodes), 'info.nodes должен быть массивом');
                assert.equal(info.nodes.length, targetInfo.nodes.length, 'некорректный размер info.nodes');
                targetInfo.nodes.forEach(n => assert(info.nodes.indexOf(n) > -1, 'некорректный элемент в info.nodes'));
                done();
            };
            let elementToRemove1 = document.createElement('div');
            let elementToRemove2 = document.createElement('div');
            let elementToRemove3 = document.createElement('div');
            let targetInfo = {
                type: 'remove',
                nodes: [elementToRemove1, elementToRemove2, elementToRemove3]
            };

            document.body.appendChild(where);

            where.appendChild(elementToRemove1);
            where.appendChild(elementToRemove2);
            where.appendChild(elementToRemove3);

            observeChildNodes(where, fn);
            where.innerHTML = '';

            document.body.removeChild(where);
        });
    });
});
