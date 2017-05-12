// @flow
const _ = require('lodash/fp');
const path = require('path');
const fs = require('fs');
const { findCachedFromFilePath, getDirFromFilePath, someGlobsMatchFilePath } = require('../helpers');

const LINE_SEPERATOR_REGEX = /(\r|\n|\r\n)/;

const getNearestEslintignorePath = (filePath: FilePath): ?FilePath =>
  findCachedFromFilePath(filePath, '.eslintignore');

const safeRelativePath = _.curry(
  (from: ?FilePath, to: ?FilePath): ?FilePath => (!!from && !!to ? path.relative(from, to) : undefined),
);

const getFilePathRelativeToEslintignore = (filePath: FilePath): ?FilePath =>
  _.flow(getNearestEslintignorePath, getDirFromFilePath, safeRelativePath(_, filePath))(filePath);

const getLinesFromFilePath = (filePath: ?FilePath) =>
  !!filePath && filePath.length > 0 ? fs.readFileSync(filePath, 'utf8').split(LINE_SEPERATOR_REGEX) : [];

const getIgnoredGlobsFromNearestEslintIgnore: (filePath: FilePath) => Globs = _.flow(
  getNearestEslintignorePath,
  getLinesFromFilePath,
);

const isFilePathEslintignored: (filePath: FilePath) => boolean = _.flow(
  _.over([getIgnoredGlobsFromNearestEslintIgnore, getFilePathRelativeToEslintignore]),
  _.spread(someGlobsMatchFilePath),
);

module.exports = isFilePathEslintignored;
