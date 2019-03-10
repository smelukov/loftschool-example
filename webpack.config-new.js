let webpack = require("webpack");
let HtmlPlugin = require("html-webpack-plugin");
let CleanWebpackPlugin = require("clean-webpack-plugin");
let ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
let rules = require("./webpack.config.rules")();
let path = require("path");

rules.push({
  test: /\.css$/,
  use: ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: "css-loader"
  })
});

module.exports = {
  entry: {
    cookie: "./src/cookie.js"
  },
  devServer: {
    index: "cookie.html"
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve("dist")
  },
  devtool: "source-map",
  module: { rules },
  optimization: {
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new HtmlPlugin({
      title: "Main Homework",
      template: "main.hbs",
      chunks: ["main"]
    }),
    new HtmlPlugin({
      title: "Cookie filter",
      template: "cookie.hbs",
      filename: "cookie.html",
      chunks: ["cookie"]
    }),
    new CleanWebpackPlugin(["dist"])
  ]
};