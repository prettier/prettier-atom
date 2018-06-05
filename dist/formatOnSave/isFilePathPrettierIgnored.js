'use strict';

const _ = require('lodash/fp');
const path = require('path');
const fs = require('fs');
const { findCachedFromFilePath, getDirFromFilePath, someGlobsMatchFilePath } = require('../helpers');

const LINE_SEPERATOR_REGEX = /(\r|\n|\r\n)/;

const getNearestPrettierIgnorePath = filePath => findCachedFromFilePath(filePath, '.prettierignore');

const safeRelativePath = _.curry(
// $FlowFixMe
(from, to) => !!from && !!to ? path.relative(from, to) : undefined);

const getFilePathRelativeToPrettierIgnore = (filePath
// $FlowIssue: lodashfp placeholders not supported yet
) => _.flow(getNearestPrettierIgnorePath, getDirFromFilePath,
// $FlowFixMe
safeRelativePath(_, filePath))(filePath);

const getLinesFromFilePath = filePath => !!filePath && filePath.length > 0 ? fs.readFileSync(filePath, 'utf8').split(LINE_SEPERATOR_REGEX) : [];

const getIgnoredGlobsFromNearestPrettierIgnore = _.flow(getNearestPrettierIgnorePath, getLinesFromFilePath);

const isFilePathPrettierIgnored = _.flow(_.over([getIgnoredGlobsFromNearestPrettierIgnore, getFilePathRelativeToPrettierIgnore]), _.spread(someGlobsMatchFilePath));

module.exports = isFilePathPrettierIgnored;