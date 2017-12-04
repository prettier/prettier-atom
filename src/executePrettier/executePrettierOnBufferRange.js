// @flow
require('babel-polyfill');
const _ = require('lodash/fp');
const prettierEslint = require('prettier-eslint');
const prettierStylelint = require('prettier-stylelint');
const { allowUnsafeNewFunction } = require('loophole');

const { shouldUseEslint, shouldUseStylelint, runLinter } = require('../atomInterface');
const { isCurrentScopeCssScope } = require('../editorInterface');
const { getPrettierInstance } = require('../helpers');
const buildPrettierEslintOptions = require('./buildPrettierEslintOptions');
const buildPrettierStylelintOptions = require('./buildPrettierStylelintOptions');
const buildPrettierOptions = require('./buildPrettierOptions');
const handleError = require('./handleError');

const executePrettier = (editor: TextEditor, text: string) =>
  getPrettierInstance(editor).format(text, buildPrettierOptions(editor));

const executePrettierEslint = (editor: TextEditor, text: string) =>
  allowUnsafeNewFunction(() => prettierEslint(buildPrettierEslintOptions(editor, text)));

const executePrettierStylelint = (editor: TextEditor, text: string) =>
  prettierStylelint.format(buildPrettierStylelintOptions(editor, text));

const executePrettierOrIntegration = async (editor: TextEditor, text: string) => {
  try {
    let formatted;
    if (shouldUseStylelint() && isCurrentScopeCssScope(editor)) {
      formatted = await executePrettierStylelint(editor, text);
    } else if (shouldUseEslint()) {
      formatted = executePrettierEslint(editor, text);
    } else {
      formatted = executePrettier(editor, text);
    }

    return formatted;
  } catch (error) {
    return error;
  }
};

const executePrettierOnBufferRange = async (editor: TextEditor, bufferRange: Range) => {
  const cursorPositionPriorToFormat = editor.getCursorScreenPosition();
  const textToTransform = editor.getTextInBufferRange(bufferRange);
  const transformed = await executePrettierOrIntegration(editor, textToTransform);

  const isTextUnchanged = transformed === textToTransform;
  if (!transformed || isTextUnchanged) return;

  if (_.isError(transformed)) {
    handleError({ bufferRange, editor, error: transformed });
    return;
  }

  // we use setTextViaDiff when formatting the entire buffer to improve performance,
  // maintain metadata (bookmarks, folds, etc) and eliminate syntax highlight flickering
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
