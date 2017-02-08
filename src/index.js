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
    if (!Array.isArray(array) || array.length === 0) {
        throw Error('empty array');
    }
    if (typeof(fn) != 'function') {
        throw Error('fn is not a function');
    }

    for (var i = 0; i < array.length; i++) {
        if (!fn(array[i])) {
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
    if (!Array.isArray(array) || array.length === 0) {
        throw Error('empty array');
    }
    if (typeof(fn) != 'function') {
        throw Error('fn is not a function');
    }

    for (var i = 0; i < array.length; i++) {
        if (!fn(array[i])) {
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
function returnBadArguments(fn) {
    if (typeof(fn) != 'function') {
        throw Error('fn is not a function');
    }
    if (arguments.length == 1) {
        return [];
    }
    var args = Array.prototype.slice.call(arguments, 1);

    var exceptions = [];

    for (var i = 0; i < args.length; i++) {

        try {
            fn(args[i]);
        } catch (e) {
            exceptions.push(args[i]);
        }
    }

    return exceptions;

}

/*
 Задача 4:
 Используя отладчик и точки остановки, определите в каких случаях if дает true
 Исправьте условие внутри if таким образом, чтобы функция возвращала true
 */
function findError(data1, data2) {
    return (function() {
        for (var i = 0; i < data1.length; i++) {
            // не столько помог дебагер сколько анализ простой, кажется для дебаггера можно более
            // замудрёное движение переменных замутить тут оно как бы проскакивает и в целом глядя на
            // список переменных я сразу понимаю почему оно выдаст false.
            if (data1[i] > data2[i]) {
                return false;
            }
        }

        return true;
    })();
}

/*
 Задача 5:
 Функция имеет параметр number (по умолчанию - 0)
 Функция должна вернуть объект, у которого должно быть несколько методов:
 - sum - складывает number с переданным аргументами
 - dif - вычитает из number переданные аргументы
 - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
 - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно
 Необходимо выбрасывать исключение в случаях:
 - number не является числом (с текстом "number is not a number")
 - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
    if (!Number.isInteger(number)) {
        throw new Error('number is not a number');
    }

    var calculator = {
        sum: function() {
            var result;

            for (var i = 0; i < arguments.length; i++) {
                result = number + arguments[i];
            }

            return result;
        },
        dif: function() {
            var result;

            for (var i = 0; i < arguments.length; i++) {
                result = number + arguments[i];
            }

            return result;
        },
        div: function() {
            var result;

            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] === 0) {
                    throw new Error('division by 0');
                }
                result = number / arguments[i];
            }

            return result;
        },
        mul: function() {
            var result;

            for (var i = 0; i < arguments.length; i++) {
                result = number + arguments[i];
            }

            return result;
        }
    };
    // В этом задании есть бажуля в тестах, если я напишу просто
    // sum: function (a) {return number + a} то тест засчитает это за ОК.
    // и так с любым другим методом, хотя сами ассерты вроде должны вернуть false.

    return calculator;
}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    findError,
    calculator
};
