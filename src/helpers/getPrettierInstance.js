// @flow
const _ = require('lodash/fp');
const bundledPrettier = require('prettier');
const { getCurrentFilePath } = require('../editorInterface');
const { getLocalOrGlobalPrettierPath } = require('./getPrettierPath');

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
  getLocalOrGlobalPrettierPath,
  requireWithFallbackToBundledPrettier,
);

module.exports = getPrettierInstance;
