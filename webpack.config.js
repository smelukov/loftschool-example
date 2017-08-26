let webpack = require('webpack');
let HtmlPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');
let loaders = require('./webpack.config.loaders')();
let path = require('path');

loaders.push({
    test: /\.css$/,
    loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader'
    })
});

module.exports = {
    entry: {
        main: './src/index.js',
        cookie: './src/cookie.js'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve('dist')
    },
    devtool: 'source-map',
    module: {
        loaders
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            compress: {
                drop_debugger: false
            }
        }),
        new ExtractTextPlugin('styles.css'),
        new HtmlPlugin({
            title: 'Main Homework',
            template: 'index.hbs',
            chunks: ['main']
        }),
        new HtmlPlugin({
            title: 'Div Drag And Drop',
            template: 'cookie.hbs',
            filename: 'cookie.html',
            chunks: ['cookie']
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};
