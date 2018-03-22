'use strict';

var _require = require('./general'),
    findCachedFromFilePath = _require.findCachedFromFilePath;

var path = require('path');

var _require2 = require('atom-linter'),
    findCached = _require2.findCached;

var globalModules = require('global-modules');
var yarnGlobalModules = require('yarn-global-modules')();

var PRETTIER_INDEX_PATH = path.join('node_modules', 'prettier', 'index.js');

var getGlobalPrettierPath = function getGlobalPrettierPath() {
  return findCached(globalModules, PRETTIER_INDEX_PATH) || findCached(yarnGlobalModules, PRETTIER_INDEX_PATH);
};

var getLocalPrettierPath = function getLocalPrettierPath(filePath) {
  return findCachedFromFilePath(filePath, PRETTIER_INDEX_PATH);
};

var getLocalOrGlobalPrettierPath = function getLocalOrGlobalPrettierPath(filePath) {
  return getLocalPrettierPath(filePath) || getGlobalPrettierPath();
};

module.exports = {
  getGlobalPrettierPath: getGlobalPrettierPath,
  getLocalPrettierPath: getLocalPrettierPath,
  getLocalOrGlobalPrettierPath: getLocalOrGlobalPrettierPath
};