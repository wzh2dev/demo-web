'use strict'
const webpack = require('webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './index.js',
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'my-first-webpack.bundle.js'
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, 'public', 'index.html'),
      inject: true
    }),
    new CopyWebpackPlugin([
      {
        from: path.join(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
};
