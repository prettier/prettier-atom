'use strict';

var _ = require('lodash/fp');
var path = require('path');
var ignore = require('ignore');

var _require = require('atom-linter'),
    findCached = _require.findCached;

var Point = require('atom-text-buffer-point');
var Range = require('atom-text-buffer-range');

var isPresent = function isPresent(target) {
  return !!target && (typeof target.length === 'undefined' || target.length > 0);
};

var safePathParse = function safePathParse(filePath) {
  return typeof filePath === 'string' && filePath.length > 0 ? path.parse(filePath) : undefined;
};

var getDirFromFilePath = _.flow(safePathParse, _.get('dir'));

var someGlobsMatchFilePath = function someGlobsMatchFilePath(globs, filePath) {
  return isPresent(filePath) && ignore().add(globs).ignores(filePath);
};

var findCachedFromFilePath = function findCachedFromFilePath(filePath, name) {
  return _.flow(getDirFromFilePath, function (dirPath) {
    return isPresent(dirPath) ? findCached(dirPath, name) : undefined;
  })(filePath);
};

var createPoint = function createPoint(row, column) {
  return new Point(row, column);
};

var createRange = function createRange(start, end) {
  return new Range(start, end);
};

module.exports = {
  isPresent: isPresent,
  getDirFromFilePath: getDirFromFilePath,
  someGlobsMatchFilePath: someGlobsMatchFilePath,
  findCachedFromFilePath: findCachedFromFilePath,
  createRange: createRange,
  createPoint: createPoint
};