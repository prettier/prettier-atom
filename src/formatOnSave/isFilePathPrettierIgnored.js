// @flow
const _ = require('lodash/fp');
const path = require('path');
const fs = require('fs');
const { findCachedFromFilePath, getDirFromFilePath, someGlobsMatchFilePath } = require('../helpers');

const LINE_SEPERATOR_REGEX = /(\r|\n|\r\n)/;

const getNearestPrettierIgnorePath = (filePath: FilePath): ?FilePath =>
  findCachedFromFilePath(filePath, '.prettierignore');

const safeRelativePath = _.curry(
  // $FlowFixMe
  (from: ?FilePath, to: ?FilePath): ?FilePath => (!!from && !!to ? path.relative(from, to) : undefined),
);

const getFilePathRelativeToPrettierIgnore = (filePath: FilePath): ?FilePath =>
  // $FlowIssue: lodashfp placeholders not supported yet
  _.flow(
    getNearestPrettierIgnorePath,
    getDirFromFilePath,
    // $FlowFixMe
    safeRelativePath(_, filePath),
  )(filePath);

const getLinesFromFilePath = (filePath: ?FilePath) =>
  !!filePath && filePath.length > 0 ? fs.readFileSync(filePath, 'utf8').split(LINE_SEPERATOR_REGEX) : [];

const getIgnoredGlobsFromNearestPrettierIgnore: (filePath: FilePath) => Globs = _.flow(
  getNearestPrettierIgnorePath,
  getLinesFromFilePath,
);

const isFilePathPrettierIgnored: (filePath: FilePath) => boolean = _.flow(
  _.over([getIgnoredGlobsFromNearestPrettierIgnore, getFilePathRelativeToPrettierIgnore]),
  _.spread(someGlobsMatchFilePath),
);

module.exports = isFilePathPrettierIgnored;
