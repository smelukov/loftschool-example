/*
 Страница должна предварительно загрузить список городов из
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 и отсортировать в алфавитном порядке.

 При вводе в текстовое поле, под ним должен появляться список тех городов,
 в названии которых, хотя бы частично, есть введенное значение.
 Регистр символов учитываться не должен, то есть "Moscow" и "moscow" - одинаковые названия.

 Во время загрузки городов, на странице должна быть надпись "Загрузка..."
 После окончания загрузки городов, надпись исчезает и появляется текстовое поле.

 Разметку смотрите в файле towns-content.hbs

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер

 *** Часть со звездочкой ***
 Если загрузка городов не удалась (например, отключился интернет или сервер вернул ошибку),
 то необходимо показать надпись "Не удалось загрузить города" и кнопку "Повторить".
 При клике на кнопку, процесс загруки повторяется заново
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {

  let loadingBlock = homeworkContainer.querySelector('#loading-block');
  let filterBlock = homeworkContainer.querySelector('#filter-block');

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
        reject('Не удалось загрузить города');
      } else {
        resolve(result);
        loadingBlock.hidden = true;
        filterBlock.style.display = 'block';
      }

    });

  });

}

let newFn = loadTowns();

/*
 Функция должна проверять встречается ли подстрока chunk в строке full
 Проверка должна происходить без учета регистра символов

 Пример:
   isMatching('Moscow', 'moscow') // true
   isMatching('Moscow', 'mosc') // true
   isMatching('Moscow', 'cow') // true
   isMatching('Moscow', 'SCO') // true
   isMatching('Moscow', 'Moscov') // false
 */
function isMatching(full, chunk) {

  let fullValue = full.toLowerCase();
  let chunkValue = chunk.toLowerCase();

  if (fullValue.includes(chunkValue)) {
    return true;
  } else {
    return false;
  }

}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

filterInput.addEventListener('keyup', function (e) {
  // это обработчик нажатия кливиш в текстовом поле

  let value = this.value;
  let array = [];

  if (filterInput.value == '') {

    filterResult.innerHTML = "";

  } else {

    newFn.then((result) => {
      for (let i = 0; i < result.length; i++) {

        if (isMatching(result[i].name, value)) {
          array.push(result[i].name);
          filterResult.innerHTML = "";

          for (let i = 0; i < array.length; i++) {
            let elem = document.createElement('div');
            elem.textContent = array[i];
            filterResult.append(elem);
          }

        }

      }
    });

  }

});

export {
  loadTowns,
  isMatching
};