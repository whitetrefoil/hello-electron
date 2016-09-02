'use strict';

const Promise       = require('bluebird');
const asynk         = Promise.coroutine;
const chokidar      = require('chokidar');
const del           = require('del');
const fs            = require('fs-extra');
const gulp          = require('gulp');
const _             = require('lodash');
const path          = require('path');
const plumber       = require('gulp-plumber');
const run           = Promise.promisify(require('run-sequence'));
const webpack       = require('webpack');
const webpackStream = require('webpack-stream');
const config        = require('../config');
const watchConfig   = require('../webpack/watch.js');


const startWatching = function startWatching() {

  const watchingFiles = config.rootAnd(config.outputAnd('**/*.*'));

  let restartTimer = {};

  chokidar.watch(watchingFiles, {
    awaitWriteFinish: {
      stabilityThreshold: 200,
    },
  })
    .on('ready', () => {
      console.log(`Electron is watching in ${watchingFiles}`);
    })
    .on('all', function rebuild(type, absPath) {
      const sourcePath = path.relative(config.outputDir, absPath);

      console.log(`${type}: "${sourcePath}"`);

      if (_.isFunction(restartTimer.clearTimeout)) {
        restartTimer.clearTimeout();
      }
      restartTimer = setTimeout(() => { run('electron'); }, 500);
    });
};


gulp.task('watch', asynk(function *watchTask() {

  yield del('lib');

  fs.ensureDirSync(config.outputDir);

  gulp.src(config.sourceAnd('webpack.js'))
    .pipe(plumber())
    .pipe(webpackStream(watchConfig, webpack))
    .pipe(gulp.dest(config.outputAnd('assets')))
  ;

  startWatching();
}));
