/* ДЗ 2 - работа с массивами и объектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    var result = [];

    for (var index = 0; index < array.length; index++) {
        result.push(fn(array[index], index, array));
    }

    return result;
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    var result = [];

    array.forEach((element, index) => {
        result.push(fn(element, index, array));
    })

    return result
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */

function reduce(array, fn, initial) {
    var acc = 0;
    var index;

    if (initial !== undefined) {
        acc = fn (initial, array[0], 0, array);
        index = 1;
    } else {
        acc = fn (array[0], array[1], 1, array);
        index = 2;
    }
    for (var i = index; i < array.length; i++) {
        acc = fn(acc, array[i], i, array);
    }

    return acc;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
     upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */

function upperProps(obj) {
    var arr = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            arr.push(key.toUpperCase())
        }
    }

    return arr;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    var begin, end;
    var result = [];

    if (from === undefined) {
        begin = 0;
    } else if (from < 0) {
        begin = array.length + from;
    } else {
        begin = from;
    }

    if (to === undefined) {
        end = array.length;
    } else if (to < 0) {
        end = array.length + to;
    } else {
        end = to;
    }

    if (end > array.length) {
        end = array.length;
    }
    if (begin < 0) {
        begin = 0;
    }
    if (begin > array.length || end < 0) {
        return result;
    }

    for (var i = begin; i < end; i++) {
        result.push(array[i]);
    }

    return result;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */

function createProxy(obj) {
    var proxy;

    proxy = new Proxy (obj, {
        set (target, prop, value) {
            var result = value*value;

            target[prop] = result;

            return result;
        }
    });

    return proxy;
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};