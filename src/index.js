/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    let i;
    let length = array.length;

    for (i = 0; i < length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let i;
    let length = array.length;
    let results = [];

    for (i = 0; i < length; i++) {
        results.push(fn(array[i], i, array));
    }

    return results;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial = array[0]) {
    let i = 0;
    let length = array.length;
    let result = initial;

    if (initial === array[0]) {
        i = 1;
    }

    for (i; i < length; i++) {
        result = fn(result, array[i], i, array);
    }

    return result;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    let elem;
    let newArray = [];

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            elem = key.toUpperCase();
            newArray.push(elem);  
        }
    }

    return newArray;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
    let i = from;
    let length = array.length;
    let end = to;
    let newArray = [];

    if (end >= length) {
        end = length;
    } else if (end < 0) {
        end = length - Math.abs(end);
        if (Math.abs(end) > length) {
            end = 0;
        }
    }

    if (i < 0) {
        i = length - Math.abs(i);
        if (Math.abs(i) > length) {
            i = 0;
        }
    }

    for (i; i < end; i++) {
        newArray.push(array[i]);
    }

    return newArray;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    let proxy = new Proxy(obj, {
        set(obj, prop, value) {
            obj[prop] = value * value;

            return obj;
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
