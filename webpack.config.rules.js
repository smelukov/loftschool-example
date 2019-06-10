module.exports = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheDirectory: true }
    },
    {
        test: /\.hbs/,
        loader: 'handlebars-loader'
    },
    {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
            name: '[hash:8].[ext]',
            outputPath: 'reosurces'
        }
    }
];
