/* ДЗ 5.2 - Div D&D */

/** Со звездочкой */
/**
 * Создать страницу с кнопкой
 * При нажатии на кнопку должен создаваться div со случайными размерами, цветом фона и позицией
 * Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
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

/**
 * Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 * Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 * Функция НЕ должна добавлять элемент на страницу
 *
 * @return {Element}
 */
function createDiv() {
 var newdiv = document.createElement('div');
  newdiv.setAttribute('class', 'draggable-div' );
  newdiv.setAttribute('draggable', true);
  newdiv.style.height = '200px';
  newdiv.style.width = '200px';
  newdiv.style.background = 'red';
  newdiv.style.position = 'absolute';
  newdiv.style.top = '200px';
  newdiv.style.left = '200px';
  newdiv.id = Math.ceil(Math.random() *100);
  return newdiv;
}

/**
 * Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop
 *
 * @param {Element} target
 */
function addListeners(target) {

    function drag_start(event){
       var style = window.getComputedStyle(event.target, null);
        event.dataTransfer.setData("text/plain",
            (parseInt(style.getPropertyValue("left"),10) - event.clientX) + ','
            + (parseInt(style.getPropertyValue("top"),10) - event.clientY)
            + ',' + event.target.id);
        -144,-67,76

        return true;
    }


    function drag_enter(event){
        event.preventDefault();
        return true;

    }

    function drag_over(event){
        event.preventDefault();

    }

    function drag_drop(event){
        var offset = event.dataTransfer.getData("text/plain").split(',');
        var dm = document.getElementById(offset[2]);
        dm.style.left = (event.clientX + parseInt(offset[0], 10)) + 'px';
        dm.style.top = (event.clientY + parseInt(offset[1],10)) + 'px';
        event.preventDefault();
        return false;

    }


target.addEventListener('dragstart', drag_start);
homeworkContainer.addEventListener('dragover', drag_over);
homeworkContainer.addEventListener('dragenter', drag_enter);
homeworkContainer.addEventListener('drop', drag_drop);
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    let div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации d&d
    addListeners(div);
    homeworkContainer.style.height = '500px';
    homeworkContainer.style.width = '700px';
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
