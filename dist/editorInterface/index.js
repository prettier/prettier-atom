'use strict';

var _ = require('lodash/fp');
var path = require('path');

var _require = require('../atomInterface'),
    getCssScopes = _require.getCssScopes,
    getTypescriptScopes = _require.getTypescriptScopes,
    getJsonScopes = _require.getJsonScopes;

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

var isCurrentScopeCssScope = function isCurrentScopeCssScope(editor) {
  return getCssScopes().includes(getCurrentScope(editor));
};

var isCurrentScopeTypescriptScope = function isCurrentScopeTypescriptScope(editor) {
  return getTypescriptScopes().includes(getCurrentScope(editor));
};

var isCurrentScopeJsonScope = function isCurrentScopeJsonScope(editor) {
  return getJsonScopes().includes(getCurrentScope(editor));
};

var getCurrentFilePath = function getCurrentFilePath(editor) {
  return editor.buffer.file ? editor.buffer.file.path : undefined;
};

var getCurrentDir = _.flow(getCurrentFilePath, function (maybeFilePath) {
  return typeof maybeFilePath === 'string' ? path.dirname(maybeFilePath) : undefined;
});

module.exports = {
  getBufferRange: getBufferRange,
  isCurrentScopeEmbeddedScope: isCurrentScopeEmbeddedScope,
  isCurrentScopeCssScope: isCurrentScopeCssScope,
  isCurrentScopeTypescriptScope: isCurrentScopeTypescriptScope,
  isCurrentScopeJsonScope: isCurrentScopeJsonScope,
  getCurrentScope: getCurrentScope,
  getCurrentFilePath: getCurrentFilePath,
  getCurrentDir: getCurrentDir
};