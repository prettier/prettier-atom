const { executePrettierOnBufferRange, executePrettierOnEmbeddedScripts } = require(
  './executePrettier'
);
const { isCurrentScopeEmbeddedScope } = require('./helpers');

const format = (editor) => {
  if (editor.getSelectedText()) {
    editor
      .getSelectedBufferRanges()
      .forEach(bufferRange => executePrettierOnBufferRange(editor, bufferRange));
    return;
  }

  if (isCurrentScopeEmbeddedScope(editor)) {
    executePrettierOnEmbeddedScripts(editor);
    return;
  }

  executePrettierOnBufferRange(editor, editor.getBuffer().getRange());
};

module.exports = format;
