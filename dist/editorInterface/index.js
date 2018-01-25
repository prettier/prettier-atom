'use strict';

var path = require('path');

var _require = require('../atomInterface'),
    getCssScopes = _require.getCssScopes,
    getTypescriptScopes = _require.getTypescriptScopes,
    getJsonScopes = _require.getJsonScopes,
    getGraphQlScopes = _require.getGraphQlScopes,
    getMarkdownScopes = _require.getMarkdownScopes,
    getVueScopes = _require.getVueScopes;

var flow = void 0;
var lazyFlow = function lazyFlow() {
  if (!flow) {
    flow = require('lodash/fp/flow'); // eslint-disable-line global-require
  }
  return flow;
};

var EMBEDDED_SCOPES = ['text.html.basic'];

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

var isCurrentScopeGraphQlScope = function isCurrentScopeGraphQlScope(editor) {
  return getGraphQlScopes().includes(getCurrentScope(editor));
};

var isCurrentScopeMarkdownScope = function isCurrentScopeMarkdownScope(editor) {
  return getMarkdownScopes().includes(getCurrentScope(editor));
};

var isCurrentScopeVueScope = function isCurrentScopeVueScope(editor) {
  return getVueScopes().includes(getCurrentScope(editor));
};

var getCurrentFilePath = function getCurrentFilePath(editor) {
  return editor.buffer.file ? editor.buffer.file.getPath() : undefined;
};

var getCurrentDir = function getCurrentDir(editor) {
  return lazyFlow()(getCurrentFilePath, function (maybeFilePath) {
    return typeof maybeFilePath === 'string' ? path.dirname(maybeFilePath) : undefined;
  })(editor);
};

module.exports = {
  getBufferRange: getBufferRange,
  isCurrentScopeEmbeddedScope: isCurrentScopeEmbeddedScope,
  isCurrentScopeCssScope: isCurrentScopeCssScope,
  isCurrentScopeTypescriptScope: isCurrentScopeTypescriptScope,
  isCurrentScopeJsonScope: isCurrentScopeJsonScope,
  isCurrentScopeGraphQlScope: isCurrentScopeGraphQlScope,
  isCurrentScopeMarkdownScope: isCurrentScopeMarkdownScope,
  isCurrentScopeVueScope: isCurrentScopeVueScope,
  getCurrentScope: getCurrentScope,
  getCurrentFilePath: getCurrentFilePath,
  getCurrentDir: getCurrentDir
};