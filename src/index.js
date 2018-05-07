/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    for (let i = 0; i < array.length; i++) {
        fn(array[i], i, array);
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    let newArray = [];

    for (let i = 0; i < array.length; i++) {
        newArray.push(fn(array[i], i, array));
    }

    return newArray;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    let result = 0;
    if (typeof initial !== 'undefined') {
        result = fn(initial, array[0], 0, array);
    }
    for (let i = 1; i < array.length; i++) {
        let preVal = result;
        if (typeof initial === 'undefined' && i === 1) {
            preVal = array[0];
        }
        result = fn(preVal, array[i], i, array);
    }

    return result
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    return Object.keys(obj).map(val => val.toUpperCase());
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    let newArray = [];

    let f = from || 0;
    let t = to;
    
    if (typeof to === 'undefined' || to === null){
        t = array.length;
    }
    
    if (f < 0 ) {
        f = array.length + f;
        if (f < 0) {
            f = 0;
        }
    }

    if (t < 0) {
        t = array.length + t;
        if (t < 0) {
            return [];
        }
    }

    if (t > array.length) {
        t = array.length;
    }

    for (let i = f; i < t; i++) {
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

    let handler = {
        set: (obj, prop, val) => { 
            obj[prop] = Math.pow(val,2); 
            return true; 
        }
    };
    return new Proxy(obj, handler);
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
