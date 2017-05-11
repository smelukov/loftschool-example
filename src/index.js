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
    var x = 0;
    var y = 0;

    if (( array == 0 ) || (array.length <= 0)) {
        throw new Error("empty array");
    } else if (typeof fn != 'function') {
        throw new Error("fn is not a function");
    } else {
        for (var i = 0; i < array.length; i++) {
            var z = fn(array[i]);
            if (z == false) {
                y++;
            } else if (z == true) {
                x++;
            }
            if (array.length == x) {
                return true;
            } else if (y > 0) {
                return false;
            }
        }
    }
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

    var x = 0;

    if (( array == 0 ) || (array.length <= 0)) {
        throw new Error("empty array");
    } else if (typeof fn != 'function') {
        throw new Error("fn is not a function");
    } else {

        for (var i = 0; i < array.length; i++) {
            var z = fn(array[i]);
            if (z == true) {
                x++;
            }
        }

        if (x < 1) {
            return false;
        } else (x >= 1)
        {
            return true;
        }
    }
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
    var x = new Array();
    var z = '';
    if (typeof fn != 'function') {
        throw new Error("fn is not a function");
    }
    for (var i = 1; i < arguments.length; i++) {
        try {
            z = fn(arguments[i]);
        } catch (e) {
            x.push(arguments[i]);
        }
    }
    return x;
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
function calculator(number=0) {

    if (typeof number != 'number') {
        throw new Error("number is not a number");
    }

    var ob = {
        sum: function () {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] === 0) {
                    throw new Error("division by 0");
                }
                number += arguments[i];
            }
            return number;
        },
        dif: function () {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] === 0) {
                    throw new Error("division by 0");
                }
                number -= arguments[i];
            }
            return number;
        },
        div: function () {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] === 0) {
                    throw new Error("division by 0");
                }
                number /= arguments[i];
            }
            return number;
        },
        mul: function () {
            for (var i = 0; i < arguments.length; i++) {
                if (arguments[i] === 0) {
                    throw new Error("division by 0");
                }
                number *= arguments[i];
            }
            return number;
        }
    }
    return ob;
}

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
