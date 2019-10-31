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


const oneYr = new Date().setFullYear(new Date().getFullYear() + 1);
const cookieFilter = {
  clearTable: function () {
    listTable.innerHTML = '';
  },
  isMatching: function (full, chunk) {
    let fullValue = full.toLowerCase();
    let chunkValue = chunk.toLowerCase();

    if (fullValue.includes(chunkValue)) {
      return true;
    } else {
      return false;
    }
  }
}
const cookieManipulations = {
  addCookie: function (cookieName, cookieValue, days) {
    if (cookieName != '' && cookieValue != '') {
      var expireDate = new Date;
      expireDate.setTime(expireDate.getTime() + 24 * 60 * 60 * 1000 * days);
      document.cookie = `${cookieName}=${cookieValue};expires=${expireDate.toGMTString()};`;
    }
  },
  getCookies: function (cookie) {
    return cookie.split('; ').reduce((prev, current) => {
      const [name, value] = current.split('=');

      prev[name] = value;
      return prev;
    }, {});
  },
  deleteCookie: function (name) {
    this.addCookie(name, null, -1);
  }
}

function renderTableRow(cookie) {
  let cookiesKeys = Object.keys(cookie);

  cookieFilter.clearTable();

  for (let i = 0; i < cookiesKeys.length; i++) {
    let cookieName = cookiesKeys[i];
    if (cookieName.includes(filterNameInput.value) ||
      cookie[cookieName].includes(filterNameInput.value)) {
      let elemTr = document.createElement('tr');
      let deleteTrButton = document.createElement('button');
      let elemTd = document.createElement('td');
      let elemTd2 = document.createElement('td');
      let elemTd3 = document.createElement('td');

      deleteTrButton.textContent = 'Удалить';
      deleteTrButton.addEventListener('click', function () {
        cookieManipulations.deleteCookie(cookieName);
        elemTr.remove();
      });

      elemTd.textContent = cookieName;
      elemTd2.textContent = cookie[cookieName];
      elemTd3.append(deleteTrButton);
      elemTr.append(elemTd);
      elemTr.append(elemTd2);
      elemTr.append(elemTd3);

      listTable.append(elemTr);
    }
  }

}

filterNameInput.addEventListener('keyup', function () {
  // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
  let filterValue = this.value;
  let cookies = cookieManipulations.getCookies(document.cookie);
  let cookiesKeys = Object.keys(cookies);
  let obj = {};

  for (let i = 0; i < cookiesKeys.length; i++) {
    let value = cookies[cookiesKeys[i]];
    if (cookieFilter.isMatching(cookiesKeys[i], filterValue) || cookieFilter.isMatching(value, filterValue)) {
      obj[cookiesKeys[i]] = value;
    }
  }

  cookieFilter.clearTable();
  renderTableRow(obj);
});

addButton.addEventListener('click', () => {
  // здесь можно обработать нажатие на кнопку "добавить cookie"
  let inputName = addNameInput.value;
  let inputValue = addValueInput.value;

  cookieManipulations.addCookie(inputName, inputValue, 365);

  let cookies = cookieManipulations.getCookies(document.cookie);

  renderTableRow(cookies);
});

window.addEventListener('load', () => {
  let cookies = cookieManipulations.getCookies(document.cookie);

  renderTableRow(cookies);
});