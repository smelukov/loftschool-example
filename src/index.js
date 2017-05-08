require('./style.css');

(function(id) {

    VK.init({apiId: id});

    let login = document.getElementById('login');
    let logout = document.getElementById('logout');
    let st = document.getElementById('status');
    let contacts = document.getElementById('contact-lists');
    let filterAll = document.getElementById('filterAllFriends');
    let filterSelected = document.getElementById('filterSelectedFriends');
    let friendList = document.getElementById('contact-list');
    let friendSelectedList = document.getElementById('contact-list-selected');
    let saveButton = document.getElementById('save');

    function getFriends() {
        return new Promise(function(resolve, reject) {
            VK.api('friends.get', {
                v: 5.62,
                fields: 'city,photo_50'
            }, function() {
                let friends = arrayOfFriends(arguments[0].response.items);
                resolve(friends);
            });
        })
    }

    document.addEventListener("DOMContentLoaded", function() {

        VK.api('users.get', {
            v: 5.62,
            fields: 'photo_50'
        }, function() {
            let userImage = arguments[0].response[0].photo_50;
            st.setAttribute('style', 'background-image: url(' + userImage + ');');
        });

        // Проверяем есть ли сохраненные друзья
        // Использовал sessionStorage чтобы не забивать local
        if (sessionStorage.getItem('friendList')) {
            drawListOfsavedElements(JSON.parse(sessionStorage.getItem('friendList')), friendList);
            drawListOfsavedElements(JSON.parse(sessionStorage.getItem('friendSelectedList')), friendSelectedList);
        } else {
            getFriends().then((friends) => {
                drawList(friends, friendList)
            });
        }
    });

    // Слушаем событие для крестика и плюсика
    contacts.addEventListener('click', function(e) {
        if (e.target.className == 'mover') {
            let el = e.target.parentElement;
            if (el.parentElement.id == 'contact-list-selected') {
                e.target.setAttribute('src', 'plus.png');
                friendSelectedList.removeChild(el);
                friendList.appendChild(el);
            } else if (el.parentElement.id == 'contact-list') {
                e.target.setAttribute('src', 'cross.png');
                friendList.removeChild(el);
                friendSelectedList.appendChild(el);
            }
        };
    });

    // Логинимся в свой аккаунт вк
    // Если есть сохраненные списки то достаем их, иначе просим с сервера
    login.addEventListener('click', function(e) {
        VK.Auth.login(function(result) {
            if (result.status == 'connected') {

                VK.api('users.get', {
                    v: 5.62,
                    fields: 'photo_50'
                }, function() {
                    let userImage = arguments[0].response[0].photo_50;
                    st.setAttribute('style', 'background-image: url(' + userImage + ');');
                })

                getFriends().then((friends) => {
                    drawList(friends, friendList)
                });
            }
        });
    });

    saveButton.addEventListener('click', function(e) {

        save(friendList, 'friendList');
        save(friendSelectedList, 'friendSelectedList');

        function save(list, name) {
            let temp = [];
            for (var i = 0; i < list.childElementCount; i++) {
                temp.push([list.children[i].id, list.children[i].innerHTML]);
            }

            sessionStorage.setItem(name, JSON.stringify(temp));
        }

        alert('Друзья сохранены!');
    });

    logout.addEventListener('click', function(e) {
        VK.Auth.revokeGrants();
        friendList.innerHTML = '';
        friendSelectedList.innerHTML = '';
        sessionStorage.clear();
        st.setAttribute('style', 'background-color: red');
    });

    // Добавляет элементы из массива в указанную ноду
    function drawList(array, node) {
        for (let i of array) {
            node.appendChild(i);
        }
    }

    // Восстанавливает друзей из массива элементов
    function drawListOfsavedElements(array, node) {

        for (let item of array) {
            let div = document.createElement('DIV');
            div.innerHTML = item[1];
            div.setAttribute('class', 'friend');
            div.setAttribute('id', item[0]);
            div.setAttribute('draggable', 'true');
            node.appendChild(div);
        }

    }

    filterAll.addEventListener('keyup', function(e) {
        filterChildren(friendList, this.value);
    });

    filterSelected.addEventListener('keyup', function(e) {
        filterChildren(friendSelectedList, this.value);
    });

    // Делает из полученных данных массив с нужной разметкой
    function arrayOfFriends(arr) {

        var array = [];
        var i = 0;

        for (item of arr) {
            let divFriend = document.createElement('DIV');
            let divPhoto = document.createElement('DIV');
            let divName = document.createElement('DIV');
            let cross = document.createElement('IMG');

            cross.setAttribute('class', 'mover');
            cross.setAttribute('src', 'plus.png');
            divFriend.setAttribute('class', 'friend');
            divFriend.setAttribute('id', i++);
            divFriend.setAttribute('draggable', 'true');
            divPhoto.setAttribute('class', 'friendPic');
            divPhoto.setAttribute('style', 'background-image: url(' + item.photo_50 + ');');
            divName.setAttribute('class', 'friendName');
            divName.innerText = item.first_name + ' ' + item.last_name;

            divFriend.appendChild(divPhoto);
            divFriend.appendChild(divName);
            divFriend.appendChild(cross);
            array.push(divFriend);
        }

        return array;
    }

}(5904325));

// Функции для реализации D&D
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("id", ev.target.id);
    ev.dataTransfer.setData("element", ev.target.innerHTML);
}

function drop(ev) {
    ev.preventDefault();
    let data = ev.dataTransfer.getData("id");
    let el = ev.dataTransfer.getData("element");
    let list = findParent([
        "contact-list-selected", "contact-list"
    ], ev.target);

    list.appendChild(document.getElementById(data));

    // Определяем куда бросаем друга, и меняем у него картинку IMG
    if (list.id == "contact-list") {
        document.getElementById(data).children[2].setAttribute('src', 'plus.png');
        filterChildren(list, document.getElementById('filterAllFriends').value);
    } else if (list.id == "contact-list-selected") {
        document.getElementById(data).children[2].setAttribute('src', 'cross.png');
        filterChildren(list, document.getElementById('filterSelectedFriends').value);
    }
}

// Функция хэлпер для поиска нужного родителя, если бросаем куда-то не туда (не на тот див)
function findParent(target, current) {
    return target.includes(current.id)
        ? current
        : findParent(target, current.parentNode);
}

// Функция для фильтрации
function filterChildren(node, mask) {
    for (i = 0; i < node.children.length; i++) {
        name = node.children[i].children[1].innerText;
        if (name.toLowerCase().indexOf(mask.toLowerCase()) > -1) {
            node.children[i].style.display = "";
        } else {
            node.children[i].style.display = "none";
        }
    }
}
