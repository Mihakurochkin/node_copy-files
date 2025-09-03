'use strict';
/* eslint-disable no-console */

const fs = require('fs');
const [sourcePath, destinationPath] = process.argv.slice(2);

function copyFile(source, destination) {
  if (arguments.length === 1 || !source || !destination) {
    console.error('Invalid number of arguments');

    return;
  }

  if (!fs.existsSync(source)) {
    console.error('Source file does not exist');

    return;
  }

  if (source === destination) {
    return;
  }

  if (
    fs.statSync(source).isDirectory() ||
    (fs.existsSync(destination) && fs.statSync(destination).isDirectory())
  ) {
    console.error('Source or destination cannot be a directory');

    return;
  }

  const sourceContent = fs.readFileSync(source, 'utf-8');

  fs.writeFileSync(destination, sourceContent);
}

copyFile(sourcePath, destinationPath);

module.exports = { copyFile };
