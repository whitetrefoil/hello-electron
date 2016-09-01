'use strict';

const fs      = require('fs-extra');
const webpack = require('webpack');
const config  = require('../config');
const babelrc = fs.readJsonSync('.babelrc');

module.exports = {
  entry: {
    lib: [
      'moment',
      // 'jquery',
      'vue',
      'vue-mdl',
      'vue-router',
      // 'vue-resource',
    ],
    app: 'webpack.js',
  },

  resolve: {
    root              : [
      config.rootAnd(config.sourceDir),
      config.rootAnd('node_modules'),
    ],
    modulesDirectories: [],
    extensions        : ['', '.js', '.vue'],
  },

  resolveLoader: {
    root              : [
      config.rootAnd('node_modules'),
    ],
    modulesDirectories: [],
  },

  module: {
    preLoaders: [
      {
        test   : /\.(?:js|vue)$/,
        loader : 'eslint',
        exclude: /node_modules/,
      },
    ],
    loaders   : [
      {
        test  : /\.html$/,
        loader: 'html',
      },
      {
        test  : /\.vue$/,
        loader: 'vue',
      },
      {
        test   : /\.js$/,
        loader : 'babel',
        exclude: /node_modules/,
      },
      // Use below code if need to handle dependencies among external libraries.
      // ```
      // {
      //   test  : RegExp(path.normalize('/bootstrap-sass/assets/javascripts').replace(/\\/g, '\\\\')),
      //   loader: 'imports?jQuery=jquery',
      // },
      // ```
    ],
  },

  vue: {
    autoprefixer: {
      browsers: ['last 2 versions'],
    },
  },

  sassLoader: {
    includePaths  : [config.sourceAnd('css')],
    indentedSyntax: false,
    outputStyle   : 'expanded',
    precision     : 8,
  },

  babel: babelrc,

  htmlLoader: {
    minimize: false,
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'lib',
    }),
  ],
};
