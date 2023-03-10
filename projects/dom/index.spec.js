import { randomValue } from '../../scripts/helper';
import {
  collectDOMStat,
  createDivWithText,
  deleteTextNodes,
  findAllPSiblings,
  findError,
  prepend,
} from './index';

function random(type) {
  const result = randomValue(type);

  if (type === 'string') {
    return encodeURIComponent(result);
  }

  return result;
}

describe('ДЗ 4 - Работа с DOM', () => {
  describe('createDivWithText', () => {
    it('должна возвращать элемент с тегом DIV', () => {
      const text = random('string');
      const result = createDivWithText(text);

      expect(result).toBeInstanceOf(Element);
      expect(result.tagName).toBe('DIV');
    });

    it('должна добавлять текст в элемент', () => {
      const text = random('string');
      const result = createDivWithText(text);

      expect(result.textContent).toBe(text);
    });
  });

  describe('prepend', () => {
    it('должна добавлять элемент в начало', () => {
      const where = document.createElement('div');
      const what = document.createElement('p');
      const whereText = random('string');
      const whatText = random('string');

      where.innerHTML = `, <b>${whereText}</b>!`;
      what.textContent = whatText;

      prepend(what, where);

      expect(where.firstChild).toBe(what);
      expect(where.innerHTML).toBe(`<p>${whatText}</p>, <b>${whereText}</b>!`);
    });
  });

  describe('findAllPSiblings', () => {
    it('должна возвращать массив с элементами, соседями которых являются P', () => {
      const where = document.createElement('div');

      where.innerHTML = '<div></div><p></p><span></span><span></span><p></p>';
      const result = findAllPSiblings(where);

      expect(Array.isArray(result));
      expect(result).toEqual([where.children[0], where.children[3]]);
    });
  });

  describe('findError', () => {
    it('должна возвращать массив из текстового содержимого элементов', () => {
      const where = document.createElement('div');
      const text1 = random('string');
      const text2 = random('string');

      where.innerHTML = ` <div>${text1}</div>, <div>${text2}</div>!!!`;
      const result = findError(where);

      expect(Array.isArray(result));
      expect(result).toEqual([text1, text2]);
    });
  });

  describe('deleteTextNodes', () => {
    it('должна удалить все текстовые узлы', () => {
      const where = document.createElement('div');

      where.innerHTML = ` <div></div>${random('string')}<p></p>${random('string')}`;
      deleteTextNodes(where);

      expect(where.innerHTML).toBe('<div></div><p></p>');
    });
  });

  describe('collectDOMStat', () => {
    it('должна вернуть статистику по переданному дереву', () => {
      const where = document.createElement('div');
      const class1 = `class-${random('number')}`;
      const class2 = `class-${random('number')}-${random('number')}`;
      const text1 = random('string');
      const text2 = random('string');
      const stat = {
        tags: { P: 1, B: 2 },
        classes: { [class1]: 2, [class2]: 1 },
        texts: 3,
      };

      where.innerHTML = `<p class="${class1}"><b>${text1}</b> <b class="${class1} ${class2}">${text2}</b></p>`;
      const result = collectDOMStat(where);

      expect(result).toEqual(stat);
    });
  });
});
