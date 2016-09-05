const Vue  = require('vue');
const Vuex = require('vuex');

Vue.use(Vuex);

const initialState = {
  params: {
    searchIn     : void 0,
    rawExtensions: [],
    jpgExtensions: [],
  },
};

const mutations = {
  SET_SEARCH_DIR(state, dir) {
    state.params.searchIn = dir;
  },
};

module.exports = new Vuex.Store({
  state : initialState,
  mutations,
  strict: true,
});
