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
  let accumulator = [];
  for (let i = 0; i < array.length; i++) {
    accumulator[i] = fn(array[i], i, array);
  }
  return accumulator;
}

/*
 Задание 3:

 Напишите аналог встроенного метода reduce для работы с массивами
 Посмотрите как работает reduce и повторите это поведение для массива, который будет передан в параметре array
 */
function reduce(array, fn, initial) {
  if (array.length == 0) return initial;

  let accumulator = initial || array[0];
  let i = initial ? 0 : 1;

  for(i; i < array.length; i++) {
    accumulator = fn(accumulator, array[i], i, array);
  }

  return accumulator;
}

/*
 Задание 4:

 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистр и вернуть в виде массива

 Пример:
   upperProps({ name: 'Сергей', lastName: 'Петров' }) вернет ['NAME', 'LASTNAME']
 */
function upperProps(obj) {
  return Object.keys(obj).map((name) => name.toUpperCase());
}

/*
 Задание 5 *:

 Напишите аналог встроенного метода slice для работы с массивами
 Посмотрите как работает slice и повторите это поведение для массива, который будет передан в параметре array
 */
function slice(array, from = 0, to = array.length) {
  if ((from > array.length) || (from > to && to > 0)) return [];

  if (from < 0) from += array.length;
  if (to > array.length) to = array.length;
  if (to < 0) to += array.length;

  let accumulator = [];
  for(let i = from; i < to; i++) {
    if (array[i] !== undefined) accumulator.push(array[i]);  
  }

  return accumulator;
}

/*
 Задание 6 *:

 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
  return new Proxy(obj, {
    set: function(obj, prop, value) {
      if (typeof value == 'number') value **= 2;
      obj[prop] = value;

      return true;
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
