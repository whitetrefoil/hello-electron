const _ = require('lodash');

/**
 * @param {string} ext
 * @returns {string}
 */
const formatExt = function formatExt(ext) {
  if (!_.isString(ext) || _.isEmpty(ext)) {
    throw new TypeError('"extension" must be a non-empty string.');
  }

  let convertedExt = ext.toUpperCase();

  if (convertedExt[0] !== '.') {
    convertedExt = '.' + convertedExt;
  }

  return convertedExt;
};


module.exports = {

  setSearchDir({ dispatch }, dir) {
    dispatch('SET_SEARCH_DIR', dir);
  },

  addRawExt({ dispatch }, ext) {
    dispatch('ADD_RAW_EXT', formatExt(ext));
    // TODO: Error handling
  },

  deleteRawExt({ dispatch }, ext) {
    dispatch('DELETE_RAW_EXT', formatExt(ext));
    // TODO: Error handling
  },

  clearRawExt({ dispatch }) {
    dispatch('CLEAR_RAW_EXT');
  },

  addJpgExt({ dispatch }, ext) {
    dispatch('ADD_JPG_EXT', formatExt(ext));
    // TODO: Error handling
  },

  deleteJpgExt({ dispatch }, ext) {
    dispatch('DELETE_JPG_EXT', formatExt(ext));
    // TODO: Error handling
  },

  clearJpgExt({ dispatch }) {
    dispatch('CLEAR_JPG_EXT');
  },
};
