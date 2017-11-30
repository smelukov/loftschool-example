/* ДЗ 3 - работа с массивами и объеектами */

/*
 Задача 1:
 Напишите аналог встроенного метода forEach для работы с массивами
 */
function forEach(array, fn) {
  for (let i = 0; i < array.length; i += 1) {
    fn(array[i], i, array);
  }
}

/*
 Задача 2:
 Напишите аналог встроенного метода map для работы с массивами
 */
function map(array, fn) {
  let res = [];
  for (let i = 0; i < array.length; i += 1) {
    res.push(fn(array[i], i, array));
  }
  return res;
}

/*
 Задача 3:
 Напишите аналог встроенного метода reduce для работы с массивами
 */
function reduce(array, fn, initial) {
  var accumulator;
  let index;
  if (initial) {
    accumulator = initial;
    index = 0;
  }
  else {
    accumulator = array[0];
    index = 1;
  }
  for (let i = index; i < array.length; i += 1) {
    accumulator = (fn(accumulator, array[i], i, array));
  }
  return accumulator;
}

/*
 Задача 4:
 Функция принимает объект и имя свойства, которое необходиом удалить из объекта
 Функция должна удалить указанное свойство из указанного объекта
 */
function deleteProperty(obj, prop) {
  delete obj[prop];
  return obj;
}

/*
 Задача 5:
 Функция принимает объект и имя свойства и возвращает true или false
 Функция должна проверить существует ли укзаанное свойство в указанном объекте
 */
function hasProperty(obj, prop) {
  return (prop in obj);
}

/*
 Задача 6:
 Функция должна получить все перечисляемые свойства объекта и вернуть их в виде массива
 */
function getEnumProps(obj) {
  return Object.keys(obj);
}

/*
 Задача 7:
 Функция должна перебрать все свойства объекта, преобразовать их имена в верхний регистра и вернуть в виде массива
 */
function upperProps(obj) {
  return Object.keys(obj).map((elem) => elem.toUpperCase());
}

/*
 Задача 8 *:
 Напишите аналог встроенного метода slice для работы с массивами
 */
function slice(array, from = 0, to = array.length) {
  let len = array.length;
  let last = to;
  if (from < 0 && -from > len - 1) {
    from = len - Math.abs(from);
  }
  if (from < -len + 1) {
    from = 0;
  }
  if (from > array.length - 1 || to < -(array.length - 1)) {
    return [];
  }
  if (to < 0) {
    last = len - Math.abs(to);
  }
  if (to > array.length - 1) {
    last = len;
  }
  let res = [];
  for (let i = from; i < last; i += 1) {
    res.push(array[i]);
  }
  return res;
}

/*
 Задача 9 *:
 Функция принимает объект и должна вернуть Proxy для этого объекта
 Proxy должен перехватывать все попытки записи значений свойств и возводить это значение в квадрат
 */
function createProxy(obj) {
  let proxy = new Proxy(obj, {
    set(target, prop, value) {
      target[prop] = value * value;
      return true;
    }
  });
  return proxy;
}

export {
  forEach,
  map,
  reduce,
  deleteProperty,
  hasProperty,
  getEnumProps,
  upperProps,
  slice,
  createProxy
};
