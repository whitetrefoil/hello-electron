console.log('test')

require('!!file?name=../package.json!./package.json')
if (process.env.NODE_ENV === 'development') {
  require('!!file?name=../electron.js!./electron-dev.js')
} else {
  require('!!file?name=../electron.js!./electron-prod.js')
}

const fs = require('fs')

const _ = require('vue')
