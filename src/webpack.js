/* eslint global-require: 0 */

require('!!file?name=../package.json!./package.json')
require('!!file?name=../electron.js!./electron.js')

const Vue   = require('vue')
const App   = require('./components/app.vue')

new Vue({
  el    : '#app',
  render: h => h(App),
})
