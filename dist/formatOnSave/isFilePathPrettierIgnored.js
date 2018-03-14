'use strict';

var _ = require('lodash/fp');
var path = require('path');
var fs = require('fs');

var _require = require('../helpers'),
    findCachedFromFilePath = _require.findCachedFromFilePath,
    getDirFromFilePath = _require.getDirFromFilePath,
    someGlobsMatchFilePath = _require.someGlobsMatchFilePath;

var LINE_SEPERATOR_REGEX = /(\r|\n|\r\n)/;

var getNearestPrettierIgnorePath = function getNearestPrettierIgnorePath(filePath) {
  return findCachedFromFilePath(filePath, '.prettierignore');
};

var safeRelativePath = _.curry(
// $FlowFixMe
function (from, to) {
  return !!from && !!to ? path.relative(from, to) : undefined;
});

var getFilePathRelativeToPrettierIgnore = function getFilePathRelativeToPrettierIgnore(filePath
// $FlowIssue: lodashfp placeholders not supported yet
) {
  return _.flow(getNearestPrettierIgnorePath, getDirFromFilePath, safeRelativePath(_, filePath))(filePath);
};

var getLinesFromFilePath = function getLinesFromFilePath(filePath) {
  return !!filePath && filePath.length > 0 ? fs.readFileSync(filePath, 'utf8').split(LINE_SEPERATOR_REGEX) : [];
};

var getIgnoredGlobsFromNearestPrettierIgnore = _.flow(getNearestPrettierIgnorePath, getLinesFromFilePath);

var isFilePathPrettierIgnored = _.flow(_.over([getIgnoredGlobsFromNearestPrettierIgnore, getFilePathRelativeToPrettierIgnore]), _.spread(someGlobsMatchFilePath));

module.exports = isFilePathPrettierIgnored;