'use strict';

const _ = require('lodash/fp');
const path = require('path');
const fs = require('fs');
const { findCachedFromFilePath, getDirFromFilePath, someGlobsMatchFilePath } = require('../helpers');

const LINE_SEPERATOR_REGEX = /(\r|\n|\r\n)/;

const getNearestEslintignorePath = filePath => findCachedFromFilePath(filePath, '.eslintignore');

const safeRelativePath = _.curry(
// $FlowFixMe
(from, to) => !!from && !!to ? path.relative(from, to) : undefined);

const getFilePathRelativeToEslintignore = (filePath
// $FlowIssue: lodashfp placeholders not supported yet
) => _.flow(getNearestEslintignorePath, getDirFromFilePath,
// $FlowFixMe
safeRelativePath(_, filePath))(filePath);

const getLinesFromFilePath = filePath => !!filePath && filePath.length > 0 ? fs.readFileSync(filePath, 'utf8').split(LINE_SEPERATOR_REGEX) : [];

const getIgnoredGlobsFromNearestEslintIgnore = _.flow(getNearestEslintignorePath, getLinesFromFilePath);

const isFilePathEslintignored = _.flow(_.over([getIgnoredGlobsFromNearestEslintIgnore, getFilePathRelativeToEslintignore]), _.spread(someGlobsMatchFilePath));

module.exports = isFilePathEslintignored;