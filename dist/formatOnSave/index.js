'use strict';

var _ = require('lodash/fp');

var _require = require('../editorInterface'),
    isCurrentScopeEmbeddedScope = _require.isCurrentScopeEmbeddedScope,
    getBufferRange = _require.getBufferRange;

var _require2 = require('../executePrettier'),
    executePrettierOnBufferRange = _require2.executePrettierOnBufferRange,
    executePrettierOnEmbeddedScripts = _require2.executePrettierOnEmbeddedScripts;

var _require3 = require('../atomInterface'),
    attemptWithErrorNotification = _require3.attemptWithErrorNotification;

var shouldFormatOnSave = require('./shouldFormatOnSave');

var callAppropriatePrettierExecutor = function callAppropriatePrettierExecutor(editor) {
  return isCurrentScopeEmbeddedScope(editor) ? executePrettierOnEmbeddedScripts(editor) : executePrettierOnBufferRange(editor, getBufferRange(editor));
};

var formatOnSaveIfAppropriate = _.cond([[shouldFormatOnSave, callAppropriatePrettierExecutor]]);

var safeFormatOnSaveIfAppropriate = function safeFormatOnSaveIfAppropriate(editor) {
  return attemptWithErrorNotification(function () {
    return formatOnSaveIfAppropriate(editor);
  });
};

module.exports = safeFormatOnSaveIfAppropriate;