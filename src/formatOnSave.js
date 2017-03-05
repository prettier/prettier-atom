// @flow
const { executePrettierOnBufferRange, executePrettierOnEmbeddedScripts } = require('./executePrettier');
const {
  shouldRespectEslintignore,
  isFormatOnSaveEnabled,
  getCurrentFilePath,
  isCurrentScopeEmbeddedScope,
  isFilePathEslintignored,
  isInScope,
} = require('./helpers');

const formatOnSaveIfAppropriate = (editor: TextEditor, filePath: FilePath = getCurrentFilePath(editor)) => {
  if (!isFormatOnSaveEnabled()) return;
  if (!isInScope(editor)) return;
  if (shouldRespectEslintignore() && isFilePathEslintignored(filePath)) return;

  if (isCurrentScopeEmbeddedScope(editor)) {
    executePrettierOnEmbeddedScripts(editor);
  } else {
    executePrettierOnBufferRange(editor, editor.getBuffer().getRange());
  }
};

module.exports = formatOnSaveIfAppropriate;
