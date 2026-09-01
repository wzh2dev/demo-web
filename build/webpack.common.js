'use strict'
const webpack = require('webpack')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')

const cssLoaders = ['css-loader']

const commonWebpackConfig = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.ts'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.runtime.esm.js',
      '@': path.join(__dirname, '..', 'src')
    }
  },
  module: {
    rules: [
      {
        test: /\.((j|t)s|vue)$/,
        exclude: /node_modules/,
        enforce: 'pre',
        loader: 'eslint-loader',
        options: {
          fix: true
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },

      {
        oneOf: [
          {
            test: /\.ts$/,
            exclude: /node_modules/,
            loader: 'ts-loader',
            options: { appendTsSuffixTo: [/\.vue$/] }
          },
          {
            test: /\.m?js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
          },
          {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              esModule: false,
              name: path.posix.join('static', 'img/[hash:7].[ext]')
            }
          },
          {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              esModule: false,
              name: path.posix.join('static', 'media/[hash:7].[ext]')
            }
          },
          {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            loader: 'url-loader',
            options: {
              limit: 10000,
              esModule: false,
              name: path.posix.join('static', 'fonts/[hash:7].[ext]')
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new webpack.ProgressPlugin(),
    new VueLoaderPlugin()
  ]
}

module.exports = { commonWebpackConfig, cssLoaders }
