'use strict';

var _require = require('./executePrettier'),
    executePrettierOnBufferRange = _require.executePrettierOnBufferRange,
    executePrettierOnEmbeddedScripts = _require.executePrettierOnEmbeddedScripts;

var _require2 = require('./helpers'),
    getCurrentFilePath = _require2.getCurrentFilePath,
    isCurrentScopeEmbeddedScope = _require2.isCurrentScopeEmbeddedScope,
    isFilePathEslintignored = _require2.isFilePathEslintignored,
    isFilePathExcluded = _require2.isFilePathExcluded,
    isInScope = _require2.isInScope,
    isFilePathWhitelisted = _require2.isFilePathWhitelisted;

var _require3 = require('./options'),
    shouldRespectEslintignore = _require3.shouldRespectEslintignore;

var _require4 = require('./options'),
    isFormatOnSaveEnabled = _require4.isFormatOnSaveEnabled,
    isWhitelistProvided = _require4.isWhitelistProvided;

var formatOnSaveIfAppropriate = function formatOnSaveIfAppropriate(editor) {
  if (!isFormatOnSaveEnabled()) return;

  var filePath = getCurrentFilePath(editor);

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