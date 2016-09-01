'use strict';

const del      = require('del');
const gulp     = require('gulp');
const electron = require('gulp-atom-electron');
const symdest  = require('gulp-symdest');
const config   = require('../config');

gulp.task('build', ['webpack'], () => {
  del.sync('dist');

  return gulp.src(config.outputAnd('**'), { base: config.outputDir })
    .pipe(electron({
      version : '1.3.4',
      platform: 'darwin',
    }))
    .pipe(symdest('dist/app'))
    // .pipe(zip.dest('dist/app-darwin.zip'))
    ;
});
