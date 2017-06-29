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

var shouldUseEditorConfig = function shouldUseEditorConfig() {
  return getConfigOption('useEditorConfig');
};

var shouldDisplayErrors = function shouldDisplayErrors() {
  return !getConfigOption('silenceErrors');
};

var isFormatOnSaveEnabled = function isFormatOnSaveEnabled() {
  return getConfigOption('formatOnSaveOptions.enabled');
};

var isDisabledIfNotInPackageJson = function isDisabledIfNotInPackageJson() {
  return getConfigOption('formatOnSaveOptions.isDisabledIfNotInPackageJson');
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

var getAllScopes = function getAllScopes() {
  return [].concat(_toConsumableArray(getJavascriptScopes()), _toConsumableArray(getTypescriptScopes()), _toConsumableArray(getCssScopes()), _toConsumableArray(getJsonScopes()));
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
  getAllScopes: getAllScopes,
  getWhitelistedGlobs: getWhitelistedGlobs,
  isDisabledIfNotInPackageJson: isDisabledIfNotInPackageJson,
  isFormatOnSaveEnabled: isFormatOnSaveEnabled,
  isLinterEslintAutofixEnabled: isLinterEslintAutofixEnabled,
  runLinter: runLinter,
  shouldDisplayErrors: shouldDisplayErrors,
  shouldRespectEslintignore: shouldRespectEslintignore,
  shouldUseEditorConfig: shouldUseEditorConfig,
  shouldUseEslint: shouldUseEslint,
  toggleFormatOnSave: toggleFormatOnSave
};