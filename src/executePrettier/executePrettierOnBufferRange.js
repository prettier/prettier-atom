// @flow
const _ = require('lodash/fp');
const prettierEslint = require('prettier-eslint');
const { allowUnsafeNewFunction } = require('loophole');

const { shouldUseEslint, runLinter } = require('../atomInterface');
const { getPrettierInstance } = require('../helpers');
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
    return error;
  }
};

const executePrettierOnBufferRange = (editor: TextEditor, bufferRange: Range) => {
  const cursorPositionPriorToFormat = editor.getCursorScreenPosition();
  const textToTransform = editor.getTextInBufferRange(bufferRange);
  const transformed = executePrettierOrPrettierEslint(editor, textToTransform);

  const isTextUnchanged = transformed === textToTransform;
  if (!transformed || isTextUnchanged) return;

  if (_.isError(transformed)) {
    handleError({ bufferRange, editor, error: transformed });
    return;
  }

  const editorBuffer = editor.getBuffer();
  if (editorBuffer.getRange().isEqual(bufferRange)) {
    editorBuffer.setTextViaDiff(transformed);
  } else {
    editor.setTextInBufferRange(bufferRange, transformed);
  }

  editor.setCursorScreenPosition(cursorPositionPriorToFormat);
  runLinter(editor);
};

module.exports = executePrettierOnBufferRange;
