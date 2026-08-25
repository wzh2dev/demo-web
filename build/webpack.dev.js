'use strict'
const webpack = require('webpack')
const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const baseWebpackConfig = require('./webpack.common.js')

const devWebpackConfig = merge(baseWebpackConfig, {
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../static'),
          to: "public",
          globOptions: { ignore: ['.*'] }
        }
      ]
    })
  ]
})

module.exports = devWebpackConfig
