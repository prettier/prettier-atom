'use strict';

const _ = require('lodash/fp');
const ignore = require('ignore');
const path = require('path');
const { findCached } = require('atom-linter');

const isPresent = target => !!target && (typeof target.length === 'undefined' || target.length > 0);

const someGlobsMatchFilePath = (globs, filePath) => isPresent(filePath) && ignore().add(globs).ignores(filePath);

const safePathParse = filePath => typeof filePath === 'string' && filePath.length > 0 ? path.parse(filePath) : undefined;

// $FlowFixMe: calling `_.get` on possibly undefined value
const getDirFromFilePath = _.flow(safePathParse, _.get('dir'));

const findCachedFromFilePath = (filePath, name) => _.flow(getDirFromFilePath, dirPath => isPresent(dirPath) ? findCached(dirPath, name) : undefined)(filePath);

module.exports = {
  isPresent,
  someGlobsMatchFilePath,
  getDirFromFilePath,
  findCachedFromFilePath
};