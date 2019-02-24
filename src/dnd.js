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

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let div = document.createElement('div');

    function getRandomPixels(square) {
        return Math.floor(Math.random() * square + 50) + 'px';
    }

    function getRandomColor() {
        let color = '#' + Math.random().toString(16).substr(-6);
        
        return color;
    }

    div.classList.add('draggable-div');
    div.style.width = getRandomPixels(400);
    div.style.height = getRandomPixels(400);
    div.style.top = getRandomPixels(1000);
    div.style.left = getRandomPixels(1000);
    div.style.position = 'absolute'; 
    div.style['background-color'] = getRandomColor();

    return div;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
  
    let moveElement = false;
    let deltaX, deltaY;

    target.addEventListener('mousedown', function(e) {
        e.target.classList.add('clicked');
        moveElement = true;
        deltaX = e.clientX - e.target.offsetLeft;
        deltaY = e.clientY - e.target.offsetTop
    });

    target.addEventListener('mouseup', function(e) {
        e.target.classList.remove('clicked');
        e.target.style.zIndex = '-1';
        moveElement = false;
    });

    document.addEventListener('mousemove', function(e) {
        if (moveElement) {
            e.target.style.top = `${e.clientY - deltaY}px`;
            e.target.style.left = `${e.clientX - deltaX}px`;
        }
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
