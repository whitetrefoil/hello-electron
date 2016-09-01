// Common configuration for Gulp put here.

// Default Settings
// -----

'use strict';

const meow  = require('meow');
const chalk = require('gulp-util').colors;
const path  = require('path');

const argv = meow(`
    Usage:
      $ npm run gulp ${chalk.yellow('<task>')} -- ${chalk.yellow('<options>')}
    or:
      $ ./node_modules/.bin/gulp ${chalk.yellow('<task>')} ${chalk.yellow('<options>')}
    or (if have gulp installed globally):
      $ gulp ${chalk.yellow('<task>')} ${chalk.yellow('<options>')}

    Options:                                                [${chalk.gray('default value')}]
      -d, --development    Set NODE_ENV to "development"    [${chalk.yellow('false')}]
      -h, --help           Show this message

    For more detail of tasks / options, see code in "dev/gulp" directory.
  `,
  {
    boolean: ['development', 'help'],
    alias  : {
      d: 'development',
      h: 'help',
    },
    default: {
      development: false,
    },
  }
);

/**
 * @param {string} appRoot - root directory of the application.
 * @returns {object} the same object of what to be exported.
 */
module.exports.initialize = (appRoot) => {

  process.env.NODE_ENV  = argv.flags.development ? 'development' : 'production';
  process.env.BABEL_ENV = process.env.NODE_ENV;

  module.exports.appRoot = appRoot;
  module.exports.rootAnd = pathInRoot => {
    return path.join(module.exports.appRoot, pathInRoot);
  };

  module.exports.sourceDir = 'src';
  module.exports.sourceAnd = pathInSource => {
    return path.join(module.exports.sourceDir, pathInSource);
  };

  module.exports.outputDir = 'lib';
  module.exports.outputAnd = pathInOutput => {
    return path.join(module.exports.outputDir, pathInOutput);
  };

  return module.exports;
};
