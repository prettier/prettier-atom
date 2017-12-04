'use strict';

var buildPrettierOptions = require('./buildPrettierOptions');

var _require = require('../editorInterface'),
    getCurrentFilePath = _require.getCurrentFilePath;

var buildPrettierStylelintOptions = function buildPrettierStylelintOptions(editor, text) {
  return {
    text: text,
    prettierOptions: buildPrettierOptions(editor),
    filePath: getCurrentFilePath(editor)
  };
};

module.exports = buildPrettierStylelintOptions;