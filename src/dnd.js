/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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
const button = document.createElement('button');

homeworkContainer.style.position = 'relative';
button.setAttribute('id', 'addDiv');
button.addEventListener('click', createDiv);
homeworkContainer.appendChild(button);

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
     const newDiv = createDiv();
     homeworkContainer.appendChild(newDiv);
 */
function randomColor() {
    var r = Math.floor(Math.random() * (256)),
        g = Math.floor(Math.random() * (256)),
        b = Math.floor(Math.random() * (256));

    r = r < 16 ? '0'+r.toString(16) : r.toString(16);
    g = g < 16 ? '0'+g.toString(16) : g.toString(16);
    b = b < 16 ? '0'+b.toString(16) : b.toString(16);
    
    return '#' + r + g + b;
}

function createDiv() {
    const elem = document.createElement('div');
    var maxWidth = document.body.clientWidth;
    var maxHeight = document.body.clientHeight;
    var width = Math.floor(Math.random() * (maxWidth));
    var height = Math.floor(Math.random() * (maxHeight));

    elem.classList.add('draggable-div');
    elem.style.position = 'absolute';
    elem.style.width = width +'px';
    elem.style.height = height +'px';
    elem.style.left = Math.floor(Math.random() * (maxWidth - width))+'px';
    elem.style.top = Math.floor(Math.random() * (maxHeight - height))+'px';
    elem.style.backgroundColor = randomColor();
    elem.style.color = randomColor();
    elem.draggable = true;

    return elem;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
     const newDiv = createDiv();
     homeworkContainer.appendChild(newDiv);
     addListeners(newDiv);
 */
function addListeners(target) {
    let startX, startY;

    target.addEventListener ('dragstart', function (e) {
        startX = e.pageX;
        startY = e.pageY;
    });

    target.addEventListener ('dragend', function (e) {
        var X = e.pageX;
        var Y = e.pageY;

        e.target.style.left = Number(e.target.style.left.slice(0, -2)) - (startX - X) + 'px';
        e.target.style.top = Number(e.target.style.top.slice(0, -2)) - (startY - Y) + 'px';
    })
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
