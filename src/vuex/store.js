const Vue  = require('vue');
const Vuex = require('vuex');

Vue.use(Vuex);

const initialState = {
  params: {
    searchIn: void 0,
    rawExt  : new Set(['.ARW', '.DNG']),
    jpgExt  : new Set(['.JPG', '.JPEG']),
  },
};

const mutations = {

  SET_SEARCH_DIR(state, dir) {
    state.params.searchIn = dir;
  },

  ADD_RAW_EXT(state, ext) {
    state.params.rawExt.add(ext);
  },
  DELETE_RAW_EXT(state, ext) {
    state.params.rawExt.delete(ext);
  },
  CLEAR_RAW_EXT(state) {
    state.params.rawExt.clear();
  },

  ADD_JPG_EXT(state, ext) {
    state.params.jpgExt.add(ext);
  },
  DELETE_JPG_EXT(state, ext) {
    state.params.jpgExt.delete(ext);
  },
  CLEAR_JPG_EXT(state) {
    state.params.jpgExt.clear();
  },
};

module.exports = new Vuex.Store({
  state : initialState,
  mutations,
  strict: true,
});
