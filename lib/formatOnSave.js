const { executePrettierOnBufferRange, executePrettierOnEmbeddedScripts } = require(
  './executePrettier'
);
const {
  isCurrentScopeEmbeddedScope,
  isInScope,
  getConfigOption,
} = require('./helpers');

const formatOnSaveIfAppropriate = (editor) => {
  if (!(getConfigOption('formatOnSave') && isInScope(editor))) return;

  if (isCurrentScopeEmbeddedScope(editor)) {
    executePrettierOnEmbeddedScripts(editor);
    return;
  }

  executePrettierOnBufferRange(editor, editor.getBuffer().getRange());
};

module.exports = formatOnSaveIfAppropriate;
