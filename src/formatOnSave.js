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
  isFilePathWhitelisted,
  isWhitelistProvided,
} = require('./helpers');

const formatOnSaveIfAppropriate = (editor: TextEditor) => {
  if (!isFormatOnSaveEnabled()) return;

  const filePath = getCurrentFilePath(editor);

  if (!filePath) return;

  if (filePath && isWhitelistProvided() && !isFilePathWhitelisted(filePath)) {
    return;
  }

  if (filePath && !isFilePathWhitelisted(filePath)) {
    if (!isInScope(editor)) return;
    if (filePath && isFilePathExcluded(filePath)) return;
  }
  if (filePath && shouldRespectEslintignore() && isFilePathEslintignored(filePath)) return;

  if (isCurrentScopeEmbeddedScope(editor)) {
    executePrettierOnEmbeddedScripts(editor);
  } else {
    executePrettierOnBufferRange(editor, editor.getBuffer().getRange());
  }
};

module.exports = formatOnSaveIfAppropriate;
