'use strict';

let DragManager = new function () {
    let dragObject = {};
    let self = this;

    function onMouseDown(e) {

        if (e.which != 1) return;

        let elem = e.target.closest('.draggable');

        if (!elem) return;

        dragObject.elem = elem;

        dragObject.downX = e.pageX;
        dragObject.downY = e.pageY;

        return false;
    }

    function onMouseMove(e) {
        if (!dragObject.elem) return;

        if (!dragObject.avatar) {
            let moveX = e.pageX - dragObject.downX;
            let moveY = e.pageY - dragObject.downY;

            if (Math.abs(moveX) < 3 && Math.abs(moveY) < 3) {
                return;
            }

            dragObject.avatar = createAvatar(e);
            if (!dragObject.avatar) {
                dragObject = {};
                return;
            }

            let coords = getCoords(dragObject.avatar);
            dragObject.shiftX = dragObject.downX - coords.left;
            dragObject.shiftY = dragObject.downY - coords.top;

            startDrag(e);
        }

        dragObject.avatar.style.left = e.pageX - dragObject.shiftX + 'px';
        dragObject.avatar.style.top = e.pageY - dragObject.shiftY + 'px';

        return false;
    }

    function onMouseUp(e) {
        if (dragObject.avatar) {
            finishDrag(e);
        }

        dragObject = {};
    }

    function finishDrag(e) {
        let dropElem = findDroppable(e);

        if (!dropElem) {
            self.onDragCancel(dragObject);
        } else {
            self.onDragEnd(dragObject, dropElem);
        }
    }

    function createAvatar(e) {

        let old = {
            backgroundColor: dragObject.elem.style.backgroundColor
        };

        let style = getComputedStyle(dragObject.elem);
        let avatar = dragObject.elem.cloneNode(true);
        avatar.style.position = 'absolute';
        avatar.style.width = dragObject.elem.offsetWidth + 'px';
        avatar.style.height = dragObject.elem.offsetHeight + 'px';
        avatar.style.backgroundColor = style.backgroundColor;
        dragObject.elem.style.backgroundColor = style.backgroundColor;
        let elemCoords = getCoords(dragObject.elem);
        avatar.style.left = elemCoords.left + 'px';
        avatar.style.top = elemCoords.top + 'px';
        document.body.appendChild(avatar);

        avatar.destroy = function () {
            document.body.removeChild(avatar);
            avatar = null;
            dragObject.elem.style.backgroundColor = old.backgroundColor;
        };

        avatar.rollback = function () {
            avatar.destroy();
        };

        return avatar;
    }

    function startDrag(e) {
        let avatar = dragObject.avatar;

        document.body.appendChild(avatar);
        avatar.style.zIndex = 9999;
        avatar.style.position = 'absolute';
    }

    function findDroppable(event) {

        let z = dragObject.avatar.style.zIndex;
        dragObject.avatar.style.zIndex = -9999;

        let elem = document.elementFromPoint(event.clientX, event.clientY);
        dragObject.avatar.style.zIndex = z;

        if (elem == null) {
            return null;
        }

        return elem.closest('.droppable');
    }

    document.onmousemove = onMouseMove;
    document.onmouseup = onMouseUp;
    document.onmousedown = onMouseDown;

    this.onDragEnd = function (dragObject, dropElem) {
    };
    this.onDragCancel = function (dragObject) {
    };

};

let getCoords = (elem) => { // кроме IE8-
    let box = elem.getBoundingClientRect();

    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };
};

module.exports = DragManager;
