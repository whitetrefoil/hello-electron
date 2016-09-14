const Promise  = require('bluebird');
const fs       = Promise.promisifyAll(require('fs-extra'));
const _        = require('lodash');
const path     = require('path');
const through2 = require('through2');
const log      = require('../log');

/**
 * @function
 * @returns {function}
 */
const filterDirectories = () => through2.obj((chunk, enc, next) => {
  if (chunk.stats.isDirectory()) {
    return next();
  }
  return next(null, chunk);
});

/**
 * @function
 * @param {Array.<string>} rawExt
 * @param {Array.<string>} jpgExt
 * @returns {function}
 */
const filterUnrelatedFiles = (rawExt, jpgExt) => through2.obj((chunk, enc, next) => {
  const extname = path.extname(chunk.path).substr(1).toUpperCase();

  if (rawExt.indexOf(extname) >= 0) {
    chunk.isRaw = true;
    return next(null, chunk);
  }

  if (jpgExt.indexOf(extname) >= 0) {
    chunk.isJpg = true;
    return next(null, chunk);
  }

  return next();
});

/**
 * @param {string} ext
 * @param {bool} [upperCase=true]
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

/**
 * @param {Array.<string>} rawFiles
 * @param {Array.<string>} jpgFiles
 * @param {string} baseDir - `state.params.searchIn`
 * @returns {Array.<object>}
 */
const findUnnecessaryFiles = function findUnnecessaryFiles(rawFiles, jpgFiles, baseDir) {
  const searchResult = [];

  _.forEach(rawFiles, raw => {
    const file = {};

    file.rawFile = raw;
    file.basename = path.join(path.dirname(raw), path.basename(raw, path.extname(raw)));

    file.jpgFiles = _.filter(jpgFiles, jpg => {
      const jpgBasename = path.join(path.dirname(jpg), path.basename(jpg, path.extname(jpg)));
      return jpgBasename === file.basename;
    });
    if (file.jpgFiles.length === 0) { return; }

    file.shortPath = path.relative(baseDir, file.rawFile);
    file.foundJpgExts = _.map(file.jpgFiles, jpg => path.extname(jpg));

    searchResult.push(file);
  });

  return searchResult;
};


module.exports = {

  setSearchDir({ dispatch }, dir) {
    dispatch('SET_SEARCH_DIR', dir);
  },

  addRawExt({ dispatch }, ext) {
    // TODO: Remove the same extname from `jpgExt`
    dispatch('ADD_RAW_EXT', formatExt(ext));
  },

  deleteRawExt({ dispatch }, ext) {
    dispatch('DELETE_RAW_EXT', formatExt(ext));
    // Delete both uppercase and original one in case of dirty data.
    dispatch('DELETE_RAW_EXT', formatExt(ext, false));
  },

  clearRawExt({ dispatch }) {
    dispatch('CLEAR_RAW_EXT');
  },

  addJpgExt({ dispatch }, ext) {
    // TODO: Remove the same extname from `rawExt`
    dispatch('ADD_JPG_EXT', formatExt(ext));
  },

  deleteJpgExt({ dispatch }, ext) {
    dispatch('DELETE_JPG_EXT', formatExt(ext));
    // Delete both uppercase and original one in case of dirty data.
    dispatch('DELETE_JPG_EXT', formatExt(ext, false));
  },

  clearJpgExt({ dispatch }) {
    dispatch('CLEAR_JPG_EXT');
  },

  search({ dispatch, state }) {

    const rawFiles = [];
    const jpgFiles = [];

    fs.walk(state.params.searchIn)

      .pipe(filterDirectories())
      .pipe(filterUnrelatedFiles(state.params.rawExt, state.params.jpgExt))

      .on('data', file => {
        if (file.isRaw) { rawFiles.push(file.path); }
        if (file.isJpg) { jpgFiles.push(file.path); }
      })

      .on('end', () => {
        const searchResult = findUnnecessaryFiles(rawFiles, jpgFiles, state.params.searchIn);
        dispatch('SET_SEARCH_RESULT', searchResult);
        dispatch('CLEAR_ERROR_MESSAGES');
      })

      .on('error', err => {
        log.error(err);
        dispatch('ADD_ERROR_MESSAGE', err.message);
      })
    ;
  },
};
