const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(process.cwd(), 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  mode: 'development',
  plugins: [
    new HTMLWebpackPlugin({
      template: './public/index.html',
      favicon: './public/assets/favicon.ico',
    }),
    new CleanWebpackPlugin(),
  ],
};
