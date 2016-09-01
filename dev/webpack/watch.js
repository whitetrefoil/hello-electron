'use strict';

const merge       = require('webpack-merge');
const development = require('./development');

module.exports = merge.smart(development, {
  watch: true,
});
