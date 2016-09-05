'use strict';

const webpack           = require('webpack');
const merge             = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common            = require('./common');

module.exports = merge.smart(common, {
  devtool: 'inline-source-map',

  output: {
    publicPath   : 'assets',
    filename     : '[name].js',
    chunkFilename: '[id].chunk.js',
  },

  module: {
    loaders: [
      {
        test  : /\.css$/,
        loader: ExtractTextPlugin.extract('style!css?sourceMap'),
      },
      {
        test   : /\.scss$/,
        loaders: ExtractTextPlugin.extract('style!css?sourceMap!resolve-url?sourceMap!sass?sourceMap'),
      },
      {
        test  : /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)$/,
        loader: 'url',
      },
    ],
  },

  vue: {
    loaders: {
      js  : 'babel',
      css : ExtractTextPlugin.extract('css?sourceMap'),
      scss: ExtractTextPlugin.extract('css?sourceMap!resolve-url?sourceMap!sass?sourceMap'),
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new ExtractTextPlugin('./[name].css', { allChunks: true }),
    new HtmlWebpackPlugin({
      filename      : '../index.html',
      template      : './src/index.html',
      chunks        : ['lib', 'app'],
      hash          : false,
      minify        : false,
      inject        : 'body',
      chunksSortMode: 'auto',
    }),
  ],
});
