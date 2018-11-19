// @flow
const path = require('path');

let flow;
const lazyFlow = () => {
  if (!flow) {
    flow = require('lodash/fp/flow'); // eslint-disable-line global-require
  }
  return flow;
};

const EMBEDDED_SCOPES = ['text.html.basic'];
const STYLELINT_SCOPES = [
  'source.css',
  'source.less',
  'source.css.less',
  'source.scss',
  'source.css.scss',
  'source.css.postcss',
];

const getBufferRange = (editor: TextEditor) => editor.getBuffer().getRange();

const getCurrentScope = (editor: TextEditor) => editor.getGrammar().scopeName;

const isCurrentScopeEmbeddedScope = (editor: TextEditor) => EMBEDDED_SCOPES.includes(getCurrentScope(editor));

const isCurrentScopeStyleLintScope = (editor: TextEditor) =>
  STYLELINT_SCOPES.includes(getCurrentScope(editor));

const getCurrentFilePath = (editor: TextEditor): ?FilePath =>
  editor.buffer.file ? editor.buffer.file.getPath() : undefined;

const isCurrentFilePathDefined = (editor: ?TextEditor) => editor && !!getCurrentFilePath(editor);

const getCurrentDir: (editor: TextEditor) => ?string = editor =>
  lazyFlow()(getCurrentFilePath, (maybeFilePath: ?string) =>
    typeof maybeFilePath === 'string' ? path.dirname(maybeFilePath) : undefined,
  )(editor);

module.exports = {
  getBufferRange,
  isCurrentFilePathDefined,
  isCurrentScopeEmbeddedScope,
  isCurrentScopeStyleLintScope,
  getCurrentScope,
  getCurrentFilePath,
  getCurrentDir,
};
