let loaders = require('./webpack.config.loaders')();

loaders.push({
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader']
});

module.exports = {
    devtool: 'inline-source-map',
    module: {
        loaders
    }
};
