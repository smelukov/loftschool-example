let path = require('path');
let rules = require('./webpack.config.rules')();

rules.push({
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
});

rules.push({
    test: /\.js$/,
    include: path.resolve('src/'),
    loader: 'istanbul-instrumenter-loader',
    options: {
        esModules: true
    }
});

module.exports = {
    devtool: 'inline-source-map',
    module: { rules }
};
