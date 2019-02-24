let webpack = require('webpack');
let HtmlPlugin = require('html-webpack-plugin');
let CleanWebpackPlugin = require('clean-webpack-plugin');
let ExtractTextPlugin = require('mini-css-extract-plugin');
let rules = require('./webpack.config.rules');
let path = require('path');

rules.push({
    test: /\.css$/,
    use: ExtractTextPlugin.loader
});

module.exports = {
    entry: {
        main: './src/index.js',
        dnd: './src/dnd.js'
    },
    devServer: {
        index: 'dnd.html'
    },
    output: {
        filename: '[name].[hash].js',
        path: path.resolve('dist')
    },
    devtool: 'source-map',
    module: { rules },
    plugins: [
       
        new ExtractTextPlugin('styles.css'),
        new HtmlPlugin({
            title: 'Main Homework',
            template: 'index.hbs',
            chunks: ['index']
        }),
        new HtmlPlugin({
            title: 'Div Drag And Drop',
            template: 'dnd.hbs',
            filename: 'dnd.html',
            chunks: ['dnd']
        }),
        new CleanWebpackPlugin(['dist'])
    ]
};
