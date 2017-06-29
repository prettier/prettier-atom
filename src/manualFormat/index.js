// @flow
const _ = require('lodash/fp');
const { executePrettierOnBufferRange, executePrettierOnEmbeddedScripts } = require('../executePrettier');
const { getBufferRange, isCurrentScopeEmbeddedScope } = require('../editorInterface');
const { clearLinterErrors } = require('../linterInterface');

const hasSelectedText = (editor: TextEditor) => !!editor.getSelectedText();

const formatSelectedBufferRanges = (editor: TextEditor) =>
  editor.getSelectedBufferRanges().forEach(bufferRange => executePrettierOnBufferRange(editor, bufferRange));

const executePrettierOnCurrentBufferRange = (editor: TextEditor) =>
  executePrettierOnBufferRange(editor, getBufferRange(editor));

const format: (editor: TextEditor) => void = _.flow(
  _.tap(clearLinterErrors),
  _.cond([
    [hasSelectedText, formatSelectedBufferRanges],
    [isCurrentScopeEmbeddedScope, executePrettierOnEmbeddedScripts],
    [_.stubTrue, executePrettierOnCurrentBufferRange],
  ]),
);

module.exports = format;
