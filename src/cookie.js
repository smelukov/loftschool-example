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

filterCookies();

function filterCookies() {
    let cookies = getCookiesObject();
    
    listTable.innerHTML = '';

    for (let cookie in cookies) {
        if (filterNameInput.value.length === 0 ||
            cookie.indexOf(filterNameInput.value) >= 0 ||
            cookies[cookie].indexOf(filterNameInput.value) >= 0) {
            
            listTable.appendChild(createCookieForTheTable(cookie, cookies[cookie]));
        }
    }
}

function getCookiesObject() {
    return document.cookie.split('; ').reduce((prev, current) => {
        let [name, value] = current.split('=');

        prev[name] = value;

        return prev;
    }, {});
}

function createCookieForTheTable(name, value) {
    let newCookie = document.createElement('tr');

    newCookie.className = `${name}`;
    newCookie.innerHTML = `<td>${name}</td><td>${value}</td><td><button data-cookie="${name}">Удалить</button></td>`;

    return newCookie;
}

filterNameInput.addEventListener('keyup', function() {
    filterCookies();
});

addButton.addEventListener('click', () => {
    let addNameInputValue = addNameInput.value;
    let addValueInputValue = addValueInput.value;
    let filterNameInputValue = filterNameInput.value;

    document.cookie = `${addNameInputValue}=${addValueInputValue}`;

    if (filterNameInputValue.length === 0 ||
        addNameInputValue.indexOf(filterNameInputValue) >= 0 ||
        addValueInputValue.indexOf(filterNameInputValue) >= 0) {

        listTable.appendChild(createCookieForTheTable(addNameInputValue, addValueInputValue));
    }
});

listTable.addEventListener('click', e => {
    if (e.target.tagName === 'BUTTON') {
        let parent = e.target.parentNode.parentNode;
        let CName = parent.firstElementChild.innerText;

        document.cookie = `${CName}=; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        parent.remove();

    }
});

