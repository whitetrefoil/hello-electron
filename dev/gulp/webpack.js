// "webpack" Gulp Task
// ==========
//
// Webpack build.

'use strict';

const del               = require('del');
const gulp              = require('gulp');
const webpack           = require('webpack');
const webpackStream     = require('webpack-stream');
const developmentConfig = require('../webpack/development.js');
const productionConfig  = require('../webpack/production.js');

const config = require('../config');

gulp.task('webpack', done => {

  del('lib')
    .then(() => {
      gulp.src(config.sourceAnd('webpack.js'))
        .pipe(webpackStream(process.env.NODE_ENV === 'development'
            ? developmentConfig
            : productionConfig
          , webpack))
        .pipe(gulp.dest(config.outputAnd('assets')))
        .on('finish', done)
      ;
    });
});
