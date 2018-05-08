/* ДЗ 3 - работа с исключениями и отладчиком */

/*
 Задание 1:

 1.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true только если fn вернула true для всех элементов массива

 1.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isAllTrue([1, 2, 3, 4, 5], n => n < 10) // вернет true
   isAllTrue([100, 2, 3, 4, 5], n => n < 10) // вернет false
 */
function isAllTrue(array, fn) {
    let i;
    let length = array.length;
    let isTrue = true;

    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }
    if (array.length === 0) {
        throw new Error('empty array');
    }
    if (!Array.isArray(array)) {
        throw new Error('empty array');
    }

    for (i = 0; i < length; i++) {
        if (!fn(array[i])) {
            isTrue = false;
        }
    }

    return isTrue;
}

/*
 Задание 2:

 2.1: Функция принимает массив и фильтрующую фукнцию и должна вернуть true или false
 Функция должна вернуть true если fn вернула true хотя бы для одного из элементов массива

 2.2: Необходимо выбрасывать исключение в случаях:
   - array не массив или пустой массив (с текстом "empty array")
   - fn не является функцией (с текстом "fn is not a function")

 Зарпещено использовать встроенные методы для работы с массивами

 Пример:
   isSomeTrue([1, 2, 30, 4, 5], n => n > 20) // вернет true
   isSomeTrue([1, 2, 3, 4, 5], n => n > 20) // вернет false
 */
function isSomeTrue(array, fn) {
    let i;
    let isFalse = false;

    if (!Array.isArray(array)) {
        throw new Error('empty array');
    }
    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }
    if (array.length === 0) {
        throw new Error('empty array');
    }

    for (i = 0; i < array.length; i++) {
        if (fn(array[i])) {
            isFalse = true;
        } 
    }

    return isFalse;
}

/*
 Задание 3:

 3.1: Функция принимает заранее неизветсное количество аргументов, первым из которых является функция fn
 Функция должна поочередно запустить fn для каждого переданного аргумента (кроме самой fn)

 3.2: Функция должна вернуть массив аргументов, для которых fn выбросила исключение

 3.3: Необходимо выбрасывать исключение в случаях:
   - fn не является функцией (с текстом "fn is not a function")
 */
function returnBadArguments(fn) {
    let i = 1;
    let argArray = [];

    if (typeof fn !== 'function') {
        throw new Error('fn is not a function');
    }

    for (i; i < arguments.length; i++) {
        try {
            fn(arguments[i]);
        } catch (e) {
            argArray.push(arguments[i]);
        }
    }

    return argArray;
}

/*
 Задание 4:

 4.1: Функция имеет параметр number (по умолчанию - 0)

 4.2: Функция должна вернуть объект, у которого должно быть несколько методов:
   - sum - складывает number с переданными аргументами
   - dif - вычитает из number переданные аргументы
   - div - делит number на первый аргумент. Результат делится на следующий аргумент (если передан) и так далее
   - mul - умножает number на первый аргумент. Результат умножается на следующий аргумент (если передан) и так далее

 Количество передаваемых в методы аргументов заранее неизвестно

 4.3: Необходимо выбрасывать исключение в случаях:
   - number не является числом (с текстом "number is not a number")
   - какой-либо из аргументов div является нулем (с текстом "division by 0")
 */
function calculator(number = 0) {
    if (!isFinite(number)) {
        throw new Error('number is not a number');
    }

    let obj = {
        sum: function(...args) {
            let sum = 0;

            for (let i = 0; i < args.length; i++) {
                sum +=args[i];
            }

            return number + sum;
        },
        dif: function(...args) {
            let dif = 0;

            for (let i = 0; i < args.length; i++) {
                dif +=args[i];
            }

            return number - dif;
        },
        div: function(...args) {

            for (let i = 0; i < args.length; i++) {
                if (args[i] === 0) {
                    throw new Error('division by 0');
                }

                number /= args[i];
            }

            return number ;
        },
        mul: function(...args) {
            let mul = 1;

            for (let i = 0; i < args.length; i++) {
                mul = mul * args[i];
            }

            return number * mul;
        }
    };

    return obj;
}

/* При решении задач, пострайтесь использовать отладчик */

export {
    isAllTrue,
    isSomeTrue,
    returnBadArguments,
    calculator
};
