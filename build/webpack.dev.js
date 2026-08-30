'use strict'
const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const { commonWebpackConfig, cssLoaders } = require('./webpack.common.js')

const devWebpackConfig = merge(commonWebpackConfig, {
  mode: "development",

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
          from: path.resolve(__dirname, '../static'),
          to: "public",
          globOptions: { ignore: ['.*'] }
        }
      ]
    })
  ],

  devServer: {
    compress: true,
    port: 8080,
    open: true,
    hot: true,
    clientLogLevel: 'info',
    quiet: false
  },

  devtool: 'eval-cheap-source-map'
})

module.exports = devWebpackConfig
