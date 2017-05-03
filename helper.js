export function randomNumber(min = 0, max = 100) {
    return Math.round((max - min) * Math.random()) + min;
}

export function randomValue(types, maxDepth = 2) {
    let depth = 0;
    let allTypes = ['string', 'number', 'boolean', 'null', 'undefined', 'array', 'object'];
    let type;

    if (types) {
        types = Array.isArray(types) ? types : [types]
    } else {
        types = allTypes;
    }

    type = randomNumber(0, types.length - 1);

    switch (types[type]) {
        case 'string': {
            let length = randomNumber(3, 10);
            let string = [];

            for (let i = 0; i < length; i++) {
                string.push(String.fromCharCode(randomNumber(33, 126)));
            }

            return string.join('');
        }
        case 'number':
            return randomNumber();
        case 'boolean':
            return !!randomNumber(0, 1);
        case 'null':
            return null;
        case 'array': {
            if (depth < maxDepth) {
                let length = randomNumber(3, 10);
                let array = [];

                depth++;

                for (let i = 0; i < length; i++) {
                    array.push(randomValue(depth == maxDepth ? allTypes.slice(0, -2) : allTypes, maxDepth - depth));
                }

                return array;
            } else {
                return randomValue(allTypes.slice(0, -2));
            }
        }
        case 'object': {
            if (depth < maxDepth) {
                let length = randomNumber(3, 10);
                let object = {};

                depth++;

                for (let i = 0; i < length; i++) {
                    let key = randomValue('string');

                    object[key] = randomValue(depth == maxDepth ? allTypes.slice(0, -2) : allTypes, maxDepth - depth);
                }

                return object;
            } else {
                return randomValue(allTypes.slice(0, -2));
            }
        }
    }
}

export function randomNumberArray(mode, minLength = 3, maxLength = 10, min, max) {
    let length = randomNumber(minLength, maxLength);
    let array = [];

    for (let i = 0; i < length; i++) {
        let number = randomNumber(min, max);

        if ((mode == 'even' && number % 2) || (mode == 'odd' && !(number % 2))) {
            number++;
        }

        array.push(number);
    }

    return array;
}

export function randomStringArray(minLength = 3, maxLength = 10) {
    let length = randomNumber(minLength, maxLength);
    let array = [];

    for (let i = 0; i < length; i++) {
        array.push(randomValue('string'));
    }

    return array;
}
