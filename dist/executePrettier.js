'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var prettierEslint = require('prettier-eslint');

var _require = require('loophole'),
    allowUnsafeNewFunction = _require.allowUnsafeNewFunction;

var _require2 = require('./helpers'),
    getPrettierOptions = _require2.getPrettierOptions,
    getPrettierEslintOptions = _require2.getPrettierEslintOptions,
    getCurrentFilePath = _require2.getCurrentFilePath,
    getPrettier = _require2.getPrettier,
    shouldDisplayErrors = _require2.shouldDisplayErrors,
    shouldUseEslint = _require2.shouldUseEslint,
    runLinter = _require2.runLinter;

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
    var prettierOptions = getPrettierOptions(editor);

    if (shouldUseEslint()) {
      return allowUnsafeNewFunction(function () {
        return prettierEslint(_extends({}, getPrettierEslintOptions(), {
          text: text,
          filePath: getCurrentFilePath(editor),
          fallbackPrettierOptions: prettierOptions
        }));
      });
    }

    var prettier = getPrettier(getCurrentFilePath(editor));

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