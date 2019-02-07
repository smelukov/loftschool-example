/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */
function forEach(array, fn) {
    let index = 0;

    while (index < array.length) {
        fn(array[index], index, array);
        index++;
    }
}

/*
 Задание 2:

 Напишите аналог встроенного метода map для работы с массивами
 Посмотрите как работает map и повторите это поведение для массива, который будет передан в параметре array
 */
function map(array, fn) {
    const newArr = [];
    let index = 0;

    while (index < array.length) {
        newArr.push(fn(array[index], index, array));
        index++;
    }

    return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
    const arr = [...array];
    let index = 0;
    let previousValue = undefined;

    if (initial) {
        previousValue = initial;
    } else {
        previousValue = arr[0];
        index++;
    }

    while (index < arr.length) {
        previousValue = fn(previousValue, arr[index], index, array);
        index++;
    }

    return previousValue;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
    const upperKeys = [];

    for (let key in obj) {
        upperKeys.push(key.toUpperCase());
    }

    return upperKeys;
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {
    const newArr = [];
    let startIndex = undefined;
    let endIndex = undefined;

    if (from === undefined) {
        startIndex = 0;
    } else {
        if (from >= 0) {
            if (from >= array.length) {
                startIndex = array.length;
            } else {
                startIndex = from;
            }
        }

        if (from < 0) {
            if (from * -1 > array.length) {
                startIndex = 0;
            } else {
                startIndex = array.length - (from * -1);
            }
        }
    }

    if (to === undefined) {
        endIndex = array.length;
    } else {
        if (to > 0) {
            if (to >= array.length) {
                endIndex = array.length;
            } else {
                endIndex = to;
            }
        }

        if (to < 0) {
            if (to * -1 > array.length) {
                endIndex = 0;
            } else {
                endIndex = array.length - (to * -1);
            }
        }
    }

    if (startIndex < endIndex) {
        while (startIndex < endIndex) {
            newArr.push(array[startIndex]);
            startIndex++;
        }
    } else {
        return [];
    }

    return newArr;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
    return new Proxy(obj, {
        set(trapTarget, key, value, receiver) {
            return Reflect.set(trapTarget, key, value ** 2, receiver);
        }
    });
}

export {
    forEach,
    map,
    reduce,
    upperProps,
    slice,
    createProxy
};
