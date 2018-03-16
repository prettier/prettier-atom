// @flow

const path = require('path');

const {
  getCssScopes,
  getTypescriptScopes,
  getJsonScopes,
  getGraphQlScopes,
  getMarkdownScopes,
  getVueScopes,
} = require('../atomInterface');

let flow;
const lazyFlow = () => {
  if (!flow) {
    flow = require('lodash/fp/flow'); // eslint-disable-line global-require
  }
  return flow;
};

const EMBEDDED_SCOPES = ['text.html.basic'];

const getBufferRange = (editor: TextEditor) => editor.getBuffer().getRange();

const getCurrentScope = (editor: TextEditor) => editor.getGrammar().scopeName;

const isCurrentScopeEmbeddedScope = (editor: TextEditor) => EMBEDDED_SCOPES.includes(getCurrentScope(editor));

const isCurrentScopeCssScope = (editor: TextEditor) => getCssScopes().includes(getCurrentScope(editor));

const isCurrentScopeTypescriptScope = (editor: TextEditor) =>
  getTypescriptScopes().includes(getCurrentScope(editor));

const isCurrentScopeJsonScope = (editor: TextEditor) => getJsonScopes().includes(getCurrentScope(editor));

const isCurrentScopeGraphQlScope = (editor: TextEditor) =>
  getGraphQlScopes().includes(getCurrentScope(editor));

const isCurrentScopeMarkdownScope = (editor: TextEditor) =>
  getMarkdownScopes().includes(getCurrentScope(editor));

const isCurrentScopeVueScope = (editor: TextEditor) => getVueScopes().includes(getCurrentScope(editor));

const getCurrentFilePath: (editor: TextEditor) => ?FilePath = editor =>
  editor.buffer.file ? editor.buffer.file.getPath() : undefined;

const getCurrentDir: (editor: TextEditor) => ?string = editor =>
  lazyFlow()(
    getCurrentFilePath,
    (maybeFilePath: ?string) => (typeof maybeFilePath === 'string' ? path.dirname(maybeFilePath) : undefined),
  )(editor);

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
  getCurrentDir,
};
