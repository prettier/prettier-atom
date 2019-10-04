// @flow
const path = require('path');
const { sync: execaSync } = require('execa');
const { findCached } = require('atom-linter');
const { memoize } = require('lodash');
const globalModules = require('global-modules');
const yarnGlobalModules = require('yarn-global-modules')();
const { findCachedFromFilePath } = require('./general');

const PRETTIER_INDEX_PATH = path.join('node_modules', 'prettier', 'index.js');

// global-prefix package (which is used by global-modules) fails
// to locate the directory if Node and NPM are installed via NVM
// https://github.com/jonschlinkert/global-prefix/issues/19
// The function below applies a fallback search mechanism,
// which relies on calling 'npm get prefix'
const getFallbackGlobalModulesPath = memoize(() => {
  try {
    const prefix = execaSync('npm', ['get', 'prefix']).stdout;

    // Inspired by global-modules
    // https://github.com/jonschlinkert/global-modules/blob/7455e827f0ce0366d224aea035a8fecd233aa24a/index.js
    if (process.platform === 'win32' || process.env.OSTYPE === 'msys' || process.env.OSTYPE === 'cygwin') {
      return path.resolve(prefix, 'node_modules');
    }
    return path.resolve(prefix, 'lib/node_modules');
  } catch (e) {
    return '';
  }
});

const getGlobalPrettierPath = (): ?FilePath =>
  findCached(globalModules, PRETTIER_INDEX_PATH) ||
  findCached(yarnGlobalModules, PRETTIER_INDEX_PATH) ||
  findCached(getFallbackGlobalModulesPath(), PRETTIER_INDEX_PATH);

const getLocalPrettierPath = (filePath: ?FilePath): ?FilePath =>
  findCachedFromFilePath(filePath, PRETTIER_INDEX_PATH);

const getLocalOrGlobalPrettierPath = (filePath: ?FilePath): ?FilePath =>
  getLocalPrettierPath(filePath) || getGlobalPrettierPath();

module.exports = {
  getGlobalPrettierPath,
  getLocalPrettierPath,
  getLocalOrGlobalPrettierPath,
};
