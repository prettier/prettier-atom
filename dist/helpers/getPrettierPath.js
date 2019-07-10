"use strict";

const path = require('path');

const {
  findCached
} = require('atom-linter');

const globalModules = require('global-modules');

const yarnGlobalModules = require('yarn-global-modules')();

const {
  findCachedFromFilePath
} = require('./general');

const PRETTIER_INDEX_PATH = path.join('node_modules', 'prettier', 'index.js');

const getGlobalPrettierPath = () => findCached(globalModules, PRETTIER_INDEX_PATH) || findCached(yarnGlobalModules, PRETTIER_INDEX_PATH);

const getLocalPrettierPath = filePath => findCachedFromFilePath(filePath, PRETTIER_INDEX_PATH);

const getLocalOrGlobalPrettierPath = filePath => getLocalPrettierPath(filePath) || getGlobalPrettierPath();

module.exports = {
  getGlobalPrettierPath,
  getLocalPrettierPath,
  getLocalOrGlobalPrettierPath
};