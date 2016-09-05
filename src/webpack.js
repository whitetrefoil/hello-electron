/* eslint global-require: 0 */

require('!!file?name=../package.json!./package.json');
if (process.env.NODE_ENV === 'development') {
  require('!!file?name=../electron.js!./electron-dev.js');
} else {
  require('!!file?name=../electron.js!./electron-prod.js');
}

const Vue    = require('vue');
const VueMdl = require('vue-mdl');
const store  = require('./vuex/store');

Vue.use(VueMdl.default);


const App = require('./components/app.vue');

new Vue({
  store,
  el        : 'body',
  components: {
    app: App,
  },
});
