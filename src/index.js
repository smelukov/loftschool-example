/* ДЗ 2 - работа с исключениями и отладчиком */

/*
 Задача 1:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isAllTrue(array, fn) {

    if (!Array.isArray(array) || array.length < 1) throw 'empty array';
    if (typeof(fn) !== 'function') throw 'fn is not a function';

    for (var i = 0, len = array.length; i < len; i++) {
        var y = fn(array[i]);
        
        if (y === false) {
            return false;
        }
    }

    return true;

}

/*
 Задача 2:
 Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива
 Необходимо выбрасывать исключение в случаях:
 - array не массив или пустой массив (с текстом "empty array")
 - fn не является функцией (с текстом "fn is not a function")
 Зарпещено использовать встроенные методы для работы с массивами
 */
function isSomeTrue(array, fn) {

    if (!(array instanceof Array) || array.length < 1) throw 'empty array';
    if (typeof(fn) !== 'function') throw 'fn is not a function';

    for (var i = 0, len = array.length; i < len; i++) {
        var y = fn(array[i]);
        
        if (y) {
            return true;
        }
    }

    return false;
}

/*
 Задача 3:
 Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запусти fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn, ...args) {

    if (typeof(fn) !== 'function') throw 'fn is not a function';

    var errors = [];

    for (var i = 0, len = args.length; i < len; i++) {
        try {
            fn(args[i]);
        } catch (e) {
            errors.push(args[i]);
        }
    }

    return errors;
}

/*
 Задача 4:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданными аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
    if (typeof number !== 'number') throw 'number is not a number';

    var calc = {
        sum: function(...args) {
            for (var i = 0, len = args.length; i < len; i++) {
                if (typeof args[i] !== 'number') throw 'argument is not a number';

                number += args[i];
            }

            return number;
        },

        dif: function(...args) {
            for (var i = 0, len = args.length; i < len; i++) {
                if (typeof args[i] !== 'number') throw 'argument is not a number';

                number -= args[i];
            }

            return number;
        },
        
        div: function(...args) {
            for (var i = 0, len = args.length; i < len; i++) {
                if (typeof args[i] !== 'number') throw 'argument is not a number';
                if (args[i] === 0) throw 'division by 0';

                number /= args[i];
            }

            return number;
        },

        mul: function(...args) {
            for (var i = 0, len = args.length; i < len; i++) {
                if (typeof args[i] !== 'number') throw 'argument is not a number';

                number *= args[i];
            }

            return number;
        },
    }

    return calc;
}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
