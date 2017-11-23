import { assert } from 'chai';
import { randomValue as random, randomStringArray } from '../helper';
import {
    bindFunction,
    defaultParameterValue,
    returnArgumentsArray,
    returnCounter,
    returnFirstArgument,
    returnFnResult
} from '../src/index';

describe('ДЗ 1 - функции', () => {
    describe('returnFirstArgument', () => {
        it('должна возвращать переданный аргумент', () => {
            let value = random();
            let result = returnFirstArgument(value);

            assert.strictEqual(result, value);
        });
    });

    describe('defaultParameterValue', () => {
        it('должна возвращать сумму переданных аргументов', () => {
            let valueA = random('number');
            let valueB = random('number');
            let result = defaultParameterValue(valueA, valueB);

            assert.strictEqual(result, valueA + valueB);
        });

        it('значение по умолчанию второго аргумента должно быть 100', () => {
            let value = random('number');
            let result = defaultParameterValue(value);

            assert.strictEqual(result, value + 100);
        });
    });

    describe('returnArgumentsArray', () => {
        it('должна возвращать переданные аргументы в виде массива', () => {
            let result;
            let value;

            value = random('array', 1);
            result = returnArgumentsArray(...value);
            assert.deepEqual(result, value);
        });

        it('должна возвращать пустой массив если нет аргументов', () => {
            let result = returnArgumentsArray();

            assert.deepEqual(result, []);
        });
    });

    describe('returnFnResult', () => {
        it('должна возвращать результат вызова переданной функции', () => {
            function fn() {
                return value;
            }

            let value = random();
            let result = returnFnResult(fn);

            assert.strictEqual(result, value);
        });
    });

    describe('returnCounter', () => {
        it('должна возвращать функцию', () => {
            let result = returnCounter();

            assert.typeOf(result, 'function');
        });

        it('возвращаемая функция должна увеличивать переданное число на единицу при каждом вызове', () => {
            let value = random('number');
            let result = returnCounter(value);

            assert.equal(result(), value + 1);
            assert.equal(result(), value + 2);
            assert.equal(result(), value + 3);
        });

        it('значение аргумента должно быть 0 по умолчанию', () => {
            let result = returnCounter();

            assert.equal(result(), 1);
            assert.equal(result(), 2);
            assert.equal(result(), 3);
        });
    });

    describe('bindFunction', () => {
        let valuesArr = randomStringArray();

        function fn(...valuesArr) {
            return [...arguments].join('');
        }

        it('должна возвращать функцию', () => {
            let result = bindFunction(fn);

            assert.typeOf(result, 'function');
        });

        it('должна привязывать любое кол-во аргументов возвращаемой функции', () => {

            let result = bindFunction(fn, ...valuesArr);

            assert.equal(result(), valuesArr.join(''));
        });
    });
});
