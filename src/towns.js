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
/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');
// список городов - полный
let townsFull = [];

// список городов - отфильтрованный
let townsFilter = [];

// обработчик нажатия кливиш в текстовом поле
filterInput.addEventListener('keyup', doFilter);
loadTowns();
/*
 Функция должна вернуть Promise, который должен быть разрешен с массивом городов в качестве значения

 Массив городов пожно получить отправив асинхронный запрос по адресу
 https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 */
function loadTowns() {
  let url = 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json';

  return new Promise((resolve, reject) => {

    fetch(url)
      .then(response => {
        if (response.status >= 400) {

          return Promise.reject(response);
        }

        return response.json()
      })
      .then(response => {
        townsFull = response.sort((t1, t2) => t1.name.localeCompare(t2.name));
        resolve(townsFull);
        setElemetPlace();
      })
      .catch((response) => console.error('Что-то пошло не так. Ответ от сервера: ', response));
  });
}
/**
 * Изменение отображения элементов после загрузки городов.
 */
function setElemetPlace() {
  loadingBlock.style.display = 'none';
  filterBlock.style.display = 'block';
}
/**
 * Фильтрация городов.
 * @param {Event} e 
 */
function doFilter(e) {
  let val = filterInput.value.trim();

  e.preventDefault();
  townsFilter.length = 0;

  if (val.length == 0) {
    filterResult.innerHTML = '';

    return;
  }

  for (const town of townsFull) {
    if (isMatching(town.name, val)) {
      townsFilter.push(town);
    }
  }
  setItemsResult();
}

/**
 * Проверка, встречается ли подстрока chunk в строке full.
 * @param {String} full - Проверяемая строка.
 * @param {String} chunk - Искомая подстрока.
 */
function isMatching(full, chunk) {
  return full.toLowerCase().includes(chunk.toLowerCase());
}
/**
 * Построение списка отфильтрованных городов.
 */
function setItemsResult() {
  filterResult.innerHTML = '';
  for (const town of townsFilter) {
    filterResult.innerHTML += town.name + '</br>';
  }
}

export {
  loadTowns,
  isMatching
};
