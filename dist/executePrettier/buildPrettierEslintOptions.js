'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var buildPrettierOptions = require('./buildPrettierOptions');

var _require = require('../atomInterface'),
    getPrettierEslintOptions = _require.getPrettierEslintOptions;

var _require2 = require('../editorInterface'),
    getCurrentFilePath = _require2.getCurrentFilePath;

var buildPrettierEslintOptions = function buildPrettierEslintOptions(editor, text) {
  return _extends({
    text: text
  }, getPrettierEslintOptions(), {
    fallbackPrettierOptions: buildPrettierOptions(editor),
    filePath: getCurrentFilePath(editor)
  });
};

module.exports = buildPrettierEslintOptions;