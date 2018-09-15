// @flow
const _ = require('lodash/fp');
const path = require('path');
const fs = require('fs');
const { findCachedFromFilePath, getDirFromFilePath, someGlobsMatchFilePath } = require('../helpers');

const LINE_SEPERATOR_REGEX = /(\r|\n|\r\n)/;

const getNearestTslintignorePath = (filePath: FilePath): ?FilePath =>
  findCachedFromFilePath(filePath, '.tslintignore');

const safeRelativePath = _.curry(
  // $FlowFixMe
  (from: ?FilePath, to: ?FilePath): ?FilePath => (!!from && !!to ? path.relative(from, to) : undefined),
);

const getFilePathRelativeToTslintignore = (filePath: FilePath): ?FilePath =>
  // $FlowIssue: lodashfp placeholders not supported yet
  _.flow(
    getNearestTslintignorePath,
    getDirFromFilePath,
    // $FlowFixMe
    safeRelativePath(_, filePath),
  )(filePath);

const getLinesFromFilePath = (filePath: ?FilePath) =>
  !!filePath && filePath.length > 0 ? fs.readFileSync(filePath, 'utf8').split(LINE_SEPERATOR_REGEX) : [];

const getIgnoredGlobsFromNearestTslintIgnore: (filePath: FilePath) => Globs = _.flow(
  getNearestTslintignorePath,
  getLinesFromFilePath,
);

const isFilePathTslintignored: (filePath: ?FilePath) => boolean = _.flow(
  _.over([getIgnoredGlobsFromNearestTslintIgnore, getFilePathRelativeToTslintignore]),
  _.spread(someGlobsMatchFilePath),
);

module.exports = isFilePathTslintignored;
