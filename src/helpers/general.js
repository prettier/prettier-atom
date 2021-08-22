// @flow
const _ = require('lodash/fp');
const ignore = require('ignore');
const path = require('path');
const { findCached } = require('atom-linter');

const isPresent = (target: any): boolean =>
  !!target && (typeof target.length === 'undefined' || target.length > 0);

const someGlobsMatchFilePath = (globs: Globs, filePath: ?FilePath): any | boolean =>
  isPresent(filePath) && ignore().add(globs).ignores(filePath);

const safePathParse = (filePath: FilePath) =>
  typeof filePath === 'string' && filePath.length > 0 ? path.parse(filePath) : undefined;

// $FlowFixMe: calling `_.get` on possibly undefined value
const getDirFromFilePath: (filePath: ?FilePath) => ?FilePath = _.flow(safePathParse, _.get('dir'));

const findCachedFromFilePath = (filePath: ?FilePath, name: string | Array<string>): ?FilePath =>
  _.flow(getDirFromFilePath, (dirPath: ?FilePath): ?FilePath =>
    isPresent(dirPath) ? findCached(dirPath, name) : undefined,
  )(filePath);

module.exports = {
  isPresent,
  someGlobsMatchFilePath,
  getDirFromFilePath,
  findCachedFromFilePath,
};
