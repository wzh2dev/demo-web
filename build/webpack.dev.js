'use strict'
const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const { commonWebpackConfig, cssLoaders } = require('./webpack.common.js')

const devWebpackConfig = merge(commonWebpackConfig, {
  mode: "development",

  output: {
    filename: '[name].js'
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', ...cssLoaders]
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: true
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(__dirname, '../static'),
          to: "public",
          globOptions: { ignore: ['.*'] }
        }
      ]
    })
  ],

  devServer: {
    port: 8080,
    open: true,
    hot: true
  },

  devtool: 'eval-cheap-source-map'
})

module.exports = devWebpackConfig
