// @flow
const prettierEslint = require('prettier-eslint');
const prettier = require('prettier');
const { allowUnsafeNewFunction } = require('loophole');

const {
  getPrettierOptions,
  getPrettierEslintOptions,
  getCurrentFilePath,
  shouldDisplayErrors,
  shouldUseEslint,
  runLinter,
} = require('./helpers');

const EMBEDDED_JS_REGEX = /<script\b[^>]*>([\s\S]*?)(?=<\/script>)/gi;

const displayError = (error) => {
  const message = `prettier-atom: ${error.toString()}`;
  const detail = error.stack.toString();

  atom.notifications.addError(message, { detail, dismissable: true });
};

const handleError = (error) => {
  if (shouldDisplayErrors()) displayError(error);
  return false;
};

const executePrettier = (editor, text) => {
  try {
    if (shouldUseEslint()) {
      return allowUnsafeNewFunction(() =>
        prettierEslint({
          ...getPrettierEslintOptions(),
          text,
          filePath: getCurrentFilePath(editor),
        }));
    }
    return prettier.format(text, getPrettierOptions(editor));
  } catch (error) {
    return handleError(error);
  }
};

const executePrettierOnBufferRange = (editor: TextEditor, bufferRange: Range) => {
  const cursorPositionPriorToFormat = editor.getCursorScreenPosition();
  const textToTransform = editor.getTextInBufferRange(bufferRange);
  const transformed = executePrettier(editor, textToTransform);

  if (!transformed) return;

  editor.setTextInBufferRange(bufferRange, transformed);
  editor.setCursorScreenPosition(cursorPositionPriorToFormat);
  runLinter(editor);
};

const executePrettierOnEmbeddedScripts = (editor: TextEditor) =>
  editor.backwardsScanInBufferRange(EMBEDDED_JS_REGEX, editor.getBuffer().getRange(), (iter) => {
    // Create new range with start row advanced by 1,
    // since we cannot use look-behind on variable-length starting
    // <script ...> tag
    const { start, end } = iter.range;
    const startModified = [start.row + 1, start.column];
    const bufferRange = new iter.range.constructor(startModified, end);

    executePrettierOnBufferRange(editor, bufferRange);
  });

module.exports = {
  executePrettierOnBufferRange,
  executePrettierOnEmbeddedScripts,
};
