'use strict';

var prettierEslint = require('prettier-eslint');

var _require = require('loophole'),
    allowUnsafeNewFunction = _require.allowUnsafeNewFunction;

var _require2 = require('../atomInterface'),
    shouldUseEslint = _require2.shouldUseEslint,
    runLinter = _require2.runLinter;

var getPrettierInstance = require('./getPrettierInstance');
var buildPrettierEslintOptions = require('./buildPrettierEslintOptions');
var buildPrettierOptions = require('./buildPrettierOptions');
var handleError = require('./handleError');

var executePrettier = function executePrettier(editor, text) {
  return getPrettierInstance(editor).format(text, buildPrettierOptions(editor));
};

var executePrettierEslint = function executePrettierEslint(editor, text) {
  return allowUnsafeNewFunction(function () {
    return prettierEslint(buildPrettierEslintOptions(editor, text));
  });
};

var executePrettierOrPrettierEslint = function executePrettierOrPrettierEslint(editor, text) {
  try {
    return shouldUseEslint() ? executePrettierEslint(editor, text) : executePrettier(editor, text);
  } catch (error) {
    return handleError(error);
  }
};

var executePrettierOnBufferRange = function executePrettierOnBufferRange(editor, bufferRange) {
  var cursorPositionPriorToFormat = editor.getCursorScreenPosition();
  var textToTransform = editor.getTextInBufferRange(bufferRange);
  var transformed = executePrettierOrPrettierEslint(editor, textToTransform);

  var isTextUnchanged = transformed === textToTransform;
  if (!transformed || isTextUnchanged) return;

  editor.setTextInBufferRange(bufferRange, transformed);
  editor.setCursorScreenPosition(cursorPositionPriorToFormat);
  runLinter(editor);
};

module.exports = executePrettierOnBufferRange;