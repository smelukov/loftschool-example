/* ДЗ 6 - Асинхронность и работа с сетью */

/*
 Задание 1:

 Функция должна возвращать Promise, который должен быть разрешен через указанное количество секунду

 Пример:
   delayPromise(3) // вернет promise, который будет разрешен через 3 секунды
 */
function delayPromise(seconds) {

  return new Promise((resolve) => {

    setTimeout(() => {
      resolve();
    }, seconds * 1000);

  });

}

/*
 Задание 2:

 2.1: Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json

 2.2: Элементы полученного массива должны быть отсортированы по имени города

 Пример:
   loadAndSortTowns().then(towns => console.log(towns)) // должна вывести в консоль отсортированный массив городов
 */

function loadAndSortTowns() {

  return new Promise((resolve, reject) => {

    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json')
    xhr.responseType = 'json';
    xhr.send();
    xhr.addEventListener('load', () => {

      let obj = xhr.response;
      let towns = [];

      for (let town of obj) {

        towns.push(town);

      }

      let mapped = towns.map(function (el, i) {
        return {
          index: i,
          value: el.name
        };
      });

      mapped.sort(function (a, b) {
        if (a.value > b.value) {
          return 1;
        }
        if (a.value < b.value) {
          return -1;
        }
        return 0;
      });

      let result = mapped.map(function (el) {
        return towns[el.index];
      });

      if (xhr.status >= 400) {
        reject();
      } else {
        resolve(result);
      }

    });

  });

}

export {
  delayPromise,
  loadAndSortTowns
};