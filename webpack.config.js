const HtmlPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');
const path = require('path');

const root = path.resolve('projects');
const projects = fs.readdirSync(root);
const entries = {};
const htmlPlugins = [];
const proxy = {};

for (const project of projects) {
  const projectPath = path.join(root, project);
  entries[project] = projectPath;
  htmlPlugins.push(
    new HtmlPlugin({
      title: project,
      template: path.resolve('./layout.html'),
      filename: `${project}/index.html`,
      chunks: [project],
    })
  );

  const settingsPath = path.join(projectPath, 'settings.json');

  if (fs.existsSync(settingsPath)) {
    const settings = require(settingsPath);
    Object.assign(proxy, settings.proxy);
  }
}

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  entry: entries,
  output: {
    filename: mode === 'production' ? 'name/[chunkhash].js' : '[name]/[name].js',
    path: path.resolve('dist'),
  },
  mode,
  devServer: {
    proxy,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
      },
      {
        test: /projects\/.+\.html/,
        use: [
          { loader: './scripts/html-inject-loader.js' },
          {
            loader: 'raw-loader',
          },
        ],
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/i,
        loader: 'file-loader',
        options: {
          name: '[hash:8].[ext]',
          outputPath: 'reosurces',
        },
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    ...htmlPlugins,
    new CleanWebpackPlugin(),
  ],
};
