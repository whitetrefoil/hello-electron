const _   = require('lodash');
const log = require('../../log');

/**
 * @param {Vuex.Store} store
 * @param {string} mutationType
 * @param {string} paramName
 * @returns {undefined}
 */
const readFromSave = function readFromSave(store, mutationType, paramName) {
  const readSave = localStorage.getItem(paramName);

  if (!_.isEmpty(readSave)) {
    try {
      store.dispatch(mutationType, JSON.parse(readSave));
    } catch (e) {
      log.warn(`Cannot parse "${paramName}" in local storage, will reset it...`);
      localStorage.removeItem(paramName);
    }
  }
};

const localStoragePlugin = function localStoragePlugin(store) {

  readFromSave(store, 'SET_SEARCH_DIR', 'searchIn');
  readFromSave(store, 'SET_RAW_EXT', 'rawExt');
  readFromSave(store, 'SET_JPG_EXT', 'jpgExt');

  store.subscribe((mutation, state) => {

    switch (mutation.type) {
      case 'SET_SEARCH_DIR':
        localStorage.setItem('searchIn', JSON.stringify(state.params.searchIn));
        break;
      case 'ADD_RAW_EXT':
      case 'DELETE_RAW_EXT':
      case 'SET_RAW_EXT':
      case 'CLEAR_RAW_EXT':
        localStorage.setItem('rawExt', JSON.stringify(state.params.rawExt));
        break;
      case 'ADD_JPG_EXT':
      case 'DELETE_JPG_EXT':
      case 'SET_JPG_EXT':
      case 'CLEAR_JPG_EXT':
        localStorage.setItem('jpgExt', JSON.stringify(state.params.jpgExt));
        break;
      default:
        log.warn(`Unknown mutation "${mutation.type}", will ignore...`);
    }
  });
};

module.exports = localStoragePlugin;
