'use strict';

var EMBEDDED_SCOPES = ['text.html.vue', 'text.html.basic'];

var getBufferRange = function getBufferRange(editor) {
  return editor.getBuffer().getRange();
};

var getCurrentScope = function getCurrentScope(editor) {
  return editor.getGrammar().scopeName;
};

var isCurrentScopeEmbeddedScope = function isCurrentScopeEmbeddedScope(editor) {
  return EMBEDDED_SCOPES.includes(getCurrentScope(editor));
};

var getCurrentFilePath = function getCurrentFilePath(editor) {
  return editor.buffer.file ? editor.buffer.file.path : undefined;
};

module.exports = {
  getBufferRange: getBufferRange,
  isCurrentScopeEmbeddedScope: isCurrentScopeEmbeddedScope,
  getCurrentScope: getCurrentScope,
  getCurrentFilePath: getCurrentFilePath
};