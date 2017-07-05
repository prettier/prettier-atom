'use strict';

var _ = require('lodash/fp');

var _require = require('../linterInterface'),
    clearLinterErrors = _require.clearLinterErrors;

var _require2 = require('../editorInterface'),
    isCurrentScopeEmbeddedScope = _require2.isCurrentScopeEmbeddedScope,
    getBufferRange = _require2.getBufferRange;

var _require3 = require('../executePrettier'),
    executePrettierOnBufferRange = _require3.executePrettierOnBufferRange,
    executePrettierOnEmbeddedScripts = _require3.executePrettierOnEmbeddedScripts;

var _require4 = require('../atomInterface'),
    attemptWithErrorNotification = _require4.attemptWithErrorNotification;

var shouldFormatOnSave = require('./shouldFormatOnSave');

var callAppropriatePrettierExecutor = function callAppropriatePrettierExecutor(editor) {
  return isCurrentScopeEmbeddedScope(editor) ? executePrettierOnEmbeddedScripts(editor) : executePrettierOnBufferRange(editor, getBufferRange(editor));
};

var formatOnSaveIfAppropriate = _.flow(_.tap(clearLinterErrors), _.cond([[shouldFormatOnSave, callAppropriatePrettierExecutor]]));

var safeFormatOnSaveIfAppropriate = function safeFormatOnSaveIfAppropriate(editor) {
  return attemptWithErrorNotification(function () {
    return formatOnSaveIfAppropriate(editor);
  });
};

module.exports = safeFormatOnSaveIfAppropriate;