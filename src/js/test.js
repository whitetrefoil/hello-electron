const fs = require('fs');

fs.readdir('.', (err, files) => {
  if (err != null) {
    console.error(err);
    return;
  }
  console.log(files);
});
