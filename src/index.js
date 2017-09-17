/* ДЗ 6.1 - Асинхронность и работа с сетью */

/**
 * Функция должна создавать Promise, который должен быть resolved через seconds секунду после создания
 *
 * @param {number} seconds - количество секунд, через которое Promise должен быть resolved
 * @return {Promise}
 */
function delayPromise(seconds) {
    return new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, seconds * 1000);
    })
}

/**
 * Функция должна вернуть Promise, который должен быть разрешен массивом городов, загруженным из
 * https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json
 * Элементы полученного массива должны быть отсортированы по имени города
 *
 * @return {Promise<Array<{name: String}>>}
 */
function loadAndSortTowns() {
    return new Promise((resolve, reject) => {
        var req = new XMLHttpRequest();

        req.open('GET', 'https://raw.githubusercontent.com/smelukov/citiesTest/master/cities.json');
        req.responseType = 'json';
        req.onload = function() {
            if (req.status == 200) {
                let cities = req.response;
                
                cities.sort(function(a, b) {
                    if (a.name == b.name) {
                        return 0;                    
                    } else if (a.name > b.name) {
                        return 1;
                    }
                    
                    return -1;
                });
                resolve(cities);
            } else {
                reject(Error(req.statusText));
            }
        };

        req.send();
    });
}

export {
    delayPromise,
    loadAndSortTowns
};
