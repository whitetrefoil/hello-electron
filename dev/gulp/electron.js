'use strict'

const spawn    = require('child_process').spawn
const electron = require('electron')
const gulp     = require('gulp')
const chalk    = require('gulp-util').colors
const config   = require('../config')

let electronProcess

gulp.task('electron', () => {
  if (electronProcess != null) {
    electronProcess.kill()
  }
  electronProcess = spawn(electron, [config.outputDir])
  electronProcess.on('error', () => {
    console.warn(`'Failed to kill an electron instance.  You may have to kill it manually.  It's PID is ${chalk.bold(electronProcess.pid)}`)
  })
})
