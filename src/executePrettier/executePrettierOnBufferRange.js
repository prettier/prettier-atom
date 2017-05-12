// @flow
const prettierEslint = require('prettier-eslint');
const { allowUnsafeNewFunction } = require('loophole');

const { shouldUseEslint, runLinter } = require('../atomInterface');
const getPrettierInstance = require('./getPrettierInstance');
const buildPrettierEslintOptions = require('./buildPrettierEslintOptions');
const buildPrettierOptions = require('./buildPrettierOptions');
const handleError = require('./handleError');

const executePrettier = (editor: TextEditor, text: string) =>
  getPrettierInstance(editor).format(text, buildPrettierOptions(editor));

const executePrettierEslint = (editor: TextEditor, text: string) =>
  allowUnsafeNewFunction(() => prettierEslint(buildPrettierEslintOptions(editor, text)));

const executePrettierOrPrettierEslint = (editor: TextEditor, text: string) => {
  try {
    return shouldUseEslint() ? executePrettierEslint(editor, text) : executePrettier(editor, text);
  } catch (error) {
    return handleError(error);
  }
};

const executePrettierOnBufferRange = (editor: TextEditor, bufferRange: Range) => {
  const cursorPositionPriorToFormat = editor.getCursorScreenPosition();
  const textToTransform = editor.getTextInBufferRange(bufferRange);
  const transformed = executePrettierOrPrettierEslint(editor, textToTransform);

  const isTextUnchanged = transformed === textToTransform;
  if (!transformed || isTextUnchanged) return;

  editor.setTextInBufferRange(bufferRange, transformed);
  editor.setCursorScreenPosition(cursorPositionPriorToFormat);
  runLinter(editor);
};

module.exports = executePrettierOnBufferRange;
