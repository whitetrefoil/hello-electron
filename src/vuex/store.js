const _    = require('lodash');
const Vue  = require('vue');
const Vuex = require('vuex');

Vue.use(Vuex);

const initialState = {
  params: {
    searchIn: void 0,
    rawExt  : ['ARW', 'DNG', 'asdf', 'qwer', 'xzc', 'dfgh', 'xzvzcvx'],
    jpgExt  : ['JPG', 'JPEG'],
  },
};

const mutations = {

  SET_SEARCH_DIR(state, dir) {
    state.params.searchIn = dir;
  },

  ADD_RAW_EXT(state, ext) {
    state.params.rawExt = _.union(state.params.rawExt, [ext]);
  },
  DELETE_RAW_EXT(state, ext) {
    state.params.rawExt.$remove(ext);
  },
  CLEAR_RAW_EXT(state) {
    state.params.rawExt = [];
  },

  ADD_JPG_EXT(state, ext) {
    state.params.jpgExt = _.union(state.params.jpgExt, [ext]);
  },
  DELETE_JPG_EXT(state, ext) {
    state.params.jpgExt.$remove(ext);
  },
  CLEAR_JPG_EXT(state) {
    state.params.jpgExt = [];
  },
};

module.exports = new Vuex.Store({
  state : initialState,
  mutations,
  strict: true,
});
