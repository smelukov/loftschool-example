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

  return new Promise (function(resolve, reject) {
    let req = new XMLHttpRequest();

    req.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json', true);

    req.onload = function() {
        if (req.status !== 200) {
            reject(new Error('1 Ошибка загрузки списка городов'));
        };

        try {
            var result = JSON.parse(req.response);
            result.sort(function (a, b) {
                return (a.name > b.name) ? 1 : -1;
              });
            resolve(result);
        } catch (error) {
            reject(new Error('7 Ошибка парсинга списка городов'));
        }

    };

    req.onerror = function (error) {
        if (!error.message) {
            error.message = '3 Ошибка загрузки списка городов'
        }
        reject(error);

    }
    req.send();
    // try {
    //     req.send();
    // } catch (error) {
    //     console.log('111');
    //     throw error;
    // }
    
  })
}

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
    if (chunk === '') return false;

    var re = new RegExp(chunk, 'i');

    return  (full.search(re) != -1) ? true : false;   
}

/* Блок с надписью "Загрузка" */
const loadingBlock = homeworkContainer.querySelector('#loading-block');
/* Блок с текстовым полем и результатом поиска */
const filterBlock = homeworkContainer.querySelector('#filter-block');
/* Текстовое поле для поиска по городам */
const filterInput = homeworkContainer.querySelector('#filter-input');
/* Блок с результатами поиска */
const filterResult = homeworkContainer.querySelector('#filter-result');

let townsListLoaded = loadTowns();
let townsList = [];

townsListLoaded.then(
    result => {
        loadingBlock.style.display = "none";
        filterBlock.style.display = "block";
        townsList = result;
    },
    error => {
        throw error;
    }
)
.catch(e => {
    console.log("4 " + e.message);
    const button = document.createElement('button');

    loadingBlock.innerText = "Не удалось загрузить города";
    button.innerText = "Повторить";
    button.onclick = loadTowns;
    loadingBlock.appendChild(button);

});
    


filterInput.addEventListener('keyup', function(e) {
    let filteredTownsArr = [];

    filteredTownsArr = townsList.filter(function(item) {
        return isMatching(item.name, e.target.value)
    });
    if (filteredTownsArr.length > 0) {
        filterResult.innerText = "";
        filteredTownsArr.forEach(function(item) {
            const div = document.createElement('div');
            div.innerText = item.name;
            filterResult.appendChild(div);
        });
    } else {
        filterResult.innerText = "не найдено городов";
    }

});

export {
    loadTowns,
    isMatching
};
