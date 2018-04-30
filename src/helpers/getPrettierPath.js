// @flow
const { findCachedFromFilePath } = require('./general');
const path = require('path');
const { findCached } = require('atom-linter');
const globalModules = require('global-modules');
const yarnGlobalModules = require('yarn-global-modules')();

const PRETTIER_INDEX_PATH = path.join('node_modules', 'prettier', 'index.js');

const getGlobalPrettierPath = (): ?FilePath =>
  findCached(globalModules, PRETTIER_INDEX_PATH) || findCached(yarnGlobalModules, PRETTIER_INDEX_PATH);

const getLocalPrettierPath = (filePath: ?FilePath): ?FilePath =>
  findCachedFromFilePath(filePath, PRETTIER_INDEX_PATH);

const getLocalOrGlobalPrettierPath = (filePath: ?FilePath): ?FilePath =>
  getLocalPrettierPath(filePath) || getGlobalPrettierPath();

module.exports = {
  getGlobalPrettierPath,
  getLocalPrettierPath,
  getLocalOrGlobalPrettierPath,
};
