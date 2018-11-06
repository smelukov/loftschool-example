const path = require('path');
const rules = require('./webpack.config.rules');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    module: {
        rules: [
            ...rules,
            {
                test: /\.js$/,
                enforce: 'post',
                include: [path.resolve('src/')],
                loader: 'istanbul-instrumenter-loader',
                options: { esModules: true }
            },
            {
                test: /\.css$/,
                include: path.resolve('src/'),
                use: ['style-loader', 'css-loader']
            }
        ]
    }
};
