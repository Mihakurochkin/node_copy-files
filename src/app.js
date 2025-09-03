'use strict';
/* eslint-disable no-console */

const fs = require('fs');
const path = require('path');
const [sourcePath, destinationPath] = process.argv.slice(2);

function copyFile(source, destination) {
  if (arguments.length !== 2 || !source || !destination) {
    console.error('Invalid number of arguments');

    return;
  }

  try {
    if (!fs.existsSync(source)) {
      console.error('Source file does not exist');

      return;
    }
  } catch (err) {
    console.error('Error checking if source file exists:', err.message);

    return;
  }

  if (path.resolve(source) === path.resolve(destination)) {
    return;
  }

  try {
    if (
      fs.statSync(source).isDirectory() ||
      (fs.existsSync(destination) && fs.statSync(destination).isDirectory())
    ) {
      console.error('Source or destination cannot be a directory');

      return;
    }
  } catch (err) {
    console.error(err.message);

    return;
  }

  try {
    fs.copyFileSync(source, destination);
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
}

copyFile(sourcePath, destinationPath);

module.exports = { copyFile };
