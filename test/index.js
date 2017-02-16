import assert from 'assert';
import { isAllTrue, isSomeTrue, returnBadArguments, findError, calculator } from '../src/index';

describe('ДЗ 2 - работа с исключениями и отладчиком', () => {
    describe('isAllTrue', () => {
        it('должна вызывать fn для всех элементов массива', () => {
            let array = [1, 2, 3, 4, 5];
            let pass = [];

            isAllTrue(array, e => pass.push(e));

            assert.deepEqual(pass, array);
        });

        it('должна вернуть true, если fn вернула true для всех элементов массива', () => {
            let array = [1, 2, 3, 4, 5];
            let result = isAllTrue(array, Number.isFinite);

            assert(result === true);
        });

        it('должна выбросить исключение, если передан пустой массив', () => {
            let array = [];

            try {
                isAllTrue(array, Number.isFinite);
                assert(false);
            } catch (e) {
                assert(e.message == 'empty array');
            }
        });

        it('должна выбросить исключение, если передан не массив', () => {
            let array = ':(';

            try {
                isAllTrue(array, Number.isFinite);
                assert(false);
            } catch (e) {
                assert(e.message == 'empty array');
            }
        });

        it('должна выбросить исключение, если fn не функция', () => {
            let array = [1, 2, 3, 4, 5];

            try {
                isAllTrue(array, ':(');
                assert(false);
            } catch (e) {
                assert(e.message == 'fn is not a function');
            }
        });
    });

    describe('isSomeTrue', () => {
        it('должна вернуть true, если fn вернула true хотя бы для эдного из элементов массива', () => {
            let array = ['привет', 'loftschool', 100, '!!!'];
            let result = isSomeTrue(array, Number.isFinite);

            assert(result === true);
        });

        it('должна выбросить исключение, если передан пустой массив', () => {
            let array = [];

            try {
                isSomeTrue(array, Number.isFinite);
                assert(false);
            } catch (e) {
                assert(e.message == 'empty array');
            }
        });

        it('должна выбросить исключение, если передан не массив', () => {
            let array = ':(';

            try {
                isSomeTrue(array, Number.isFinite);
                assert(false);
            } catch (e) {
                assert(e.message == 'empty array');
            }
        });

        it('должна выбросить исключение, если fn не функция', () => {
            let array = [1, 2, 3, 4, 5];

            try {
                isSomeTrue(array, ':(');
                assert(false);
            } catch (e) {
                assert(e.message == 'fn is not a function');
            }
        });
    });

    describe('returnBadArguments', () => {
        it('должна вызывать fn для всех аргументов', () => {
            let args = [1, 2, 3, 4, 5];
            let pass = [];

            returnBadArguments(e => pass.push(e), ...args);

            assert.deepEqual(pass, args);
        });

        it('должна вернуть массив с аргументами, для которых fn выбрасила исключение', () => {
            let badArgs = [1, 3, 5];
            let fn = a => {
                if (a % 2 != 0) {
                    throw new Error('not even');
                }
            };
            let result = returnBadArguments(fn, 1, 2, 3, 4, 5);

            assert.deepEqual(result, badArgs);
        });

        it('должна вернуть массив пустой массив, если не передано дополнительных аргументов', () => {
            let fn = () => ':)';
            let result = returnBadArguments(fn);

            assert.deepEqual(result, []);
        });

        it('должна выбросить исключение, если fn не функция', () => {
            try {
                returnBadArguments(':(');
                assert(false);
            } catch (e) {
                assert(e.message == 'fn is not a function');
            }
        });
    });

    describe('findError', () => {
        it('должна возвращать true', () => {
            let data1 = ['привет', 'loftschool', 10, NaN, '20'];
            let data2 = ['привет', 'loftschool', '10', NaN, 20];

            assert(findError(data1, data2) === true);
        });
    });

    describe('calculator', () => {
        it('должна возвращать объект с методами', () => {
            let calc = calculator();

            assert('sum' in calc, true, 'нет метода sum');
            assert('dif' in calc, true, 'нет метода dif');
            assert('div' in calc, true, 'нет метода div');
            assert('mul' in calc, true, 'нет метода mul');
        });

        it('метод sum должен складывать аргументы', () => {
            let calc = calculator(100);

            assert(calc.sum(1, 2, 3), 106);
        });

        it('метод dif должен вычитать аргументы', () => {
            let calc = calculator(100);

            assert(calc.dif(10, 20), 70);
        });

        it('метод div должен делить аргументы', () => {
            let calc = calculator(100);

            assert(calc.div(2, 2), 25);
        });

        it('метод div должен выбрасывать исключение, если хотя бы один из аргументов равен 0', () => {
            let calc = calculator(100);

            try {
                assert(calc.div(2, 0, 2), 25);
                assert(false);
            } catch (e) {
                assert(e.message == 'division by 0');
            }
        });

        it('метод mul должен умножать аргументы', () => {
            let calc = calculator(100);

            assert(calc.mul(2, 2), 400);
        });

        it('функция должна выбрасывать исключение, если number не является числом', () => {
            try {
                calculator(':(');
                assert(false);
            } catch (e) {
                assert(e.message == 'number is not a number');
            }
        });

        it('значение по умолчанию для аргумента number должно быть равно 0', () => {
            let calc = calculator();

            assert(calc.sum(1, 2, 3), 6);
        });
    });
});
