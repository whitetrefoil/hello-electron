/* eslint global-require: 0 */

require('!!file?name=../package.json!./package.json')
if (process.env.NODE_ENV === 'development') {
  require('!!file?name=../electron.js!./electron-dev.js')
} else {
  require('!!file?name=../electron.js!./electron-prod.js')
}

const Vue   = require('vue')
const App   = require('./components/app.vue')

new Vue({
  el    : '#app',
  render: h => h(App),
})
