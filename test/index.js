import assert from 'assert';
import {
    returnFirstArgument,
    defaultParameterValue,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    bindFunction
} from '../src/index';

describe('ДЗ 1 - функции', () => {
    describe('returnFirstArgument', () => {
        it('должна возвращать переданный аргумент', () => {
            let result = returnFirstArgument(10);

            assert(result === 10);
        });
    });

    describe('defaultParameterValue', () => {
        it('должна возвращать сумму переданных аргументов', () => {
            let result = defaultParameterValue(10, 20);

            assert(result === 30);
        });

        it('значение по умолчанию второго аргумента должно быть 100', () => {
            let result = defaultParameterValue(10);

            assert(result === 110);
        });
    });

    describe('returnArgumentsArray', () => {
        it('должна возвращать переданные аргументы в виде массива', () => {
            let result;

            result = returnArgumentsArray('привет', 'loftschool');
            assert.deepEqual(result, ['привет', 'loftschool']);

            result = returnArgumentsArray('привет', 'loftschool', '!', '!', '!');
            assert.deepEqual(result, ['привет', 'loftschool', '!', '!', '!']);
        });

        it('должна возвращать пустой массив если нет аргументов', () => {
            let result = returnArgumentsArray();

            assert.deepEqual(result, []);
        });
    });

    describe('returnFnResult', () => {
        it('должна возвращать результат вызова переданной функции', () => {
            function fn() {
                return 100;
            }

            let result = returnFnResult(fn);

            assert(result === 100);
        });
    });

    describe('returnCounter', () => {
        it('должна возвращать функцию', () => {
            let result = returnCounter();

            assert(typeof result === 'function');
        });

        it('возвращаемая функция должна увеличивать переданное число на единицу при каждом вызове', () => {
            let result = returnCounter(10);

            assert(result() === 11);
            assert(result() === 12);
            assert(result() === 13);
        });

        it('значение аргумента должно быть 0 по умолчанию', () => {
            let result = returnCounter();

            assert(result() === 1);
            assert(result() === 2);
            assert(result() === 3);
        });
    });

    describe('bindFunction', () => {
        it('должна возвращать функцию', () => {
            function fn(a, b) {
                return a + b;
            }

            let result = bindFunction(fn);

            assert(typeof result === 'function');
        });

        it('должна привязывать аргументы возвращаемой функции', () => {
            function fn(a, b) {
                return a + b;
            }

            let result = bindFunction(fn, 10, 20);

            assert(result() === 30);
        });
    });
});
