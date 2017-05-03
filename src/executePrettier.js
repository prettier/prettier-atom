// @flow
const prettierEslint = require('prettier-eslint');
const { allowUnsafeNewFunction } = require('loophole');

const {
  getPrettierOptions,
  getPrettierEslintOptions,
  getCurrentFilePath,
  getPrettier,
  shouldDisplayErrors,
  shouldUseEslint,
  runLinter,
} = require('./helpers');

const EMBEDDED_JS_REGEX = /<script\b[^>]*>([\s\S]*?)(?=<\/script>)/gi;

const displayError = (error) => {
  atom.notifications.addError('prettier-atom failed!', {
    detail: error,
    stack: error.stack,
    dismissable: true,
  });
};

const handleError = (error) => {
  if (shouldDisplayErrors()) displayError(error);
  return false;
};

const executePrettier = (editor, text) => {
  try {
    const prettierOptions = getPrettierOptions(editor);

    if (shouldUseEslint()) {
      return allowUnsafeNewFunction(() =>
        prettierEslint({
          ...getPrettierEslintOptions(),
          text,
          filePath: getCurrentFilePath(editor),
          fallbackPrettierOptions: prettierOptions,
        }),
      );
    }

    const prettier = getPrettier(getCurrentFilePath(editor));

    return prettier.format(text, prettierOptions);
  } catch (error) {
    return handleError(error);
  }
};

const executePrettierOnBufferRange = (editor: TextEditor, bufferRange: Range) => {
  const cursorPositionPriorToFormat = editor.getCursorScreenPosition();
  const textToTransform = editor.getTextInBufferRange(bufferRange);
  const transformed = executePrettier(editor, textToTransform);

  const isTextUnchanged = transformed === textToTransform;
  if (!transformed || isTextUnchanged) return;

  editor.setTextInBufferRange(bufferRange, transformed);
  editor.setCursorScreenPosition(cursorPositionPriorToFormat);
  runLinter(editor);
};

const executePrettierOnEmbeddedScripts = (editor: TextEditor) =>
  editor.backwardsScanInBufferRange(EMBEDDED_JS_REGEX, editor.getBuffer().getRange(), (iter) => {
    const { start, end } = iter.range;

    // Skip formatting when <script> and </script> on the same line
    if (start.row === end.row) return;

    // Create new range with start row advanced by 1,
    // since we cannot use look-behind on variable-length starting
    // <script ...> tag
    const startModified = [start.row + 1, start.column];
    const bufferRange = new iter.range.constructor(startModified, end);

    executePrettierOnBufferRange(editor, bufferRange);
  });

module.exports = {
  executePrettierOnBufferRange,
  executePrettierOnEmbeddedScripts,
};
