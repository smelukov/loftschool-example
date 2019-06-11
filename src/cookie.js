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
let filterOn = false;

filterNameInput.addEventListener('keyup', function() {
    // здесь можно обработать нажатия на клавиши внутри текстового поля для фильтрации cookie
    if (filterNameInput.value === '') {
        filterOn = false;
    } else {
        filterOn = true;
    }
    cookiesToDOM(getCookies());
});

addButton.addEventListener('click', () => {
    // здесь можно обработать нажатие на кнопку "добавить cookie"
    addCookie (addNameInput.value, addValueInput.value, '/', new Date(2021, 0, 1));
    cookiesToDOM(getCookies());
});

listTable.addEventListener('click', function(e) {
    if (e.target.getAttribute('data-cookie-name')) {
        deleteCookie (e.target.getAttribute('data-cookie-name'), '/');
        cookiesToDOM(getCookies());
    }
});

function addCookie (name, value, path, expires) {
    expires = expires.toUTCString();
    //    если такой cookie есть, то сначала удалить
    if (filterCookies(getCookies(), name).length !== 0) {
        deleteCookie(name, path);
    }
    document.cookie = `${name}=${value}; path=${path}; expires=${expires}`;
}

function deleteCookie (name, path) {
    let date = new Date(0);

    date = date.toUTCString();
    document.cookie = `${name}=; path=${path}; expires=${date}`; 
}

function getCookies () {
    let cookiesStr;
    let cookies = [];

    cookiesStr = (document.cookie).split('; ');
    cookiesStr.forEach(cookie => {    
        const [name, value] = cookie.split('=');

        if (name && value) {
            cookies.push( { name: name, value: value } );
        }
    });

    return cookies;
}

function isMatch (str, filterStr) {
    if (filterStr === '') {

        return false;
    }

    let re = new RegExp(filterStr, 'i');

    return (str.search(re) !== -1) ? true : false;
}

function filterCookies(cookiesArr, str) {
    return cookiesArr.filter(function(item) {
        return isMatch(item.name, str) || isMatch(item.value, str); 
    });
}

function cookiesToDOM (array) {
    let cookiesArr = array;

    listTable.innerHTML = '';
    if (filterOn) {
        cookiesArr = filterCookies(array, filterNameInput.value);
    }
    cookiesArr.forEach(function(item) {
        var tr = document.createElement('tr');
        var tdName = document.createElement('td');
        var tdValue = document.createElement('td');
        var tdAction = document.createElement('td');
        var btn = document.createElement('button');
    
        tdName.innerText = item.name;
        tdValue.innerText = item.value;
        tdAction.append(btn);
        btn.innerText = 'удалить'; 
        btn.setAttribute('data-cookie-name', item.name)
        tr.append(tdName, tdValue, tdAction);
        listTable.appendChild(tr);
    }) 
}

cookiesToDOM(getCookies());

