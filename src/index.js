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
    checkArray(array); // >> do not repeat yourself === DRY
    checkFunction(fn);

    return getPositiveResultsCount(array, fn) === array.length;
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
    checkArray(array);
    checkFunction(fn);

    return getPositiveResultsCount(array, fn) > 0;
}

/*
 Задача 3:
 Функция принимает заранее неизвестное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запустить fn для каждого переданного аргумента (кроме самой fn)
 Функция должна вернуть массив аргументов, для которых fn выбросила исключение
 Необходимо выбрасывать исключение в случаях:
 - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {
    let otherArgs = Array.slice.call(null, arguments, 1);
    let wrongItems = [];

    checkFunction(fn);

    otherArgs.forEach(function(item) {
        try {
            fn(item);
        } catch (e) {
            wrongItems.push(item);
        }
    });

    return wrongItems;
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
    checkForNumber(number);

    return {
        sum: function() {
            let arr = Array.slice.call(null, arguments);

            return arr.reduce(function(sum, current) {
                checkForNumber(current);

                return sum + current;
            }, number);
        },
        dif: function() {
            let arr = Array.slice.call(null, arguments);

            return arr.reduce(function(result, current) {
                checkForNumber(current);

                return result - current;
            }, number);
        },
        div: function () {
            let arr = Array.slice.call(null, arguments);

            return arr.reduce(function(result, current) {
                checkForNumber(current);

                if (current === 0) {
                    throw new Error('division by 0');
                }

                return result / current;
            }, number);
        },
        mul: function () {
            let arr = Array.slice.call(null, arguments);

            return arr.reduce(function(result, current) {
                checkForNumber(current);

                return result * current;
            }, number);
        }
    }
}

// DRY
function checkArray(arr) {
    if (!Array.isArray(arr) || arr.length === 0) {
        throw new Error('empty array');
    }
}

function checkFunction(fn) {
    if (!isFunction(fn)) {
        throw new Error('fn is not a function');
    }
}

function isFunction(fnToCheck) {
    let checkStr = '[object Function]';

    return fnToCheck && {}.toString.call(fnToCheck) === checkStr;
}

function getPositiveResultsCount(arr, fn) {
    let resultCount = 0;

    for (let i = 0; i < arr.length; i++) {
        if (fn(arr[i])) {
            resultCount++;
        }
    }

    return resultCount;
}

function checkForNumber(num) {
    if (isNaN(parseFloat(num)) || !isFinite(num)) {
        throw new Error('number is not a number');
    }
}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
