/**
 * ДЗ 7.2 - Создать редактор cookie с возможностью фильтрации
 *
 * На странице должна быть таблица со списком имеющихся cookie:
 * - имя
 * - значение
 * - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)
 *
 * На странице должна быть форма для добавления новой cookie:
 * - имя
 * - значение
 * - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)
 *
 * Если добавляется cookie с именем уже существующией cookie, то ее значение в браузере и таблице должно быть обновлено
 *
 * На странице должно быть текстовое поле для фильтрации cookie
 * В таблице должны быть только те cookie, в имени или значении которых есть введенное значение
 * Если в поле фильтра пусто, то должны выводиться все доступные cookie
 * Если дабавляемая cookie не соответсвуте фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 * Если добавляется cookie, с именем уже существующией cookie и ее новое значение не соответствует фильтру,
 * то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена
 *
 * Для более подробной информации можно изучить код тестов
 *
 * Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/**
 * homeworkContainer - это контейнер для всех ваших домашних заданий
 * Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер
 *
 * @example
 * homeworkContainer.appendChild(...);
 */
let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');
let deleteButton = homeworkContainer.querySelector('.delete-button');

function isMatching(full, chunk) {
    return full.toLowerCase().includes(chunk.toLowerCase());
}

function listCookies() {

    if (document.cookie.length > 0) {
        var theCookies = document.cookie.split(';');
        var cookies = [];

        for (var i = 0; i < theCookies.length; i++) {
            var arr = theCookies[i].split('=');
    
            cookies.push({ name: arr[0], value: arr[1] });
        }
    
        return cookies;
    }
    
}   

function renderCookies(cookies) {
    listTable.innerHTML = '';
    if (cookies) {
        for (let i = 0; i < cookies.length; i++) {
            let tr = document.createElement('tr');
            let tdName = document.createElement('td');
            let tdValue = document.createElement('td');
            let tdDelete = document.createElement('td');
    
            tdName.innerHTML = cookies[i].name;
            tdValue.innerHTML = cookies[i].value;
            tdDelete.innerHTML = `<button class='delete-button' data-id = ${i}>Удалить</button>`;
    
            tr.appendChild(tdName);
            tr.appendChild(tdValue);
            tr.appendChild(tdDelete);
    
            listTable.appendChild(tr);
            
        }
    }
}

function addCookie(name, value) {
    var d = new Date();
    
    d.setTime(d.getTime() + (7*24*60*60*1000));
    
    var expires = d.toUTCString();
    
    document.cookie = `${name}=${value};expires=${expires}`;
}

function deleteCookie(e) {
    if (e.target.className === 'delete-button') {
        let id = e.target.dataset.id;
        let cookies = listCookies();
        let cookie = cookies[id].name;
        
        document.cookie = `${cookie}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;

        renderCookies(listCookies());
    }
}

if (listCookies() && listCookies().length > 0) {
    renderCookies(listCookies());
}

filterNameInput.addEventListener('keyup', function() {
    let value = filterNameInput.value;
    let cookies = listCookies();
    let result = [];

    if(cookies) {

        for (var i = 0; i < cookies.length; i++) {
            if (isMatching(cookies[i].name, value) || isMatching(cookies[i].value, value)) {
                result.push(cookies[i]);
            }
        }

    }

    if (result.length > 0) {
        renderCookies(result)
    } else {
        renderCookies(result);
    }
    
});

document.addEventListener('click', deleteCookie);

addButton.addEventListener('click', () => {

    let name = addNameInput.value;
    let value = addValueInput.value;

    if (name !== '' && value !== '') {
        addCookie(name, value);
        addNameInput.value = '';
        addValueInput.value = '';
    } 

    let cookies = listCookies();

    renderCookies(cookies)
});
