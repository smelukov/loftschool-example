const fs = require('fs');
const path = require('path');
const HtmlPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const root = path.resolve('projects');
const projects = fs.readdirSync(root);
const entries = {};
const htmlPlugins = [];
const proxy = {};

for (const project of projects) {
  const projectPath = path.join(root, project);
  const globalHTML = path.resolve('./layout.html');
  const projectHTML = path.join(projectPath, 'layout.html');

  if (!fs.statSync(projectPath).isDirectory()) {
    continue;
  }

  entries[project] = projectPath;
  htmlPlugins.push(
    new HtmlPlugin({
      title: project,
      template: fs.existsSync(projectHTML) ? projectHTML : globalHTML,
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
    clean: true,
    filename: mode === 'production' ? 'name/[chunkhash].js' : '[name]/[name].js',
    path: path.resolve('dist'),
  },
  mode,
  devServer: {
    proxy,
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: { cacheDirectory: true },
      },
      {
        test: /projects\/.+\.html$/,
        use: [{ loader: './scripts/html-inject-loader.js' }, { loader: 'html-loader' }],
      },
      {
        test: /\.(jpe?g|png|gif|svg|eot|ttf|woff|woff2)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.html\.hbs$/,
        use: [
          { loader: './scripts/html-to-dom-loader.js' },
          { loader: 'handlebars-loader' },
        ],
      },
      {
        test: /\.hbs$/,
        exclude: /\.html\.hbs$/,
        use: 'handlebars-loader',
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    ...htmlPlugins,
  ],
};
