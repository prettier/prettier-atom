'use strict';

var _ = require('lodash/fp');
var path = require('path');
var fs = require('fs');

var _require = require('../helpers'),
    findCachedFromFilePath = _require.findCachedFromFilePath,
    getDirFromFilePath = _require.getDirFromFilePath,
    someGlobsMatchFilePath = _require.someGlobsMatchFilePath;

var LINE_SEPERATOR_REGEX = /(\r|\n|\r\n)/;

var getNearestEslintignorePath = function getNearestEslintignorePath(filePath) {
  return findCachedFromFilePath(filePath, '.eslintignore');
};

var safeRelativePath = _.curry(function (from, to) {
  return !!from && !!to ? path.relative(from, to) : undefined;
});

var getFilePathRelativeToEslintignore = function getFilePathRelativeToEslintignore(filePath) {
  return _.flow(getNearestEslintignorePath, getDirFromFilePath, safeRelativePath(_, filePath))(filePath);
};

var getLinesFromFilePath = function getLinesFromFilePath(filePath) {
  return !!filePath && filePath.length > 0 ? fs.readFileSync(filePath, 'utf8').split(LINE_SEPERATOR_REGEX) : [];
};

var getIgnoredGlobsFromNearestEslintIgnore = _.flow(getNearestEslintignorePath, getLinesFromFilePath);

var isFilePathEslintignored = _.flow(_.over([getIgnoredGlobsFromNearestEslintIgnore, getFilePathRelativeToEslintignore]), _.spread(someGlobsMatchFilePath));

module.exports = isFilePathEslintignored;