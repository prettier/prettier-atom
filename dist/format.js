'use strict';

var _require = require('./executePrettier'),
    executePrettierOnBufferRange = _require.executePrettierOnBufferRange,
    executePrettierOnEmbeddedScripts = _require.executePrettierOnEmbeddedScripts;

var _require2 = require('./helpers'),
    isCurrentScopeEmbeddedScope = _require2.isCurrentScopeEmbeddedScope;

var formatSelectedBufferRanges = function formatSelectedBufferRanges(editor) {
  return editor.getSelectedBufferRanges().forEach(function (bufferRange) {
    return executePrettierOnBufferRange(editor, bufferRange);
  });
};

var format = function format(editor) {
  if (editor.getSelectedText()) {
    formatSelectedBufferRanges(editor);
  } else if (isCurrentScopeEmbeddedScope(editor)) {
    executePrettierOnEmbeddedScripts(editor);
  } else {
    executePrettierOnBufferRange(editor, editor.getBuffer().getRange());
  }
};

module.exports = format;