module.exports = (content) => content;
module.exports.pitch = (remainingRequest) => {
  return `
  export default (dataOrSelector, selector) => {
    const data = typeof dataOrSelector === 'string' ? undefined : dataOrSelector;
    const template = require(${JSON.stringify('-!' + remainingRequest)});
    
    selector = typeof dataOrSelector === 'string' ? dataOrSelector : null;
    
    if (typeof DOMParser === 'undefined') {
      return template(data);
    }
    
    const parser = new DOMParser();
    const doc = parser.parseFromString(template(data), "text/html");
    const fragment = document.createDocumentFragment();
    
    fragment.append(...doc.body.children);
    
    if (selector) {
      return fragment.querySelector(selector);
    }
    
    return fragment;
  };
  `;
};
