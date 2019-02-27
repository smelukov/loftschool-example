import assert from 'assert';
import {
    addListener,
    removeListener,
    skipDefault,
    emulateClick,
    delegate,
    once
} from '../src/index';

describe('ДЗ 5.1 - DOM Events', () => {
    describe('addListener', () => {
        it('должна добавлять обработчик событий элемента', () => {
            let target = document.createElement('div');
            let eventName = 'click';
            let passed = false;
            let fn = () => passed = true;

            addListener(eventName, target, fn);

            assert(!passed);
            target.dispatchEvent(new CustomEvent(eventName));
            assert(passed);
        });
    });

    describe('removeListener', () => {
        it('должна удалять обработчик событий элемента', () => {
            let target = document.createElement('div');
            let eventName = 'click';
            let passed = false;
            let fn = () => passed = true;

            target.addEventListener(eventName, fn);

            removeListener(eventName, target, fn);

            target.dispatchEvent(new CustomEvent(eventName));
            assert(!passed);
        });
    });

    describe('skipDefault', () => {
        it('должна добавлять такой обработчик, который предотвращает действие по умолчанию', () => {
            let target = document.createElement('div');
            let eventName = 'click';
            let result;

            skipDefault(eventName, target);

            result = target.dispatchEvent(new CustomEvent(eventName, { cancelable: true }));
            assert(!result);
        });
    });

    describe('emulateClick', () => {
        it('должна эмулировать клик по элементу', () => {
            let target = document.createElement('div');
            let eventName = 'click';
            let passed = false;
            let fn = () => passed = true;

            target.addEventListener(eventName, fn);

            emulateClick(target);

            assert(passed);
        });
    });

    describe('delegate', () => {
        it('должна добавлять обработчик кликов, который реагирует только на клики по кнопкам', () => {
            let target = document.createElement('div');
            let eventName = 'click';
            let passed = false;
            let fn = () => passed = true;

            target.innerHTML = '<div></div><a href="#"></a><p></p><button></button>';

            delegate(target, fn);

            assert(!passed);
            target.children[0].dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
            assert(!passed);
            target.children[1].dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
            assert(!passed);
            target.children[2].dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
            assert(!passed);
            target.children[3].dispatchEvent(new CustomEvent(eventName, { bubbles: true }));
            assert(passed);
        });
    });

    describe('once', () => {
        it('должна добавлять обработчик кликов, который сработает только один раз и удалится', () => {
            let target = document.createElement('div');
            let eventName = 'click';
            let passed = 0;
            let fn = () => passed++;

            once(target, fn);

            assert.equal(passed, 0);
            target.dispatchEvent(new CustomEvent(eventName));
            assert.equal(passed, 1);
            target.dispatchEvent(new CustomEvent(eventName));
            assert.equal(passed, 1);
            target.dispatchEvent(new CustomEvent(eventName));
        });
    });
});
