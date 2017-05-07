// @flow
const { findCached } = require('atom-linter');
const fs = require('fs');
const ignore = require('ignore');
const path = require('path');
const bundledPrettier = require('prettier');
const readPkg = require('read-pkg');

// constants
const LINE_SEPERATOR_REGEX = /(\r|\n|\r\n)/;
const EMBEDDED_SCOPES = ['text.html.vue', 'text.html.basic'];
const LINTER_LINT_COMMAND = 'linter:lint';

// local helpers
const getCurrentScope = (editor: TextEditor) => editor.getGrammar().scopeName;

// robwise: my apologies for this one, but I love function composition and want to use one that is Facebook
// flow inferrable. See https://drboolean.gitbooks.io/mostly-adequate-guide/ch5.html
const flow = (func: Function, ...funcs: Array<Function>) => (...args) =>
  funcs.length ? flow(...funcs)(func(...args)) : func(...args);

const getDirFromFilePath = (filePath: FilePath): FilePath => path.parse(filePath).dir;

const getNearestEslintignorePath = (filePath: FilePath): ?FilePath =>
  findCached(getDirFromFilePath(filePath), '.eslintignore');

const getLocalPrettierPath = (filePath: ?FilePath): ?FilePath => {
  if (!filePath) return null;

  const indexPath = path.join('node_modules', 'prettier', 'index.js');
  const dirPath = getDirFromFilePath(filePath);

  return dirPath ? findCached(dirPath, indexPath) : null;
};

const getPrettier = (filePath: ?FilePath) => {
  const prettierPath = getLocalPrettierPath(filePath);

  // charypar: This is currently the best way to use local prettier instance.
  // Using the CLI introduces a noticeable delay and there is currently no
  // way to use prettier as a long-running process for formatting files as needed
  //
  // See https://github.com/prettier/prettier/issues/918
  //
  // $FlowFixMe when possible, don't use dynamic require
  return prettierPath ? require(prettierPath) : bundledPrettier; // eslint-disable-line
};

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
  maybePath => (maybePath ? getLinesFromFilePath(maybePath) : []),
);

const someGlobsMatchFilePath = (globs: Globs, filePath: FilePath) => ignore().add(globs).ignores(filePath);

const isLinterLintCommandDefined = (editor: TextEditor) =>
  atom.commands
    .findCommands({ target: atom.views.getView(editor) })
    .some(command => command.name === LINTER_LINT_COMMAND);

const getDepPath = (dep: string) => path.join(__dirname, '../node_modules', dep);

// public helpers
const getConfigOption = (key: string) => atom.config.get(`prettier-atom.${key}`);

const setConfigOption = (key: string, value: any) => atom.config.set(`prettier-atom.${key}`, value);

const getCurrentFilePath = (editor: TextEditor) => (editor.buffer.file ? editor.buffer.file.path : undefined);

const isInScope = (editor: TextEditor) =>
  getConfigOption('formatOnSaveOptions.scopes').includes(getCurrentScope(editor));

const isCurrentScopeEmbeddedScope = (editor: TextEditor) => EMBEDDED_SCOPES.includes(getCurrentScope(editor));

const isFilePathEslintignored = (filePath: FilePath) => {
  const filePathRelativeToEslintignore = getFilePathRelativeToEslintignore(filePath);

  if (!filePathRelativeToEslintignore) return false;

  return someGlobsMatchFilePath(
    getIgnoredGlobsFromNearestEslintIgnore(filePath),
    filePathRelativeToEslintignore,
  );
};

const isFilePathExcluded = (filePath: FilePath) =>
  someGlobsMatchFilePath(getConfigOption('formatOnSaveOptions.excludedGlobs'), filePath);

const isFilePathWhitelisted = (filePath: FilePath) =>
  someGlobsMatchFilePath(getConfigOption('formatOnSaveOptions.whitelistedGlobs'), filePath);

const runLinter = (editor: TextEditor) =>
  isLinterLintCommandDefined(editor)
    ? atom.commands.dispatch(atom.views.getView(editor), LINTER_LINT_COMMAND)
    : undefined;

const getDebugInfo = () => ({
  atomVersion: atom.getVersion(),
  prettierAtomVersion: readPkg.sync().version,
  prettierVersion: readPkg.sync(getDepPath('prettier')).version,
  prettierESLintVersion: readPkg.sync(getDepPath('prettier-eslint')).version,
  prettierAtomConfig: atom.config.get('prettier-atom'),
});

module.exports = {
  getConfigOption,
  setConfigOption,
  getCurrentFilePath,
  getPrettier,
  isInScope,
  isCurrentScopeEmbeddedScope,
  isFilePathEslintignored,
  isFilePathExcluded,
  isFilePathWhitelisted,
  runLinter,
  getDebugInfo,
};
