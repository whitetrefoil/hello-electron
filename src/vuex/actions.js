const _ = require('lodash');

/**
 * @param {string} ext
 * @returns {string}
 */
const formatExt = function formatExt(ext, upperCase = true) {
  if (!_.isString(ext) || _.isEmpty(ext)) {
    throw new TypeError('"extension" must be a non-empty string.');
  }

  let convertedExt = upperCase ? ext.toUpperCase() : ext;

  convertedExt = _.trimStart(convertedExt, ['*', '?', '.']);

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
    // Delete both uppercase and original one in case of dirty data.
    dispatch('DELETE_RAW_EXT', formatExt(ext, false));
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
    // Delete both uppercase and original one in case of dirty data.
    dispatch('DELETE_JPG_EXT', formatExt(ext, false));
    // TODO: Error handling
  },

  clearJpgExt({ dispatch }) {
    dispatch('CLEAR_JPG_EXT');
  },
};
