// @flow
const { executePrettierOnBufferRange, executePrettierOnEmbeddedScripts } = require('./executePrettier');
const {
  getCurrentFilePath,
  isCurrentScopeEmbeddedScope,
  isFilePathEslintignored,
  isFilePathExcluded,
  isInScope,
  isFilePathWhitelisted,
} = require('./helpers');

const { shouldRespectEslintignore } = require('./options');

const { isFormatOnSaveEnabled, isWhitelistProvided } = require('./options');

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
