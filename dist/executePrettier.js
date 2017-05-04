'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var prettierEslint = require('prettier-eslint');

var _require = require('loophole'),
    allowUnsafeNewFunction = _require.allowUnsafeNewFunction;

var _require2 = require('./helpers'),
    getCurrentFilePath = _require2.getCurrentFilePath,
    getPrettier = _require2.getPrettier,
    runLinter = _require2.runLinter;

var _require3 = require('./options'),
    getPrettierOptions = _require3.getPrettierOptions,
    getPrettierEslintOptions = _require3.getPrettierEslintOptions,
    shouldUseEslint = _require3.shouldUseEslint,
    shouldDisplayErrors = _require3.shouldDisplayErrors;

var EMBEDDED_JS_REGEX = /<script\b[^>]*>([\s\S]*?)(?=<\/script>)/gi;

var displayError = function displayError(error) {
  atom.notifications.addError('prettier-atom failed!', {
    detail: error,
    stack: error.stack,
    dismissable: true
  });
};

var handleError = function handleError(error) {
  if (shouldDisplayErrors()) displayError(error);
  return false;
};

var executePrettier = function executePrettier(editor, text) {
  try {
    var filePath = getCurrentFilePath(editor);
    var prettierOptions = getPrettierOptions(editor);
    if (shouldUseEslint()) {
      return allowUnsafeNewFunction(function () {
        return prettierEslint(_extends({}, getPrettierEslintOptions(), {
          text: text,
          filePath: filePath,
          fallbackPrettierOptions: prettierOptions
        }));
      });
    }

    var prettier = getPrettier(filePath);

    return prettier.format(text, prettierOptions);
  } catch (error) {
    return handleError(error);
  }
};

var executePrettierOnBufferRange = function executePrettierOnBufferRange(editor, bufferRange) {
  var cursorPositionPriorToFormat = editor.getCursorScreenPosition();
  var textToTransform = editor.getTextInBufferRange(bufferRange);
  var transformed = executePrettier(editor, textToTransform);

  var isTextUnchanged = transformed === textToTransform;
  if (!transformed || isTextUnchanged) return;

  editor.setTextInBufferRange(bufferRange, transformed);
  editor.setCursorScreenPosition(cursorPositionPriorToFormat);
  runLinter(editor);
};

var executePrettierOnEmbeddedScripts = function executePrettierOnEmbeddedScripts(editor) {
  return editor.backwardsScanInBufferRange(EMBEDDED_JS_REGEX, editor.getBuffer().getRange(), function (iter) {
    var _iter$range = iter.range,
        start = _iter$range.start,
        end = _iter$range.end;

    // Skip formatting when <script> and </script> on the same line

    if (start.row === end.row) return;

    // Create new range with start row advanced by 1,
    // since we cannot use look-behind on variable-length starting
    // <script ...> tag
    var startModified = [start.row + 1, start.column];
    var bufferRange = new iter.range.constructor(startModified, end);

    executePrettierOnBufferRange(editor, bufferRange);
  });
};

module.exports = {
  executePrettierOnBufferRange: executePrettierOnBufferRange,
  executePrettierOnEmbeddedScripts: executePrettierOnEmbeddedScripts
};