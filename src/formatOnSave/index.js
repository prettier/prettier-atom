// @flow
const { isCurrentScopeEmbeddedScope, getBufferRange } = require('../editorInterface');
const { executePrettierOnBufferRange, executePrettierOnEmbeddedScripts } = require('../executePrettier');
const shouldFormatOnSave = require('./shouldFormatOnSave');

const formatOnSaveIfAppropriate = (editor: TextEditor) =>
  shouldFormatOnSave(editor) &&
  (isCurrentScopeEmbeddedScope(editor)
    ? executePrettierOnEmbeddedScripts(editor)
    : executePrettierOnBufferRange(editor, getBufferRange(editor)));

module.exports = formatOnSaveIfAppropriate;
