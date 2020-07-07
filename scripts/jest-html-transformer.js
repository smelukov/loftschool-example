module.exports = {
  process(src, filename, config, options) {
    return `
    const html = ${JSON.stringify(src)};
    document.querySelector('#homework-container').innerHTML = html;
    `;
  },
};
