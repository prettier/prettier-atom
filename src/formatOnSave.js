// @flow
const { executePrettierOnBufferRange, executePrettierOnEmbeddedScripts } = require('./executePrettier');
const {
  shouldRespectEslintignore,
  isFormatOnSaveEnabled,
  getCurrentFilePath,
  isCurrentScopeEmbeddedScope,
  isFilePathEslintignored,
  isFilePathExcluded,
  isInScope,
} = require('./helpers');

const formatOnSaveIfAppropriate = (editor: TextEditor) => {
  const filePath = getCurrentFilePath(editor);

  if (!isFormatOnSaveEnabled()) return;
  if (!isInScope(editor)) return;
  if (filePath && isFilePathExcluded(filePath)) return;
  if (filePath && shouldRespectEslintignore() && isFilePathEslintignored(filePath)) return;

  if (isCurrentScopeEmbeddedScope(editor)) {
    executePrettierOnEmbeddedScripts(editor);
  } else {
    executePrettierOnBufferRange(editor, editor.getBuffer().getRange());
  }
};

module.exports = formatOnSaveIfAppropriate;
