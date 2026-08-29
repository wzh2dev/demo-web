'use strict'
const { merge } = require('webpack-merge')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const { commonWebpackConfig, cssLoaders } = require('./webpack.common.js')

const prodWebpackConfig = merge(commonWebpackConfig, {
  mode: "production",

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, ...cssLoaders]
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './public/index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        removeAttributeQuotes: true,
        removeComments: true
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve(__dirname, '../static'),
          to: "public",
          globOptions: { ignore: ['.*'] }
        }
      ]
    }),
    new CompressionWebpackPlugin({
      filename: '[path][base].gz',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css)$'),
      threshold: 10240,
      minRatio: 0.8
    }),
    new BundleAnalyzerPlugin({
      analyzerMode: 'disabled'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash:8].css'
    }),
    new OptimizeCSSAssetsPlugin()
  ],

  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },

  devtool: 'nosources-source-map'
})

module.exports = prodWebpackConfig
