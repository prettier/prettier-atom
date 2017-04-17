'use strict';

var _require = require('atom-linter'),
    findCached = _require.findCached;

var fs = require('fs');
var minimatch = require('minimatch');
var path = require('path');
var bundledPrettier = require('prettier');
var readPkg = require('read-pkg');

// constants
var LINE_SEPERATOR_REGEX = /(\r|\n|\r\n)/;
var EMBEDDED_SCOPES = ['text.html.vue', 'text.html.basic'];
var LINTER_LINT_COMMAND = 'linter:lint';

// local helpers
var getCurrentScope = function getCurrentScope(editor) {
  return editor.getGrammar().scopeName;
};

// robwise: my apologies for this one, but I love function composition and want to use one that is Facebook
// flow inferrable. See https://drboolean.gitbooks.io/mostly-adequate-guide/ch5.html
var flow = function flow(func) {
  for (var _len = arguments.length, funcs = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    funcs[_key - 1] = arguments[_key];
  }

  return function () {
    return funcs.length ? flow.apply(undefined, funcs)(func.apply(undefined, arguments)) : func.apply(undefined, arguments);
  };
};

var getDirFromFilePath = function getDirFromFilePath(filePath) {
  return path.parse(filePath).dir;
};

var getNearestEslintignorePath = function getNearestEslintignorePath(filePath) {
  return findCached(getDirFromFilePath(filePath), '.eslintignore');
};

var getLocalPrettierPath = function getLocalPrettierPath(filePath) {
  if (!filePath) return null;

  var indexPath = path.join('node_modules', 'prettier', 'index.js');
  var dirPath = getDirFromFilePath(filePath);

  return dirPath ? findCached(dirPath, indexPath) : null;
};

var getPrettier = function getPrettier(filePath) {
  var prettierPath = getLocalPrettierPath(filePath);

  // charypar: This is currently the best way to use local prettier instance.
  // Using the CLI introduces a noticeable delay and there is currently no
  // way to use prettier as a long-running process for formatting files as needed
  //
  // See https://github.com/prettier/prettier/issues/918
  //
  // $FlowFixMe when possible, don't use dynamic require
  return prettierPath ? require(prettierPath) : bundledPrettier; // eslint-disable-line
};

var getFilePathRelativeToEslintignore = function getFilePathRelativeToEslintignore(filePath) {
  var nearestEslintignorePath = getNearestEslintignorePath(filePath);

  if (!nearestEslintignorePath) return undefined;

  var eslintignoreDir = getDirFromFilePath(nearestEslintignorePath);

  return path.relative(eslintignoreDir, filePath);
};

var getLinesFromFilePath = function getLinesFromFilePath(filePath) {
  return fs.readFileSync(filePath, 'utf8').split(LINE_SEPERATOR_REGEX);
};

var getIgnoredGlobsFromNearestEslintIgnore = flow(getNearestEslintignorePath, function (maybePath) {
  return maybePath ? getLinesFromFilePath(maybePath) : [];
});

var someGlobsMatchFilePath = function someGlobsMatchFilePath(globs, filePath) {
  return globs.some(function (glob) {
    return minimatch(filePath, glob);
  });
};

var getAtomTabLength = function getAtomTabLength(editor) {
  return atom.config.get('editor.tabLength', { scope: editor.getLastCursor().getScopeDescriptor() });
};

var useAtomTabLengthIfAuto = function useAtomTabLengthIfAuto(editor, tabLength) {
  return tabLength === 'auto' ? getAtomTabLength(editor) : Number(tabLength);
};

var isLinterLintCommandDefined = function isLinterLintCommandDefined(editor) {
  return atom.commands.findCommands({ target: atom.views.getView(editor) }).some(function (command) {
    return command.name === LINTER_LINT_COMMAND;
  });
};

var getDepPath = function getDepPath(dep) {
  return path.join(__dirname, '../node_modules', dep);
};

// public helpers
var getConfigOption = function getConfigOption(key) {
  return atom.config.get('prettier-atom.' + key);
};

var shouldDisplayErrors = function shouldDisplayErrors() {
  return !getConfigOption('silenceErrors');
};

var getPrettierOption = function getPrettierOption(key) {
  return getConfigOption('prettierOptions.' + key);
};

var getPrettierEslintOption = function getPrettierEslintOption(key) {
  return getConfigOption('prettierEslintOptions.' + key);
};

var getCurrentFilePath = function getCurrentFilePath(editor) {
  return editor.buffer.file ? editor.buffer.file.path : undefined;
};

