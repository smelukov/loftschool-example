/* ДЗ 2 - работа с массивами и объеектами */

/*
 Задание 1:

 Напишите аналог встроенного метода forEach для работы с массивами
 Посмотрите как работает forEach и повторите это поведение для массива, который будет передан в параметре array
 */

function forEach(array, fn) {

  for (var i = 0; i < array.length; i++) {
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

  for (var i = 0; i < array.length; i++) {
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

  let prevVal,
    i = 0;

  if (initial) {
    prevVal = initial;
  } else {
    prevVal = array[0];
    i++;
  }

  for (i; i < array.length; i++) {
    prevVal = fn(prevVal, array[i], i, array);
  }

  return prevVal;

}

// console.log(reduce(arr, fn, 9));

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */

function upperProps(obj) {

  let array = [];

  for (var key in obj) {
    array.push(key.toUpperCase());
  }

  return array;

}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from, to) {

  let returnSlice = [],
    arrayLength,
    i;

  if (!to) {
    arrayLength = array.length;
  }
  else if (to && from < to) {
    arrayLength = array.length;
    i = from;
    returnSlice.push(array[i]);
  }

  for (i; i < arrayLength; i++) {
    returnSlice.push(array[i]);
  }

  return returnSlice;

}

// console.log(slice([21, 52, 78, 42, 51], 1, 3));

// var arrt = ["Почему", "надо", "учить", "JavaScript"];
// console.log(arrt.slice(0, 2));

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) { }

export {
  forEach,
  map,
  reduce,
  upperProps,
  slice,
  createProxy
};