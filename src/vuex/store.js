const _                  = require('lodash')
const Vue                = require('vue')
const Vuex               = require('vuex')
const actions            = require('./actions')
const localStoragePlugin = require('./plugins/local-storage')

Vue.use(Vuex)


const initialState = {
  params               : {
    searchIn: '',
    rawExt  : ['ARW', 'DNG'],
    jpgExt  : ['JPG', 'JPEG'],
    orderBy : 'jpg',
  },
  searchResult         : void 0,
  searchResultSelection: void 0,
  errors               : [],
}

const mutations = {

  SET_SEARCH_DIR(state, dir) {
    state.params.searchIn = dir
  },

  ADD_RAW_EXT(state, ext) {
    state.params.rawExt = _.union(state.params.rawExt, [ext])
  },
  DELETE_RAW_EXT(state, ext) {
    const index = state.params.rawExt.indexOf(ext)
    if (index >= 0) { state.params.rawExt.splice(index, 1) }
  },
  SET_RAW_EXT(state, exts) {
    state.params.rawExt = exts
  },
  CLEAR_RAW_EXT(state) {
    state.params.rawExt = []
  },

  ADD_JPG_EXT(state, ext) {
    state.params.jpgExt = _.union(state.params.jpgExt, [ext])
  },
  DELETE_JPG_EXT(state, ext) {
    const index = state.params.jpgExt.indexOf(ext)
    if (index >= 0) { state.params.jpgExt.splice(index, 1) }
  },
  SET_JPG_EXT(state, exts) {
    state.params.jpgExt = exts
  },
  CLEAR_JPG_EXT(state) {
    state.params.jpgExt = []
  },

  SET_ORDER_BY(state, orderBy) {
    state.params.orderBy = orderBy
  },

  SET_SEARCH_RESULT(state, result) {
    state.searchResult = result
  },

  SET_SEARCH_RESULT_SELECTION(state, selection) {
    state.searchResultSelection = selection
  },

  ADD_ERROR_MESSAGE(state, { message, timestamp }) {
    state.errors.push({ message, timestamp })
  },
  SET_ERROR_MESSAGES(state, messages) {
    state.errors = messages
  },
  REMOVE_FIRST_ERROR_MESSAGE(state) {
    state.errors.splice(0, 1)
  },
  CLEAR_ERROR_MESSAGES(state) {
    state.errors = []
  },
}

module.exports = new Vuex.Store({
  state  : initialState,
  mutations,
  actions,
  plugins: [localStoragePlugin],
  strict : true,
})
