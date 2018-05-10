import { assert } from 'chai';
import { randomValue } from '../helper';
import {
    createDivWithText,
    prepend,
    findAllPSiblings,
    findError,
    deleteTextNodes,
    deleteTextNodesRecursive,
    collectDOMStat,
    observeChildNodes
} from '../src/index';

function random(type) {
    let result = randomValue(type);

    if (type == 'string') {
        return encodeURIComponent(result);
    }

    return result;
}

describe('ДЗ 4 - Работа с DOM', () => {
    describe('createDivWithText', () => {
        it('должна возвращать элемент с тегом DIV', () => {
            let text = random('string');
            let result = createDivWithText(text);

            assert.instanceOf(result, Element);
            assert.equal(result.tagName, 'DIV');
        });

        it('должна добавлять текст в элемент', () => {
            let text = random('string');
            let result = createDivWithText(text);

            assert.equal(result.innerText, text);
        });
    });

    describe('prepend', () => {
        it('должна добавлять элемент в начало', () => {
            let where = document.createElement('div');
            let what = document.createElement('p');
            let whereText = random('string');
            let whatText = random('string');

            where.innerHTML = `, <b>${whereText}</b>!`;
            what.innerText = whatText;

            prepend(what, where);

            assert.equal(where.firstChild, what);
            assert.equal(where.innerHTML, `<p>${whatText}</p>, <b>${whereText}</b>!`);
        });
    });

    describe('findAllPSiblings', () => {
        it('должна возвращать массив с элементами, соседями которых являются P', () => {
            let where = document.createElement('div');
            let result;

            where.innerHTML = '<div></div><p></p><span></span><span></span><p></p>';
            result = findAllPSiblings(where);

            assert.isTrue(Array.isArray(result));
            assert.deepEqual(result, [where.children[0], where.children[3]]);
        });
    });

    describe('findError', () => {
        it('должна возвращать массив из текстового содержимого элементов', () => {
            let where = document.createElement('div');
            let text1 = random('string');
            let text2 = random('string');
            let result;

            where.innerHTML = ` <div>${text1}</div>, <div>${text2}</div>!!!`;
            result = findError(where);

            assert.isTrue(Array.isArray(result));
            assert.deepEqual(result, [text1, text2]);
        });
    });

    describe('deleteTextNodes', () => {
        it('должна удалить все текстовые узлы', () => {
            let where = document.createElement('div');

            where.innerHTML = ` <div></div>${random('string')}<p></p>${random('string')}`;
            deleteTextNodes(where);

            assert.equal(where.innerHTML, '<div></div><p></p>');
        });
    });

    describe('deleteTextNodesRecursive', () => {
        it('должна рекурсивно удалить все текстовые узлы', () => {
            let where = document.createElement('div');
            let text1 = random('string');
            let text2 = random('string');
            let text3 = random('string');

            where.innerHTML = `<span> <div> <b>${text1}</b> </div> <p>${text2}</p> ${text3}</span>`;
            deleteTextNodesRecursive(where);

            assert.equal(where.innerHTML, '<span><div><b></b></div><p></p></span>');
        });
    });

    describe('collectDOMStat', () => {
        it('должна вернуть статистику по переданному дереву', () => {
            let where = document.createElement('div');
            let class1 = `class-${random('number')}`;
            let class2 = `class-${random('number')}-${random('number')}`;
            let text1 = random('string');
            let text2 = random('string');
            let stat = {
                tags: { P: 1, B: 2 },
                classes: { [class1]: 2, [class2]: 1 },
                texts: 3
            };
            let result;

            where.innerHTML = `<p class="${class1}"><b>${text1}</b> <b class="${class1} ${class2}">${text2}</b></p>`;
            result = collectDOMStat(where);
            assert.deepEqual(result, stat);
        });
    });

    describe('observeChildNodes', () => {
        it('должна вызывать fn при добавлении элементов в указанный элемент', done => {
            let where = document.createElement('div');
            let fn = info => {
                assert.isObject(info, 'info должен быть объектом');
                assert.equal(info.type, targetInfo.type, `info.type должен быть равен ${targetInfo.type}`);
                assert.isTrue(Array.isArray(info.nodes), 'info.nodes должен быть массивом');
                assert.equal(info.nodes.length, targetInfo.nodes.length, 'некорректный размер info.nodes');
                assert.deepEqual(targetInfo.nodes, info.nodes);
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
                assert.isObject(info, 'info должен быть объектом');
                assert.equal(info.type, targetInfo.type, `info.type должен быть равен ${targetInfo.type}`);
                assert.isTrue(Array.isArray(info.nodes), 'info.nodes должен быть массивом');
                assert.equal(info.nodes.length, targetInfo.nodes.length, 'некорректный размер info.nodes');
                assert.deepEqual(targetInfo.nodes, info.nodes);
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
                assert.isObject(info, 'info должен быть объектом');
                assert.equal(info.type, targetInfo.type, `info.type должен быть равен ${targetInfo.type}`);
                assert.isTrue(Array.isArray(info.nodes), 'info.nodes должен быть массивом');
                assert.equal(info.nodes.length, targetInfo.nodes.length, 'некорректный размер info.nodes');
                assert.deepEqual(targetInfo.nodes, info.nodes);
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
                assert.isObject(info, 'info должен быть объектом');
                assert.equal(info.type, targetInfo.type, `info.type должен быть равен ${targetInfo.type}`);
                assert.isTrue(Array.isArray(info.nodes), 'info.nodes должен быть массивом');
                assert.equal(info.nodes.length, targetInfo.nodes.length, 'некорректный размер info.nodes');
                assert.deepEqual(targetInfo.nodes, info.nodes);
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
