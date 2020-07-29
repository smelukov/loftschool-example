module.exports = (content) => content;
module.exports.pitch = (remainingRequest) => {
  return `
  const html = require(${JSON.stringify('-!' + remainingRequest)}).default;
  document.write(html);
  `;
};
