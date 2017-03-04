'use strict';

var prettierEslint = require('prettier-eslint');
var prettier = require('prettier');

var _require = require('loophole'),
    allowUnsafeNewFunction = _require.allowUnsafeNewFunction;

var _require2 = require('./helpers'),
    getPrettierOptions = _require2.getPrettierOptions,
    getCurrentFilePath = _require2.getCurrentFilePath,
    shouldDisplayErrors = _require2.shouldDisplayErrors,
    shouldUseEslint = _require2.shouldUseEslint;

var EMBEDDED_JS_REGEX = /<script\b[^>]*>([\s\S]*?)(?=<\/script>)/gi;

var displayError = function displayError(error) {
  var message = 'prettier-atom: ' + error.toString();
  var detail = error.stack.toString();

  atom.notifications.addError(message, { detail: detail, dismissable: true });
};

var handleError = function handleError(error) {
  if (shouldDisplayErrors()) displayError(error);
  return false;
};

var executePrettier = function executePrettier(editor, text) {
  try {
    if (shouldUseEslint()) {
      return allowUnsafeNewFunction(function () {
        return prettierEslint({ text: text, filePath: getCurrentFilePath(editor) });
      });
    }
    return prettier.format(text, getPrettierOptions(editor));
  } catch (error) {
    return handleError(error);
  }
};

var executePrettierOnBufferRange = function executePrettierOnBufferRange(editor, bufferRange) {
  var cursorPositionPriorToFormat = editor.getCursorScreenPosition();
  var textToTransform = editor.getTextInBufferRange(bufferRange);
  var transformed = executePrettier(editor, textToTransform);

  if (!transformed) return;

  editor.setTextInBufferRange(bufferRange, transformed);
  editor.setCursorScreenPosition(cursorPositionPriorToFormat);
};

var executePrettierOnEmbeddedScripts = function executePrettierOnEmbeddedScripts(editor) {
  return editor.backwardsScanInBufferRange(EMBEDDED_JS_REGEX, editor.getBuffer().getRange(), function (iter) {
    // Create new range with start row advanced by 1,
    // since we cannot use look-behind on variable-length starting
    // <script ...> tag
    var _iter$range = iter.range,
        start = _iter$range.start,
        end = _iter$range.end;

    var startModified = [start.row + 1, start.column];
    var bufferRange = new iter.range.constructor(startModified, end);

    executePrettierOnBufferRange(editor, bufferRange);
  });
};

module.exports = {
  executePrettierOnBufferRange: executePrettierOnBufferRange,
  executePrettierOnEmbeddedScripts: executePrettierOnEmbeddedScripts
};