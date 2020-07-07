export function randomNumber(min = 0, max = 100) {
  return Math.round((max - min) * Math.random()) + min;
}

export function randomValue(types, maxDepth = 2) {
  let depth = 0;
  const allTypes = [
    'string',
    'number',
    'boolean',
    'null',
    'undefined',
    'array',
    'object',
  ];

  if (types) {
    types = Array.isArray(types) ? types : [types];
  } else {
    types = allTypes;
  }

  const type = randomNumber(0, types.length - 1);

  switch (types[type]) {
    case 'string': {
      const length = randomNumber(3, 10);
      const string = [];

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
        const length = randomNumber(3, 10);
        const array = [];

        depth++;

        for (let i = 0; i < length; i++) {
          array.push(
            randomValue(
              depth === maxDepth ? allTypes.slice(0, -2) : allTypes,
              maxDepth - depth
            )
          );
        }

        return array;
      } else {
        return randomValue(allTypes.slice(0, -2));
      }
    }
    case 'object': {
      if (depth < maxDepth) {
        const length = randomNumber(3, 10);
        const object = {};

        depth++;

        for (let i = 0; i < length; i++) {
          const key = randomValue('string');

          object[key] = randomValue(
            depth === maxDepth ? allTypes.slice(0, -2) : allTypes,
            maxDepth - depth
          );
        }

        return object;
      } else {
        return randomValue(allTypes.slice(0, -2));
      }
    }
  }
}

export function randomNumberArray(mode, minLength = 3, maxLength = 10, min, max) {
  const length = randomNumber(minLength, maxLength);
  const array = [];

  for (let i = 0; i < length; i++) {
    let number = randomNumber(min, max);

    if ((mode === 'even' && number % 2) || (mode === 'odd' && !(number % 2))) {
      number++;
    }

    array.push(number);
  }

  return array;
}

export function randomStringArray(minLength = 3, maxLength = 10) {
  const length = randomNumber(minLength, maxLength);
  const array = [];

  for (let i = 0; i < length; i++) {
    array.push(randomValue('string'));
  }

  return array;
}
