'use strict';

const _ = require('lodash/fp');
const path = require('path');
const fs = require('fs');
const { findCachedFromFilePath, getDirFromFilePath, someGlobsMatchFilePath } = require('../helpers');

const LINE_SEPERATOR_REGEX = /(\r|\n|\r\n)/;

const getNearestTslintignorePath = filePath => findCachedFromFilePath(filePath, '.tslintignore');

const safeRelativePath = _.curry(
// $FlowFixMe
(from, to) => !!from && !!to ? path.relative(from, to) : undefined);

const getFilePathRelativeToTslintignore = (filePath
// $FlowIssue: lodashfp placeholders not supported yet
) => _.flow(getNearestTslintignorePath, getDirFromFilePath,
// $FlowFixMe
safeRelativePath(_, filePath))(filePath);

const getLinesFromFilePath = filePath => !!filePath && filePath.length > 0 ? fs.readFileSync(filePath, 'utf8').split(LINE_SEPERATOR_REGEX) : [];

const getIgnoredGlobsFromNearestTslintIgnore = _.flow(getNearestTslintignorePath, getLinesFromFilePath);

const isFilePathTslintignored = _.flow(_.over([getIgnoredGlobsFromNearestTslintIgnore, getFilePathRelativeToTslintignore]), _.spread(someGlobsMatchFilePath));

module.exports = isFilePathTslintignored;