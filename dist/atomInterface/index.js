'use strict';

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

// constants
var LINTER_LINT_COMMAND = 'linter:lint';

// local helpers
var getConfigOption = function getConfigOption(key) {
  return atom.config.get('prettier-atom.' + key);
};

var setConfigOption = function setConfigOption(key, value) {
  return atom.config.set('prettier-atom.' + key, value);
};

var isLinterLintCommandDefined = function isLinterLintCommandDefined(editor) {
  return atom.commands.findCommands({ target: atom.views.getView(editor) }).some(function (command) {
    return command.name === LINTER_LINT_COMMAND;
  });
};

// public
var isLinterEslintAutofixEnabled = function isLinterEslintAutofixEnabled() {
  return atom.packages.isPackageActive('linter-eslint') && atom.config.get('linter-eslint.fixOnSave');
};

var shouldUseEslint = function shouldUseEslint() {
  return getConfigOption('useEslint');
};

var shouldUseStylelint = function shouldUseStylelint() {
  return getConfigOption('useStylelint');
};

var shouldUseEditorConfig = function shouldUseEditorConfig() {
  return getConfigOption('useEditorConfig');
};

var isFormatOnSaveEnabled = function isFormatOnSaveEnabled() {
  return getConfigOption('formatOnSaveOptions.enabled');
};

var isDisabledIfNotInPackageJson = function isDisabledIfNotInPackageJson() {
  return getConfigOption('formatOnSaveOptions.isDisabledIfNotInPackageJson');
};

var isDisabledIfNoConfigFile = function isDisabledIfNoConfigFile() {
  return getConfigOption('formatOnSaveOptions.isDisabledIfNoConfigFile');
};

var shouldRespectEslintignore = function shouldRespectEslintignore() {
  return getConfigOption('formatOnSaveOptions.respectEslintignore');
};

var getJavascriptScopes = function getJavascriptScopes() {
  return getConfigOption('formatOnSaveOptions.javascriptScopes');
};

var getTypescriptScopes = function getTypescriptScopes() {
  return getConfigOption('formatOnSaveOptions.typescriptScopes');
};

var getCssScopes = function getCssScopes() {
  return getConfigOption('formatOnSaveOptions.cssScopes');
};

var getJsonScopes = function getJsonScopes() {
  return getConfigOption('formatOnSaveOptions.jsonScopes');
};

var getGraphQlScopes = function getGraphQlScopes() {
  return getConfigOption('formatOnSaveOptions.graphQlScopes');
};

var getMarkdownScopes = function getMarkdownScopes() {
  return getConfigOption('formatOnSaveOptions.markdownScopes');
};

var getAllScopes = function getAllScopes() {
  return [].concat(_toConsumableArray(getJavascriptScopes()), _toConsumableArray(getTypescriptScopes()), _toConsumableArray(getCssScopes()), _toConsumableArray(getJsonScopes()), _toConsumableArray(getGraphQlScopes()), _toConsumableArray(getMarkdownScopes()));
};

var getWhitelistedGlobs = function getWhitelistedGlobs() {
  return getConfigOption('formatOnSaveOptions.whitelistedGlobs');
};

var getExcludedGlobs = function getExcludedGlobs() {
  return getConfigOption('formatOnSaveOptions.excludedGlobs');
};

var toggleFormatOnSave = function toggleFormatOnSave() {
  return setConfigOption('formatOnSaveOptions.enabled', !isFormatOnSaveEnabled());
};

var getAtomTabLength = function getAtomTabLength(editor) {
  return atom.config.get('editor.tabLength', { scope: editor.getLastCursor().getScopeDescriptor() });
};

var getPrettierOptions = function getPrettierOptions() {
  return getConfigOption('prettierOptions');
};

var getPrettierEslintOptions = function getPrettierEslintOptions() {
  return getConfigOption('prettierEslintOptions');
};

var getAtomVersion = function getAtomVersion() {
  return atom.getVersion();
};

var getPrettierAtomConfig = function getPrettierAtomConfig() {
  return atom.config.get('prettier-atom');
};

var addTooltip = function addTooltip(element, options) {
  return atom.tooltips.add(element, options);
};

var addInfoNotification = function addInfoNotification(message, options) {
  return atom.notifications.addInfo(message, options);
};

var addWarningNotification = function addWarningNotification(message, options) {
  return atom.notifications.addWarning(message, options);
};

var addErrorNotification = function addErrorNotification(message, options) {
  return atom.notifications.addError(message, options);
};

var attemptWithErrorNotification = function attemptWithErrorNotification(func) {
  for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  try {
    func.apply(undefined, args);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    addErrorNotification(e.message, { dismissable: true, stack: e.stack });
  }
};

var runLinter = function runLinter(editor) {
  return isLinterLintCommandDefined(editor) && atom.commands.dispatch(atom.views.getView(editor), LINTER_LINT_COMMAND);
};

module.exports = {
  addErrorNotification: addErrorNotification,
  addInfoNotification: addInfoNotification,
  addTooltip: addTooltip,
  addWarningNotification: addWarningNotification,
  getAtomTabLength: getAtomTabLength,
  getAtomVersion: getAtomVersion,
  getExcludedGlobs: getExcludedGlobs,
  getPrettierAtomConfig: getPrettierAtomConfig,
  getPrettierEslintOptions: getPrettierEslintOptions,
  getPrettierOptions: getPrettierOptions,
  getJavascriptScopes: getJavascriptScopes,
  getTypescriptScopes: getTypescriptScopes,
  getCssScopes: getCssScopes,
  getJsonScopes: getJsonScopes,
  getGraphQlScopes: getGraphQlScopes,
  getMarkdownScopes: getMarkdownScopes,
  getAllScopes: getAllScopes,
  getWhitelistedGlobs: getWhitelistedGlobs,
  isDisabledIfNotInPackageJson: isDisabledIfNotInPackageJson,
  isDisabledIfNoConfigFile: isDisabledIfNoConfigFile,
  isFormatOnSaveEnabled: isFormatOnSaveEnabled,
  isLinterEslintAutofixEnabled: isLinterEslintAutofixEnabled,
  runLinter: runLinter,
  shouldRespectEslintignore: shouldRespectEslintignore,
  shouldUseEditorConfig: shouldUseEditorConfig,
  shouldUseEslint: shouldUseEslint,
  shouldUseStylelint: shouldUseStylelint,
  toggleFormatOnSave: toggleFormatOnSave,
  attemptWithErrorNotification: attemptWithErrorNotification
};