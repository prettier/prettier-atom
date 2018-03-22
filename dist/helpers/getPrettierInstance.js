'use strict';

var _ = require('lodash/fp');
var bundledPrettier = require('prettier');

var _require = require('../editorInterface'),
    getCurrentFilePath = _require.getCurrentFilePath;

var _require2 = require('./getPrettierPath'),
    getLocalOrGlobalPrettierPath = _require2.getLocalOrGlobalPrettierPath;

// charypar: This is currently the best way to use local prettier instance.
// Using the CLI introduces a noticeable delay and there is currently no
// way to use prettier as a long-running process for formatting files as needed
//
// See https://github.com/prettier/prettier/issues/918


var requireWithFallbackToBundledPrettier = function requireWithFallbackToBundledPrettier(prettierPackagePath
// $$FlowFixMe
) {
  return prettierPackagePath ? require(prettierPackagePath) : bundledPrettier;
}; // eslint-disable-line

var getPrettierInstance = _.flow(getCurrentFilePath, getLocalOrGlobalPrettierPath, requireWithFallbackToBundledPrettier);

module.exports = getPrettierInstance;