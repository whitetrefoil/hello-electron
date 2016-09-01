'use strict';

require('./dev/config').initialize(__dirname);

require('./dev/gulp/build');
require('./dev/gulp/electron');
require('./dev/gulp/eslint');
require('./dev/gulp/watch');
require('./dev/gulp/webpack');
