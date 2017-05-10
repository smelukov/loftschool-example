import { assert } from 'chai';
import { randomNumberArray, randomStringArray, randomValue as random } from '../helper';
import { calculator, isAllTrue, isSomeTrue, returnBadArguments } from '../src/index';

describe('ДЗ 2 - работа с исключениями и отладчиком', () => {
    describe('isAllTrue', () => {
        it('должна вызывать fn для всех элементов массива', () => {
            let array = random('array', 1);
            let pass = [];

            isAllTrue(array, e => pass.push(e));

            assert.deepEqual(pass, array);
        });

        it('должна вернуть true, если fn вернула true для всех элементов массива', () => {
            let array = randomNumberArray();
            let result = isAllTrue(array, Number.isFinite);

            assert.isTrue(result);
        });

        it('должна выбросить исключение, если передан пустой массив', () => {
            assert.throws(isAllTrue.bind(null, [], () => {
            }), 'empty array');
        });

        it('должна выбросить исключение, если передан не массив', () => {
            assert.throws(isAllTrue.bind(':(', () => {
            }), 'empty array');
        });

        it('должна выбросить исключение, если fn не функция', () => {
            let array = randomNumberArray();

            assert.throws(isAllTrue.bind(null, array, ':('), 'fn is not a function');
        });
    });

    describe('isSomeTrue', () => {
        it('должна вернуть true, если fn вернула true хотя бы для одного элемента массива', () => {
            let array = randomStringArray().concat(random('number'));
            let result = isSomeTrue(array, Number.isFinite);

            assert.isTrue(result);
        });

        it('должна выбросить исключение, если передан пустой массив', () => {
            assert.throws(isSomeTrue.bind(null, [], () => {
            }), 'empty array');
        });

        it('должна выбросить исключение, если передан не массив', () => {
            assert.throws(isSomeTrue.bind(':(', () => {
            }), 'empty array');
        });

        it('должна выбросить исключение, если fn не функция', () => {
            let array = randomNumberArray();

            assert.throws(isSomeTrue.bind(null, array, ':('), 'fn is not a function');
        });
    });

    describe('returnBadArguments', () => {
        it('должна вызывать fn для всех элементов массива', () => {
            let array = random('array', 1);
            let pass = [];

            returnBadArguments(e => pass.push(e), ...array);

            assert.deepEqual(pass, array);
        });

        it('должна вернуть массив с аргументами, для которых fn выбрасила исключение', () => {
            let evenNumbers = randomNumberArray('even');
            let oddNumbers = randomNumberArray('odd');
            let fn = a => {
                if (a % 2 != 0) {
                    throw new Error('not even');
                }
            };
            let result = returnBadArguments(fn, ...evenNumbers, ...oddNumbers);

            assert.deepEqual(result, oddNumbers);
        });

        it('должна вернуть массив пустой массив, если не передано дополнительных аргументов', () => {
            let fn = () => ':)';
            let result = returnBadArguments(fn);

            assert.deepEqual(result, []);
        });

        it('должна выбросить исключение, если fn не функция', () => {
            assert.throws(returnBadArguments.bind(null, ':('), 'fn is not a function');
        });
    });

    describe('calculator', () => {
        it('должна возвращать объект с методами', () => {
            let calc = calculator();

            assert.includeMembers(Object.keys(calc), ['sum', 'dif', 'div', 'mul']);
        });

        it('метод sum должен складывать аргументы', () => {
            let initialValue = random('number');
            let calc = calculator(initialValue);
            let args = randomNumberArray();

            assert.strictEqual(calc.sum(...args), args.reduce((prev, current) => prev + current, initialValue));
        });

        it('метод dif должен вычитать аргументы', () => {
            let initialValue = random('number');
            let calc = calculator(initialValue);
            let args = randomNumberArray();

            assert.strictEqual(calc.dif(...args), args.reduce((prev, current) => prev - current, initialValue));
        });

        it('метод div должен делить аргументы', () => {
            let initialValue = random('number');
            let calc = calculator(initialValue);
            let args = randomNumberArray();

            assert.strictEqual(calc.div(...args), args.reduce((prev, current) => prev / current, initialValue));
        });

        it('метод div должен выбрасывать исключение, если хотя бы один из аргументов равен 0', () => {
            let initialValue = random('number');
            let calc = calculator(initialValue);
            let args = [...randomNumberArray(), 0];

            assert.throws(calc.div.bind(null, ...args), 'division by 0');
        });

        it('метод mul должен умножать аргументы', () => {
            let initialValue = random('number');
            let calc = calculator(initialValue);
            let args = randomNumberArray();

            assert.strictEqual(calc.mul(...args), args.reduce((prev, current) => prev * current, initialValue));
        });

        it('функция должна выбрасывать исключение, если number не является числом', () => {
            assert.throws(calculator.bind(null, ':('), 'number is not a number');
        });

        it('значение по умолчанию для аргумента number должно быть равно 0', () => {
            let calc = calculator();
            let args = randomNumberArray();

            assert.strictEqual(calc.sum(...args), args.reduce((prev, current) => prev + current));
        });
    });
});
