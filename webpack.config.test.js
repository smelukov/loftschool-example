let path = require('path');
let loaders = require('./webpack.config.loaders')();

loaders.push({
    test: /\.css$/,
    loaders: ['style-loader', 'css-loader']
});

loaders.push({
    test: /\.js$/,
    include: path.resolve('src/'),
    loader: 'istanbul-instrumenter-loader',
    query: {
        esModules: true
    }
});

module.exports = {
    devtool: 'inline-source-map',
    module: {
        loaders
    }
};
