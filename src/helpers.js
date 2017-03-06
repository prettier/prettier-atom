// @flow
const { findCached } = require('atom-linter');
const fs = require('fs');
const minimatch = require('minimatch');
const path = require('path');

// constants
const LINE_SEPERATOR_REGEX = /(\r|\n|\r\n)/;
const EMBEDDED_SCOPES = ['text.html.vue', 'text.html.basic'];

// local helpers
const getCurrentScope = (editor: TextEditor) => editor.getGrammar().scopeName;

// robwise: my apologies for this one, but I love function composition and want to use one that is Facebook
// flow inferrable. See https://drboolean.gitbooks.io/mostly-adequate-guide/ch5.html
const flow = (func: Function, ...funcs: Array<Function>) =>
  (...args) => funcs.length ? flow(...funcs)(func(...args)) : func(...args);

const getDirFromFilePath = (filePath: FilePath): FilePath => path.parse(filePath).dir;

const getNearestEslintignorePath = (filePath: FilePath): ?FilePath =>
  findCached(getDirFromFilePath(filePath), '.eslintignore');

const getFilePathRelativeToEslintignore = (filePath: FilePath): ?FilePath => {
  const nearestEslintignorePath = getNearestEslintignorePath(filePath);

  if (!nearestEslintignorePath) return undefined;

  const eslintignoreDir = getDirFromFilePath(nearestEslintignorePath);

  return path.relative(eslintignoreDir, filePath);
};

const getLinesFromFilePath = (filePath: FilePath) =>
  fs.readFileSync(filePath, 'utf8').split(LINE_SEPERATOR_REGEX);

const getIgnoredGlobsFromNearestEslintIgnore: (filePath: FilePath) => Globs = flow(
  getNearestEslintignorePath,
  maybePath => maybePath ? getLinesFromFilePath(maybePath) : [],
);

const someGlobsMatchFilePath = (globs: Globs, filePath: FilePath) =>
  globs.some(glob => minimatch(filePath, glob));

const getAtomTabLength = (editor: TextEditor) =>
  atom.config.get('editor.tabLength', { scope: editor.getLastCursor().getScopeDescriptor() });

const useAtomTabLengthIfAuto = (editor, tabLength) =>
  tabLength === 'auto' ? getAtomTabLength(editor) : Number(tabLength);

// public helpers
const getConfigOption = (key: string) => atom.config.get(`prettier-atom.${key}`);

const shouldDisplayErrors = () => !getConfigOption('silenceErrors');

const getPrettierOption = (key: string) => getConfigOption(`prettierOptions.${key}`);

const getCurrentFilePath = (editor: TextEditor) => editor.buffer.file.path;

const isInScope = (editor: TextEditor) =>
  getConfigOption('formatOnSaveOptions.scopes').includes(getCurrentScope(editor));

const isCurrentScopeEmbeddedScope = (editor: TextEditor) => EMBEDDED_SCOPES.includes(getCurrentScope(editor));

const shouldUseEslint = () => getConfigOption('useEslint');

const isFilePathEslintignored = (filePath: FilePath) => {
  const filePathRelativeToEslintignore = getFilePathRelativeToEslintignore(filePath);

  if (!filePathRelativeToEslintignore) return false;

  return someGlobsMatchFilePath(
    getIgnoredGlobsFromNearestEslintIgnore(filePath),
    filePathRelativeToEslintignore,
  );
};

const isFormatOnSaveEnabled = () => getConfigOption('formatOnSaveOptions.enabled');

const shouldRespectEslintignore = () => getConfigOption('formatOnSaveOptions.respectEslintignore');

const isLinterEslintAutofixEnabled = () => atom.config.get('linter-eslint.fixOnSave');

const getPrettierOptions = (editor: TextEditor) => ({
  printWidth: getPrettierOption('printWidth'),
  tabWidth: useAtomTabLengthIfAuto(editor, getPrettierOption('tabWidth')),
  parser: getPrettierOption('parser'),
  singleQuote: getPrettierOption('singleQuote'),
  trailingComma: getPrettierOption('trailingComma'),
  bracketSpacing: getPrettierOption('bracketSpacing'),
  jsxBracketSameLine: getPrettierOption('jsxBracketSameLine'),
});

module.exports = {
  getConfigOption,
  shouldDisplayErrors,
  getPrettierOption,
  getCurrentFilePath,
  isInScope,
  isCurrentScopeEmbeddedScope,
  isFilePathEslintignored,
  isFormatOnSaveEnabled,
  isLinterEslintAutofixEnabled,
  shouldUseEslint,
  shouldRespectEslintignore,
  getPrettierOptions,
};
