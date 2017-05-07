/* ДЗ 1 - Функции */

/*
 Задание 1:

 Функция должна принимать один аргумент и возвращать его
 */
function returnFirstArgument(arg) {
    return arg;
}

/*
 Задание 2:

 Функция должна принимать два аргумента и возвращать сумму переданных значений
 Значение по умолчанию второго аргумента должно быть 100
 */
function defaultParameterValue(a, b) {
    b = b || 100;

    return a + b;
    // менее кроссбраузерный вариант (ES6):
    // function defaultParameterValue(a, b = 100)
}

/*
 Задание 3:

 Функция должна возвращать все переданные в нее аргументы в виде массива
 Количество переданных аргументов заранее неизвестно
 */
function returnArgumentsArray() {
    var result = [];

    for (var i = 0; i < arguments.length; i++) {
        result.push(arguments[i]);
    }

    return result;
}

/*
 Задание 4:

 Функция должна принимать другую функцию и возвращать результат вызова переданной функции
 */
function returnFnResult(fn) {
    return fn();
}

/*
 Задание 5:

 Функция должна принимать число (значение по умолчанию - 0) и возвращать функцию (F)
 При вызове F, переданное число должно быть увеличено на единицу и возвращено из F
 */
function returnCounter(number) {
    number = number || 0;
    // менее кроссбраузерный вариант (ES6):
    // function returnCounter(number = 0)

    return function() {
        return ++number;
    }
}

/*
 Задание 6 *:

 Функция должна принимать другую функцию (F) и некоторое количество дополнительных аргументов
 Функция должна привязать переданные аргументы к функции F и вернуть получившуюся функцию
 */
function bindFunction(fn) {
    // arguments содержит все параметры, включая переданную функцию.
    // Склонируем массив аргументов без первого элемента.
    var fnArguments = Array.prototype.slice.call(arguments, 1);

    // Встроенный метод работает с фиксированным числом параметров,
    // сделал свой по аналогии с описанным в http://learn.javascript.ru/bind
    return function() {
        return fn.apply(null, fnArguments);
    };
}

export {
    returnFirstArgument,
    defaultParameterValue,
    returnArgumentsArray,
    returnFnResult,
    returnCounter,
    bindFunction
}
