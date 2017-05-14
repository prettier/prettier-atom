'use strict';

var _ = require('lodash/fp');

var _require = require('../executePrettier'),
    executePrettierOnBufferRange = _require.executePrettierOnBufferRange,
    executePrettierOnEmbeddedScripts = _require.executePrettierOnEmbeddedScripts;

var _require2 = require('../editorInterface'),
    getBufferRange = _require2.getBufferRange,
    isCurrentScopeEmbeddedScope = _require2.isCurrentScopeEmbeddedScope;

var hasSelectedText = function hasSelectedText(editor) {
  return !!editor.getSelectedText();
};

var formatSelectedBufferRanges = function formatSelectedBufferRanges(editor) {
  return editor.getSelectedBufferRanges().forEach(function (bufferRange) {
    return executePrettierOnBufferRange(editor, bufferRange);
  });
};

var executePrettierOnCurrentBufferRange = function executePrettierOnCurrentBufferRange(editor) {
  return executePrettierOnBufferRange(editor, getBufferRange(editor));
};

var format = _.cond([[hasSelectedText, formatSelectedBufferRanges], [isCurrentScopeEmbeddedScope, executePrettierOnEmbeddedScripts], [_.stubTrue, executePrettierOnCurrentBufferRange]]);

module.exports = format;