/* ДЗ 7.1 - BOM */

/**
 * Функция должна создавать окно с указанным именем и размерами
 *
 * @param {number} name - имя окна
 * @param {number} width - ширина окна
 * @param {number} height - высота окна
 * @return {Window}
 */
function createWindow(name, width, height) {
    let specs = `"width=${width},height=${height}"`;
    
    return window.open('window', name, specs);
}

/**
 * Функция должна закрывать указанное окно
 *
 * @param {Window} window - окно, размер которого надо изменить
 */
function closeWindow(window) {
    window.close();
}

/**
 * Функция должна создавать cookie с указанными именем и значением
 *
 * @param name - имя
 * @param value - значение
 */
function createCookie(name, value) {
    var d = new Date();
    
    d.setTime(d.getTime() + (7*24*60*60*1000));
    
    var expires = d.toUTCString();
    
    document.cookie = `${name}=${value};expires=${expires}`;

}

/**
 * Функция должна удалять cookie с указанным именем
 *
 * @param name - имя
 */
function deleteCookie(name) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
}

export {
    createWindow,
    closeWindow,
    createCookie,
    deleteCookie
};
