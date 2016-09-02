/* eslint global-require: 0 */

require('!!file?name=../package.json!./package.json');
if (process.env.NODE_ENV === 'development') {
  require('!!file?name=../electron.js!./electron-dev.js');
} else {
  require('!!file?name=../electron.js!./electron-prod.js');
}

const Vue      = require('vue');
const VueMdl   = require('vue-mdl');
const VuexSync = require('vuex-router-sync');
const router   = require('./router/router');
const store    = require('./vuex/store');

Vue.use(VueMdl.default);

VuexSync.sync(store, router);

const App = require('./components/app.vue');

router.start(App, 'app');
