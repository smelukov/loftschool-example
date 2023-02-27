module.exports = (content) => content;
module.exports.pitch = (remainingRequest) => {
  return `
  const html = require(${JSON.stringify('-!' + remainingRequest)}).default;
  if (typeof DOMParser === 'undefined') {
    module.exports = html;
  } else {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");
    const fragment = document.createDocumentFragment();
    
    fragment.appendChild(doc.documentElement);
    document.body.append(fragment);
  }
  `;
};
