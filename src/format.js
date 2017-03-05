// @flow
const { executePrettierOnBufferRange, executePrettierOnEmbeddedScripts } = require('./executePrettier');
const { isCurrentScopeEmbeddedScope } = require('./helpers');

const formatSelectedBufferRanges = (editor: TextEditor) =>
  editor.getSelectedBufferRanges().forEach(bufferRange => executePrettierOnBufferRange(editor, bufferRange));

const format = (editor: TextEditor) => {
  if (editor.getSelectedText()) {
    formatSelectedBufferRanges(editor);
  } else if (isCurrentScopeEmbeddedScope(editor)) {
    executePrettierOnEmbeddedScripts(editor);
  } else {
    executePrettierOnBufferRange(editor, editor.getBuffer().getRange());
  }
};

module.exports = format;
