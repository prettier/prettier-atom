'use strict';

const path = require('path');

const {
  getCssScopes,
  getTypescriptScopes,
  getJsonScopes,
  getGraphQlScopes,
  getMarkdownScopes,
  getVueScopes
} = require('../atomInterface');

let flow;
const lazyFlow = () => {
  if (!flow) {
    flow = require('lodash/fp/flow'); // eslint-disable-line global-require
  }
  return flow;
};

const EMBEDDED_SCOPES = ['text.html.basic'];

const getBufferRange = editor => editor.getBuffer().getRange();

const getCurrentScope = editor => editor.getGrammar().scopeName;

const isCurrentScopeEmbeddedScope = editor => EMBEDDED_SCOPES.includes(getCurrentScope(editor));

const isCurrentScopeCssScope = editor => getCssScopes().includes(getCurrentScope(editor));

const isCurrentScopeTypescriptScope = editor => getTypescriptScopes().includes(getCurrentScope(editor));

const isCurrentScopeJsonScope = editor => getJsonScopes().includes(getCurrentScope(editor));

const isCurrentScopeGraphQlScope = editor => getGraphQlScopes().includes(getCurrentScope(editor));

const isCurrentScopeMarkdownScope = editor => getMarkdownScopes().includes(getCurrentScope(editor));

const isCurrentScopeVueScope = editor => getVueScopes().includes(getCurrentScope(editor));

const getCurrentFilePath = editor => editor.buffer.file ? editor.buffer.file.getPath() : undefined;

const getCurrentDir = editor => lazyFlow()(getCurrentFilePath, maybeFilePath => typeof maybeFilePath === 'string' ? path.dirname(maybeFilePath) : undefined)(editor);

module.exports = {
  getBufferRange,
  isCurrentScopeEmbeddedScope,
  isCurrentScopeCssScope,
  isCurrentScopeTypescriptScope,
  isCurrentScopeJsonScope,
  isCurrentScopeGraphQlScope,
  isCurrentScopeMarkdownScope,
  isCurrentScopeVueScope,
  getCurrentScope,
  getCurrentFilePath,
  getCurrentDir
};