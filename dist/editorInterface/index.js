'use strict';

const path = require('path');

const { getScopes } = require('../atomInterface');

let flow;
const lazyFlow = () => {
  if (!flow) {
    flow = require('lodash/fp/flow'); // eslint-disable-line global-require
  }
  return flow;
};

const EMBEDDED_SCOPES = ['text.html.basic'];
const STYLELINT_SCOPES = ['source.css', 'source.less', 'source.css.less', 'source.scss', 'source.css.scss', 'source.css.postcss'];

const getBufferRange = editor => editor.getBuffer().getRange();

const getCurrentScope = editor => editor.getGrammar().scopeName;

const isCurrentScopeEmbeddedScope = editor => EMBEDDED_SCOPES.includes(getCurrentScope(editor));

const isCurrentScopeStyleLintScope = editor => STYLELINT_SCOPES.includes(getCurrentScope(editor));

const isInScope = editor => getScopes().includes(getCurrentScope(editor));

const getCurrentFilePath = editor => editor.buffer.file ? editor.buffer.file.getPath() : undefined;

const getCurrentDir = editor => lazyFlow()(getCurrentFilePath, maybeFilePath => typeof maybeFilePath === 'string' ? path.dirname(maybeFilePath) : undefined)(editor);

module.exports = {
  getBufferRange,
  isCurrentScopeEmbeddedScope,
  isCurrentScopeStyleLintScope,
  isInScope,
  getCurrentScope,
  getCurrentFilePath,
  getCurrentDir
};