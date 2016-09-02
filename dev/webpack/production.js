'use strict';

const webpack           = require('webpack');
const merge             = require('webpack-merge');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common            = require('./common');

module.exports = merge.smart(common, {
  output: {
    publicPath   : 'assets',
    filename     : '[name]-[hash].js',
    chunkFilename: '[id]-[hash].chunk.js',
  },

  module: {
    loaders: [
      {
        test  : /\.css$/,
        loader: ExtractTextPlugin.extract('css'),
      },
      {
        test  : /\.scss$/,
        loader: ExtractTextPlugin.extract('css!resolve-url!sass'),
      },
      {
        test  : /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|ico)$/,
        loader: 'url',
        query : {
          // limit for base64 inlining in bytes
          limit: 32768,
          // custom naming format if file is larger than
          // the threshold
          name : '[hash].[ext]',
        },
      },
    ],
  },

  vue: {
    loaders: {
      js  : 'babel',
      css : ExtractTextPlugin.extract('css'),
      scss: ExtractTextPlugin.extract('css!resolve-url!sass'),
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
    }),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new ExtractTextPlugin('[name]-[hash].css'),
    new HtmlWebpackPlugin({
      filename      : '../index.html',
      template      : './src/index.html',
      chunks        : ['lib', 'app'],
      hash          : false,
      minify        : {
        collapseBooleanAttributes    : true,
        collapseWhitespace           : true,
        removeAttributeQuotes        : true,
        removeComments               : true,
        removeEmptyAttributes        : true,
        removeRedundantAttributes    : false,
        removeScriptTypeAttributes   : true,
        removeStyleLinkTypeAttributes: true,
      },
      inject        : 'body',
      chunksSortMode: 'none',
    }),
  ],
});
