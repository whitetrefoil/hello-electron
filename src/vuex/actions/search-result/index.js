/**
 * @module vuex/actions/search-result
 */

const _    = require('lodash')
const path = require('path')

/**
 * @typedef {Object} File
 * @property {string} path
 * @property {string} shortPath
 * @property {string} extname
 */

/**
 * @typedef {Object} RenderedResultRow
 * @property {File} file
 * @property {Array.<File>} companions
 */

/**
 * @param {Array.<string>} files
 * @param {Array.<string>} rawExt
 * @param {Array.<string>} jpgExt
 * @returns {{rawFiles:Array.<string>, jpgFiles:Array.<string>}}
 */
const filterUnrelatedFiles = function filterUnrelatedFiles(files, rawExt, jpgExt) {

  const rawFiles = []
  const jpgFiles = []

  _.forEach(files, file => {

    const extname = path.extname(file).substr(1).toUpperCase()

    if (rawExt.indexOf(extname) >= 0) {
      rawFiles.push(file)
      return
    }

    if (jpgExt.indexOf(extname) >= 0) {
      jpgFiles.push(file)
    }
  })

  return { rawFiles, jpgFiles }
}

/**
 * @param {string} filePath
 * @returns {string}
 */
const getBasenameWithPath = function getBasenameWithPath(filePath) {
  return path.join(
    path.dirname(filePath),
    path.basename(filePath, path.extname(filePath)),
  )
}

class SearchResult {
  /** @type {Array.<string>} */
  rawExt   = [];
  /** @type {Array.<string>} */
  jpgExt   = [];
  /** @type {Array.<File>} */
  rawFiles = [];
  /** @type {Array.<File>} */
  jpgFiles = [];
  /** @type {Array.<RenderedResultRow>} */
  byRaw    = [];
  /** @type {Array.<RenderedResultRow>} */
  byJpg    = [];
  /** @type {string} */
  baseDir  = '';

  /**
   * @param {Array.<string>} files
   * @returns {undefined}
   */
  parseResult(files) {
    const { rawFiles, jpgFiles } = filterUnrelatedFiles(files, this.rawExt, this.jpgExt)

    this.jpgFiles = _.map(jpgFiles, jpgFile => {
      return {
        path      : jpgFile,
        shortPath : path.relative(this.baseDir, jpgFile),
      }
    })

    this.rawFiles = _.map(rawFiles, rawFile => {
      return {
        path     : rawFile,
        shortPath: path.relative(this.baseDir, rawFile),
      }
    })
  }

  /**
   * @param {Array.<File>} byFiles
   * @param {Array.<File>} companionFiles
   * @returns {Array.<RenderedResultRow>}
   */
  renderBy(byFiles, companionFiles) {
    const rendered = []

    _.forEach(byFiles, byFile => {
      /** @type {RenderedResultRow} */
      const row         = { file: byFile }
      const rawBasename = getBasenameWithPath(byFile.shortPath)

      row.companions = _.filter(companionFiles, companion => {
        const jpgBasename = getBasenameWithPath(companion.shortPath)
        return jpgBasename === rawBasename
      })

      if (!_.isEmpty(row.companions)) {
        rendered.push(row)
      }
    })

    return rendered
  }

  /**
   * @returns {undefined}
   */
  render() {
    this.byJpg = this.renderBy(this.jpgFiles, this.rawFiles)
    this.byRaw = this.renderBy(this.rawFiles, this.jpgFiles)
  }

  /**
   * @param {Array.<string>} files
   * @param {Array.<string>} rawExt
   * @param {Array.<string>} jpgExt
   * @param {string} baseDir
   */
  constructor(files, rawExt, jpgExt, baseDir) {
    this.rawExt  = rawExt
    this.jpgExt  = jpgExt
    this.baseDir = baseDir
    this.parseResult(files)
    this.render()
  }
}

module.exports = SearchResult
