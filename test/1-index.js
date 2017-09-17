import { assert } from 'chai';
import { createWindow, closeWindow, createCookie, deleteCookie } from '../src/index';

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

describe('ДЗ 7.1 - BOM', () => {
    describe('createWindow', () => {
        let newWindow;

        it('должна возвращать окно', () => {
            newWindow = createWindow('test-window-1', 200, 100);
            assert.equal(newWindow.constructor.name, 'Window');
        });

        after(() => {
            if (newWindow && !newWindow.closed) {
                newWindow.close();
            }
        });
    });

    describe('closeWindow', () => {
        let newWindow;

        it('должна закрывать окно', () => {
            newWindow = createWindow('test-window-1', 200, 100);
            closeWindow(newWindow);
            assert.isTrue(newWindow.closed);
        });

        after(() => {
            if (newWindow && !newWindow.closed) {
                newWindow.close();
            }
        });
    });

    describe('createCookie', () => {
        before(() => {
            document.cookie = `test-cookie-name=;expires=${new Date(0)}`
        });

        it('должна создавать cookie', () => {
            let cookies;

            createCookie('test-cookie-name', 'test-cookie-value');
            cookies = getCookies();
            assert.isTrue(cookies.hasOwnProperty('test-cookie-name'));
            assert.equal(cookies['test-cookie-name'], 'test-cookie-value');
        });

        after(() => {
            document.cookie = `test-cookie-name=;expires=${new Date(0)}`
        });
    });

    describe('deleteCookie', () => {
        before(() => {
            document.cookie = `test-cookie-name=;expires=${new Date(0)}`
        });

        it('должна удалять cookie', () => {
            let cookies;

            createCookie('test-cookie-name', 'test-cookie-value');
            deleteCookie('test-cookie-name');
            cookies = getCookies();
            assert.isFalse(cookies.hasOwnProperty('test-cookie-name'));
        });

        after(() => {
            document.cookie = `test-cookie-name=;expires=${new Date(0)}`
        });
    });
});
