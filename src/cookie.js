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

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
});

function addCookie (name, value, path, expires) {
  expires = expires.toUTCString();
  document.cookie = `${name}=${value}; path=${path}; expires=${expires}`;
}
function deleteCookie (name, path) {
  var date = new Date(0);
  date = date.toUTCString();
  document.cookie = `${name}=; path=${path}; expires=${date}`; 
}
function getCookies () {
  let cookiesStr, cookies = [];
  cookiesStr = (document.cookie).split("; ");

  cookiesStr.forEach(cookie => {  
    const [name, value] = cookie.split("=");
    cookies[name] = value;
  });

  return cookies;
};

addCookie('kkk', '09', '/', new Date(2020,0,1));
addCookie('ll', '09', '/', new Date(2020,0,1));
addCookie('mmm', '09', '/', new Date(2020,0,1));

let cookiesArr = getCookies();

for (let key in cookiesArr) {
  var tr = document.createElement('tr');
  var tdName = document.createElement('td');
  var tdValue = document.createElement('td');
  var tdAction = document.createElement('td');
  var btn = document.createElement('button');

  btn.addEventListener('click', function(e) {
    let name = key;

    deleteCookie (name, '/');
    e.target.parentElement.parentElement.parentElement.removeChild(e.target.parentElement.parentElement);
  });
  tdName.innerText = key;
  tdValue.innerText = cookiesArr[key];
  tdAction.append(btn);
  btn.innerText = 'удалить'; 
  tr.append(tdName, tdValue, tdAction);
  listTable.appendChild(tr);
}

  


console.log (typeof cookiesArr);
console.log (cookiesArr.length);
cookiesArr.forEach(function (element) {
  console.log(element);
});