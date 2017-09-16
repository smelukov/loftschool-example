import { assert } from 'chai';
import { delayPromise, loadAndSortTowns } from '../src/index';

describe('ДЗ 6.1 - Асинхронность и работа с сетью', () => {
    describe('delayPromise', () => {
        it('должна возвращать Promise', () => {
            let result = delayPromise(1);

            // в FF + babel есть проблема при проверке instanceof Promise
            // поэтому приходится проверять так
            assert.equal(result.constructor.name, 'Promise');
        });

        it('Promise должен быть resolved через указанное количество секунд', done => {
            let result = delayPromise(1);
            let startTime = new Date();

            result.then(() => {
                assert.isAtLeast(new Date() - startTime, 1000);
                done();
            }).catch(done);
        });
    });

    describe('loadAndSortTowns', () => {
        it('должна возвращать Promise', () => {
            let result = loadAndSortTowns();

            // в FF + babel есть проблема при проверке instanceof Promise
            // поэтому приходится проверять так
            assert.equal(result.constructor.name, 'Promise');
            assert.typeOf(result.then, 'function');
            assert.typeOf(result.catch, 'function');
        });

        it('Promise должен разрешаться массивом из городов', done => {
            /* eslint-disable max-nested-callbacks */
            let result = loadAndSortTowns();

            result.then(towns => {
                assert.isArray(towns, 'должен быть массивом');
                assert.equal(towns.length, 50, 'неверный размер массива');
                towns.forEach((town, i, towns) => {
                    assert.isTrue(town.hasOwnProperty('name'), 'город должен иметь свойтво name');

                    if (i) {
                        assert.isBelow(towns[i - 1].name, town.name, 'города должны быть отсортированы');
                    }
                });
                done();
            }).catch(done);
            /* eslint-enable */
        });
    });
});
