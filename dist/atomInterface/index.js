'use strict';

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

var shouldRespectEslintignore = function shouldRespectEslintignore() {
  return getConfigOption('formatOnSaveOptions.respectEslintignore');
};

var getScopes = function getScopes() {
  return getConfigOption('formatOnSaveOptions.scopes');
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
  getScopes: getScopes,
  getWhitelistedGlobs: getWhitelistedGlobs,
  isFormatOnSaveEnabled: isFormatOnSaveEnabled,
  isLinterEslintAutofixEnabled: isLinterEslintAutofixEnabled,
  runLinter: runLinter,
  shouldDisplayErrors: shouldDisplayErrors,
  shouldRespectEslintignore: shouldRespectEslintignore,
  shouldUseEditorConfig: shouldUseEditorConfig,
  shouldUseEslint: shouldUseEslint,
  toggleFormatOnSave: toggleFormatOnSave
};