var isInScope = function isInScope(editor) {
  return getConfigOption('formatOnSaveOptions.scopes').includes(getCurrentScope(editor));
};

var isCurrentScopeEmbeddedScope = function isCurrentScopeEmbeddedScope(editor) {
  return EMBEDDED_SCOPES.includes(getCurrentScope(editor));
};

var shouldUseEslint = function shouldUseEslint() {
  return getConfigOption('useEslint');
};

var isFilePathEslintignored = function isFilePathEslintignored(filePath) {
  var filePathRelativeToEslintignore = getFilePathRelativeToEslintignore(filePath);

  if (!filePathRelativeToEslintignore) return false;

  return someGlobsMatchFilePath(getIgnoredGlobsFromNearestEslintIgnore(filePath), filePathRelativeToEslintignore);
};

var isFormatOnSaveEnabled = function isFormatOnSaveEnabled() {
  return getConfigOption('formatOnSaveOptions.enabled');
};

var shouldRespectEslintignore = function shouldRespectEslintignore() {
  return getConfigOption('formatOnSaveOptions.respectEslintignore');
};

var isLinterEslintAutofixEnabled = function isLinterEslintAutofixEnabled() {
  return atom.config.get('linter-eslint.fixOnSave');
};

var isFilePathExcluded = function isFilePathExcluded(filePath) {
  return someGlobsMatchFilePath(getConfigOption('formatOnSaveOptions.excludedGlobs'), filePath);
};

var isFilePathWhitelisted = function isFilePathWhitelisted(filePath) {
  return someGlobsMatchFilePath(getConfigOption('formatOnSaveOptions.whitelistedGlobs'), filePath);
};

var isWhitelistProvided = function isWhitelistProvided() {
  return getConfigOption('formatOnSaveOptions.whitelistedGlobs').length > 0;
};

var getPrettierOptions = function getPrettierOptions(editor) {
  return {
    printWidth: getPrettierOption('printWidth'),
    tabWidth: useAtomTabLengthIfAuto(editor, getPrettierOption('tabWidth')),
    parser: getPrettierOption('parser'),
    singleQuote: getPrettierOption('singleQuote'),
    trailingComma: getPrettierOption('trailingComma'),
    bracketSpacing: getPrettierOption('bracketSpacing'),
    semi: getPrettierOption('semi'),
    useTabs: getPrettierOption('useTabs'),
    jsxBracketSameLine: getPrettierOption('jsxBracketSameLine')
  };
};

var getPrettierEslintOptions = function getPrettierEslintOptions() {
  return {
    prettierLast: getPrettierEslintOption('prettierLast')
  };
};

var runLinter = function runLinter(editor) {
  return isLinterLintCommandDefined(editor) ? atom.commands.dispatch(atom.views.getView(editor), LINTER_LINT_COMMAND) : undefined;
};

var getDebugInfo = function getDebugInfo() {
  var prettierAtomInfo = readPkg.sync();
  var prettierInfo = readPkg.sync(getDepPath('prettier'));
  var prettierESLintInfo = readPkg.sync(getDepPath('prettier-eslint'));
  return {
    atomVersion: atom.getVersion(),
    prettierAtomVersion: prettierAtomInfo.version,
    prettierVersion: prettierInfo.version,
    prettierESLintVersion: prettierESLintInfo.version,
    prettierAtomConfig: atom.config.get('prettier-atom')
  };
};

module.exports = {
  getConfigOption: getConfigOption,
  shouldDisplayErrors: shouldDisplayErrors,
  getPrettierOption: getPrettierOption,
  getPrettierEslintOption: getPrettierEslintOption,
  getCurrentFilePath: getCurrentFilePath,
  getPrettier: getPrettier,
  isInScope: isInScope,
  isCurrentScopeEmbeddedScope: isCurrentScopeEmbeddedScope,
  isFilePathEslintignored: isFilePathEslintignored,
  isFilePathExcluded: isFilePathExcluded,
  isFilePathWhitelisted: isFilePathWhitelisted,
  isWhitelistProvided: isWhitelistProvided,
  isFormatOnSaveEnabled: isFormatOnSaveEnabled,
  isLinterEslintAutofixEnabled: isLinterEslintAutofixEnabled,
  shouldUseEslint: shouldUseEslint,
  shouldRespectEslintignore: shouldRespectEslintignore,
  getPrettierOptions: getPrettierOptions,
  getPrettierEslintOptions: getPrettierEslintOptions,
  runLinter: runLinter,
  getDebugInfo: getDebugInfo
};