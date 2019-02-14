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
  let newArr = [];

  for (let i = 0; i < array.length; i++) {
    newArr.push(fn(array[i], i, array));
  }

  return newArr;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
  const arr = array;
  let index = 0;
  let firstValue = undefined;

  if (initial !== undefined) {
    firstValue = initial;
  } else {
    firstValue = arr[0];
    index++;
  }

  for (let i = index; i < arr.length; i++) {
    firstValue = fn(firstValue, arr[i], i, array);
  }

  return firstValue;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  const arr = [];

  for (const el in obj) {
    if (obj.hasOwnProperty(el)) {
      arr.push(el.toUpperCase());
    }
  }

  return arr;
}

/*
 Задание 5 *:
 
 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
// function slice(array, from, to) {
// }

/*
 Задание 6 *:
 
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
// function createProxy(obj) {
// }

export {
  forEach,
  map,
  reduce,
  upperProps
};
