require('!!file?name=../package.json!./package.json');
require('!!file?name=../electron.js!./electron.js');


if (process.env.NODE_ENV === 'development') {
  console.log('develoopment');
} else {
  console.log('production');
}
