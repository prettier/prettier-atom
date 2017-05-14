'use strict';

var _require = require('../editorInterface'),
    isCurrentScopeEmbeddedScope = _require.isCurrentScopeEmbeddedScope,
    getBufferRange = _require.getBufferRange;

var _require2 = require('../executePrettier'),
    executePrettierOnBufferRange = _require2.executePrettierOnBufferRange,
    executePrettierOnEmbeddedScripts = _require2.executePrettierOnEmbeddedScripts;

var shouldFormatOnSave = require('./shouldFormatOnSave');

var formatOnSaveIfAppropriate = function formatOnSaveIfAppropriate(editor) {
  return shouldFormatOnSave(editor) && (isCurrentScopeEmbeddedScope(editor) ? executePrettierOnEmbeddedScripts(editor) : executePrettierOnBufferRange(editor, getBufferRange(editor)));
};

module.exports = formatOnSaveIfAppropriate;