'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var buildPrettierOptions = require('./buildPrettierOptions');

var _require = require('../atomInterface'),
    getPrettierEslintOptions = _require.getPrettierEslintOptions;

var _require2 = require('../editorInterface'),
    getCurrentFilePath = _require2.getCurrentFilePath;

var buildPrettierEslintOptions = function buildPrettierEslintOptions(editor, text) {
  return (0, _extends3.default)({
    text: text
  }, getPrettierEslintOptions(), {
    fallbackPrettierOptions: buildPrettierOptions(editor),
    filePath: getCurrentFilePath(editor)
  });
};

module.exports = buildPrettierEslintOptions;