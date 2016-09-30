const Promise      = require('bluebird')
const fs           = Promise.promisifyAll(require('fs-extra'))
const _            = require('lodash')
const through2     = require('through2')
const log          = require('../../log')
const SearchResult = require('./search-result')

/**
 * @function
 * @returns {function}
 */
const filterDirectories = () => through2.obj((chunk, enc, next) => {
  if (chunk.stats.isDirectory()) {
    return next()
  }
  return next(null, chunk)
})

/**
 * @param {string} ext
 * @param {bool} [upperCase=true]
 * @returns {string}
 */
const formatExt = function formatExt(ext, upperCase = true) {
  if (!_.isString(ext) || _.isEmpty(ext)) {
    throw new TypeError('"extension" must be a non-empty string.')
  }

  let convertedExt = upperCase ? ext.toUpperCase() : ext

  convertedExt = _.trimStart(convertedExt, ['*', '?', '.'])

  return convertedExt
}

module.exports = {

  async setSearchDir({ commit, dispatch }, dir) {
    try {
      await fs.accessAsync(dir, fs.constants.R_OK | fs.constants.X_OK)
    } catch (e) {
      switch (e.code) {
        case 'ENOENT':
          dispatch('addErrorMessage', 'No such directory!')
          return
        case 'EACCES':
          dispatch('addErrorMessage', 'Not have READ / EXECUTE permission on this directory!')
          return
        default:
          dispatch('addErrorMessage', 'Unknown error about the search directory!')
          return
      }
    }
    commit('SET_SEARCH_DIR', dir)
  },

  addRawExt({ commit }, ext) {
    // TODO: Remove the same extname from `jpgExt`
    commit('ADD_RAW_EXT', formatExt(ext))
  },

  deleteRawExt({ commit }, ext) {
    commit('DELETE_RAW_EXT', formatExt(ext))
    // Delete both uppercase and original one in case of dirty data.
    commit('DELETE_RAW_EXT', formatExt(ext, false))
  },

  clearRawExt({ commit }) {
    commit('CLEAR_RAW_EXT')
  },

  addJpgExt({ commit }, ext) {
    // TODO: Remove the same extname from `rawExt`
    commit('ADD_JPG_EXT', formatExt(ext))
  },

  deleteJpgExt({ commit }, ext) {
    commit('DELETE_JPG_EXT', formatExt(ext))
    // Delete both uppercase and original one in case of dirty data.
    commit('DELETE_JPG_EXT', formatExt(ext, false))
  },

  clearJpgExt({ commit }) {
    commit('CLEAR_JPG_EXT')
  },

  setOrderBy({ commit }, orderBy) {
    switch (orderBy) {
      case 'jpg':
      case 'raw':
        commit('SET_ORDER_BY', orderBy)
        break
      default:
        throw new Error('Unknown value of `orderBy`')
    }
  },

  setSearchResult({ commit }, searchResult) {
    commit('SET_SEARCH_RESULT', searchResult)
  },

  setSearchResultSelection({ state, commit }, { jpgPath, isSelected }) {
    const allJpgPaths = _.map(state.searchResult.jpgFiles, 'path')

    if (jpgPath == null) {
      const newSelection = _.reduce(allJpgPaths, (acc, k) => {
        return { ...acc, [k]: isSelected }
      }, {})
      commit('SET_SEARCH_RESULT_SELECTION', newSelection)
      return
    }

    if (_.includes(allJpgPaths, jpgPath)) {
      const newSelection = _.assign(
        {},
        state.searchResultSelection,
        { [jpgPath]: isSelected },
      )
      commit('SET_SEARCH_RESULT_SELECTION', newSelection)
      return
    }

    log.warn(`Attempting to select unknown file ${jpgPath}, ignoring.`)
  },

  search({ dispatch, state }) {

    const files = []

    fs.walk(state.params.searchIn)

      .pipe(filterDirectories())

      .on('data', file => {
        files.push(file.path)
      })

      .on('end', () => {
        const searchResult = new SearchResult(
          files, state.params.rawExt,
          state.params.jpgExt,
          state.params.searchIn,
        )
        dispatch('setSearchResult', searchResult)
        dispatch('setSearchResultSelection', {
          jpgPath   : null,
          isSelected: true,
        })
        dispatch('clearErrorMessage')
      })

      .on('error', err => {
        log.error(err)
        dispatch('addErrorMessage', err.message)
      })

  },

  /**
   * @param {function} commit
   * @param {string} message
   * @returns {undefined}
   */
  addErrorMessage({ commit }, message) {
    commit('ADD_ERROR_MESSAGE', {
      message  : message.toString(),
      timestamp: new Date(),
    })
  },

  clearErrorMessage({ commit }) {
    commit('CLEAR_ERROR_MESSAGES')
  },

  removeFirstErrorMessage({ commit }) {
    commit('REMOVE_FIRST_ERROR_MESSAGE')
  },
}
