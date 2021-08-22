// @flow
const path = require('path');

let flow;
const lazyFlow = () => {
  if (!flow) {
    flow = require('lodash/fp/flow'); // eslint-disable-line global-require
  }
  return flow;
};

const STYLELINT_SCOPES = [
  'source.css',
  'source.less',
  'source.css.less',
  'source.scss',
  'source.css.scss',
  'source.css.postcss',
];

const getBufferRange = (editor: TextEditor): Range => editor.getBuffer().getRange();

const getCurrentScope = (editor: TextEditor): string => editor.getGrammar().scopeName;

const isCurrentScopeStyleLintScope = (editor: TextEditor): boolean =>
  STYLELINT_SCOPES.includes(getCurrentScope(editor));

const getCurrentFilePath = (editor: TextEditor): ?FilePath =>
  editor.buffer.file ? editor.buffer.file.getPath() : undefined;

const isCurrentFilePathDefined = (editor: ?TextEditor): ?boolean => editor && !!getCurrentFilePath(editor);

const getCurrentDir: (editor: TextEditor) => ?string = (editor) =>
  lazyFlow()(getCurrentFilePath, (maybeFilePath: ?string) =>
    typeof maybeFilePath === 'string' ? path.dirname(maybeFilePath) : undefined,
  )(editor);

module.exports = {
  getBufferRange,
  isCurrentFilePathDefined,
  isCurrentScopeStyleLintScope,
  getCurrentScope,
  getCurrentFilePath,
  getCurrentDir,
};
