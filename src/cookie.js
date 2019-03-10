/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

// добавление cookie.
addButton.addEventListener('click', (e) => {
  e.preventDefault();
  addCookie(addNameInput.value.trim(), addValueInput.value.trim());
  doFilter();
});

// фильтрация cookie.
filterNameInput.addEventListener('keyup', (e) => {
  e.preventDefault();
  doFilter();
});

/**
 * Возвращает список cookies.
 */
function getCookies() {
  return document.cookie
    .split('; ')
    .filter(Boolean)
    .map(cookie => cookie.match(/^([^=]+)=(.+)/))
    .reduce((obj, [, name, value]) => {
      obj[name] = value;

      return obj;
    }, {});
}

/**
 *  Добавление cookie.
 * @param {String} key - Ключ cookie.
 * @param {String} val - Занчение cookie.
 */
function addCookie(key, val) {
  document.cookie = `${key}=${val}`;
  doFilter();
}

/**
 * Фильтрация cookie.
 */
function doFilter() {
  let cookieChunk = filterNameInput.value.trim();
  let objCookieFull = getCookies();
  let objCookieFilter = {};

  if (cookieChunk.length == 0) {
    setElementTable(objCookieFull);
  } else {
    for (const key in objCookieFull) {
      if (isMatching(key + objCookieFull[key], cookieChunk)) {
        objCookieFilter[key] = objCookieFull[key];
      }
    }
    setElementTable(objCookieFilter);
  }
}

/**
 * Построение таблицы с Cookie.
 * @param {Object} objCookie - Объект с Cookie.
 */
function setElementTable(objCookie = {}) {
  listTable.innerHTML = '';
  const btnDelete = '<button class="delete">удалить</button>';
  let rows = '';

  for (let key in objCookie) {
    if (objCookie.hasOwnProperty(key)) {
      rows += `<tr data-key=${key}><td>${key}</td><td>${objCookie[key]}</td><td>${btnDelete}</td></tr>`;
    }
  }
  listTable.innerHTML = rows;
  setTableHandler();
}
/**
 * Создание обработчиков таблицы.
 */
function setTableHandler() {
  let btnDeleteList = listTable.querySelectorAll('.delete');

  // обработчик удаления Cookie.
  for (const btnDelete of btnDeleteList) {
    btnDelete.addEventListener('click', (e) => {
      e.preventDefault();
      let row = e.target.parentNode.parentNode;
      let cookieKey = row.getAttribute('data-key');

      deleteCookie(cookieKey, row);
    });
  }
}
/**
 * Удаление cookie.
 * @param {String} key  - Имя cookie
 * @param {Element} row - Строка таблицы.
 */
function deleteCookie(key, row) {
  let cookieDate = new Date();

  // удаление из браузера.
  cookieDate.setTime(cookieDate.getTime() - 1);
  document.cookie = key += '=; expires=' + cookieDate.toGMTString();
  // удаление из таблицы.
  listTable.removeChild(row);
}

/**
 * Проверка, встречается ли подстрока chunk в строке full.
 * @param {String} full - Проверяемая строка.
 * @param {String} chunk - Искомая подстрока.
 */
function isMatching(full, chunk) {
  return full.toLowerCase().includes(chunk.toLowerCase());
}

doFilter();