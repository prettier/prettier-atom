'use strict';

var _ = require('lodash/fp');
var ignore = require('ignore');
var path = require('path');

var _require = require('atom-linter'),
    findCached = _require.findCached;

var isPresent = function isPresent(target) {
  return !!target && (typeof target.length === 'undefined' || target.length > 0);
};

var someGlobsMatchFilePath = function someGlobsMatchFilePath(globs, filePath) {
  return isPresent(filePath) && ignore().add(globs).ignores(filePath);
};

var safePathParse = function safePathParse(filePath) {
  return typeof filePath === 'string' && filePath.length > 0 ? path.parse(filePath) : undefined;
};

var getDirFromFilePath = _.flow(safePathParse, _.get('dir'));

var findCachedFromFilePath = function findCachedFromFilePath(filePath, name) {
  return _.flow(getDirFromFilePath, function (dirPath) {
    return isPresent(dirPath) ? findCached(dirPath, name) : undefined;
  })(filePath);
};

module.exports = {
  isPresent: isPresent,
  someGlobsMatchFilePath: someGlobsMatchFilePath,
  getDirFromFilePath: getDirFromFilePath,
  findCachedFromFilePath: findCachedFromFilePath
};