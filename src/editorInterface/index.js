// @flow
const _ = require('lodash/fp');
const path = require('path');

const { getCssScopes, getTypescriptScopes, getJsonScopes, getGraphQlScopes } = require('../atomInterface');

const EMBEDDED_SCOPES = ['text.html.vue', 'text.html.basic'];

const getBufferRange = (editor: TextEditor) => editor.getBuffer().getRange();

const getCurrentScope = (editor: TextEditor) => editor.getGrammar().scopeName;

const isCurrentScopeEmbeddedScope = (editor: TextEditor) => EMBEDDED_SCOPES.includes(getCurrentScope(editor));

const isCurrentScopeCssScope = (editor: TextEditor) => getCssScopes().includes(getCurrentScope(editor));

const isCurrentScopeTypescriptScope = (editor: TextEditor) =>
  getTypescriptScopes().includes(getCurrentScope(editor));

const isCurrentScopeJsonScope = (editor: TextEditor) => getJsonScopes().includes(getCurrentScope(editor));

const isCurrentScopeGraphQlScope = (editor: TextEditor) =>
  getGraphQlScopes().includes(getCurrentScope(editor));

const getCurrentFilePath = (editor: TextEditor) => (editor.buffer.file ? editor.buffer.file.path : undefined);

const getCurrentDir: (editor: TextEditor) => ?string = _.flow(
  getCurrentFilePath,
  (maybeFilePath: ?string) => (typeof maybeFilePath === 'string' ? path.dirname(maybeFilePath) : undefined),
);

module.exports = {
  getBufferRange,
  isCurrentScopeEmbeddedScope,
  isCurrentScopeCssScope,
  isCurrentScopeTypescriptScope,
  isCurrentScopeJsonScope,
  isCurrentScopeGraphQlScope,
  getCurrentScope,
  getCurrentFilePath,
  getCurrentDir,
};
