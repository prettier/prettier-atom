// @flow
const _ = require('lodash/fp');
const path = require('path');
const bundledPrettier = require('prettier');
const { getCurrentFilePath } = require('../editorInterface');
const { findCachedFromFilePath } = require('../helpers');

const PRETTIER_INDEX_PATH = path.join('node_modules', 'prettier', 'index.js');

const getLocalPrettierPath = (filePath: ?FilePath): ?FilePath =>
  findCachedFromFilePath(filePath, PRETTIER_INDEX_PATH);

// const getLocalPrettierPath = (filePath: ?FilePath): ?FilePath => {
//   if (!filePath) return null;
//
//   const dirPath = getDirFromFilePath(filePath);
//
//   return dirPath ? findCached(dirPath, PRETTIER_INDEX_PATH) : null;
// };

// charypar: This is currently the best way to use local prettier instance.
// Using the CLI introduces a noticeable delay and there is currently no
// way to use prettier as a long-running process for formatting files as needed
//
// See https://github.com/prettier/prettier/issues/918
const requireWithFallbackToBundledPrettier = (prettierPackagePath: ?string): typeof bundledPrettier =>
  // $$FlowFixMe
  prettierPackagePath ? require(prettierPackagePath) : bundledPrettier; // eslint-disable-line

const getPrettierInstance: (editor: TextEditor) => typeof bundledPrettier = _.flow(
  getCurrentFilePath,
  getLocalPrettierPath,
  requireWithFallbackToBundledPrettier,
);

module.exports = getPrettierInstance;
