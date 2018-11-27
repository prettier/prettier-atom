'use strict';

const path = require('path');

let flow;
const lazyFlow = () => {
  if (!flow) {
    flow = require('lodash/fp/flow'); // eslint-disable-line global-require
  }
  return flow;
};

const STYLELINT_SCOPES = ['source.css', 'source.less', 'source.css.less', 'source.scss', 'source.css.scss', 'source.css.postcss'];

const getBufferRange = editor => editor.getBuffer().getRange();

const getCurrentScope = editor => editor.getGrammar().scopeName;

const isCurrentScopeStyleLintScope = editor => STYLELINT_SCOPES.includes(getCurrentScope(editor));

const getCurrentFilePath = editor => editor.buffer.file ? editor.buffer.file.getPath() : undefined;

const isCurrentFilePathDefined = editor => editor && !!getCurrentFilePath(editor);

const getCurrentDir = editor => lazyFlow()(getCurrentFilePath, maybeFilePath => typeof maybeFilePath === 'string' ? path.dirname(maybeFilePath) : undefined)(editor);

module.exports = {
  getBufferRange,
  isCurrentFilePathDefined,
  isCurrentScopeStyleLintScope,
  getCurrentScope,
  getCurrentFilePath,
  getCurrentDir
};