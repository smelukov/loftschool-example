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

 // функции для добавления/получения имени и удаления cookie
function setCookie(name, value, options) {
  options = options || {};

  var expires = options.expires;

  if (typeof expires == "number" && expires) {
    var d = new Date();
    d.setTime(d.getTime() + expires * 1000);
    expires = options.expires = d;
  }
  if (expires && expires.toUTCString) {
    options.expires = expires.toUTCString();
  }

  value = encodeURIComponent(value);

  var updatedCookie = name + "=" + value;

  for (var propName in options) {
    updatedCookie += "; " + propName;
    var propValue = options[propName];
    if (propValue !== true) {
      updatedCookie += "=" + propValue;
    }
  }

  document.cookie = updatedCookie;
}

function deleteCookie(name) {
  setCookie(name, "", {
    expires: -1
  })
}

function getCookie(name) {
  var matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

let homeworkContainer = document.querySelector('#homework-container');
let filterNameInput = homeworkContainer.querySelector('#filter-name-input');
let addNameInput = homeworkContainer.querySelector('#add-name-input');
let addValueInput = homeworkContainer.querySelector('#add-value-input');
let addButton = homeworkContainer.querySelector('#add-button');
let listTable = homeworkContainer.querySelector('#list-table tbody');

// переменные для кнопок удаления и массива, для формирования таблицы с cookie
let deleteButtons,
		cookieArray;

// создадим ряд в таблице
function createCookieRow(name, value) {
	let row = document.createElement("tr");
	// при создании добавим каждой кнопке аттрибут с соответствующим именем cookie
	row.innerHTML = `<td>${name}</td>
									 <td>${value}</td><td>
									 <button class="delete-button" data-name=${name}>удалить cookie</button></td>`;
	listTable.appendChild(row);
}

// создадим массив объектов, каждый из которых будет содержать имя и значение существующей cookie
function createCookieArray() {
	return document.cookie.split(";")
													.map(function(cookie) {
														return {
															name: cookie.split("=")[0],
															value: cookie.split("=")[1]
														};
													});
}


// общая функция для формирования таблицы с cookie на основе createCookieArray
function createCookieTable(lettersToMatch) {

	if(!lettersToMatch) lettersToMatch =  filterNameInput.value;

	if(document.cookie) {
		cookieArray = createCookieArray();

		if(lettersToMatch) {
			cookieArray = findMatches(lettersToMatch, cookieArray);
		}

		cookieArray.forEach(cookie => { createCookieRow(cookie.name, cookie.value) });
	}


}

// соберем все кнопки для удаления
function getDeleteButtons() {
	return [].slice.call(homeworkContainer.getElementsByClassName("delete-button"));
}

// фукция для поиска соответствий в общем массиве существующих cookie введенному в инпут значению
function findMatches(wordToMatch, cookies) {
  return cookies.filter(cookie => {
    const regex = new RegExp(wordToMatch, 'gi');
    return cookie.name.match(regex) || cookie.value.match(regex)
  });
}

// создадим таблицу при загрузке страницы
createCookieTable();

function updateDeleteHandlers() {
	deleteButtons = getDeleteButtons();
	deleteButtons.forEach(button => button.addEventListener("click", function() {
		deleteCookie(this.dataset.name);
		listTable.innerHTML = "";
		createCookieTable();
	}));
}

// получим все кнопки для удаления строки с cookie
// повесим обработчик на каждую кнопку удаления, который удалит cookie и
// соответствующий ряд в таблице
updateDeleteHandlers();

filterNameInput.addEventListener('keyup', function() {
	listTable.innerHTML = "";
	createCookieTable(this.value);
});

addButton.addEventListener('click', () => {

	if(addNameInput.value && addValueInput.value) setCookie(addNameInput.value, addValueInput.value);
	listTable.innerHTML = "";
	updateDeleteHandlers();
	createCookieTable();



});
