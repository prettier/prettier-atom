'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var editorconfig = require('editorconfig');

var _require = require('./helpers'),
    getCurrentFilePath = _require.getCurrentFilePath,
    getConfigOption = _require.getConfigOption;

var getPrettierOption = function getPrettierOption(key) {
  return getConfigOption('prettierOptions.' + key);
};

var getPrettierEslintOption = function getPrettierEslintOption(key) {
  return getConfigOption('prettierEslintOptions.' + key);
};

var shouldUseEslint = function shouldUseEslint() {
  return getConfigOption('useEslint');
};

var shouldDisplayErrors = function shouldDisplayErrors() {
  return !getConfigOption('silenceErrors');
};

var getAtomTabLength = function getAtomTabLength(editor) {
  return atom.config.get('editor.tabLength', { scope: editor.getLastCursor().getScopeDescriptor() });
};

var useAtomTabLengthIfAuto = function useAtomTabLengthIfAuto(editor, tabLength) {
  return tabLength === 'auto' ? getAtomTabLength(editor) : Number(tabLength);
};

var mapEditorConfigOptions = function mapEditorConfigOptions(options) {
  var indentStyle = options.indent_style,
      tabWidth = options.tab_width,
      printWidth = options.max_line_length;

  return _extends({}, tabWidth ? { tabWidth: tabWidth } : null, printWidth ? { printWidth: printWidth } : null, indentStyle ? { useTabs: indentStyle === 'tab' } : null);
};

var getEditorConfigOptions = function getEditorConfigOptions(file) {
  var options = editorconfig.parseSync(file);
  return options ? mapEditorConfigOptions(options) : null;
};

var getPrettierOptions = function getPrettierOptions(editor) {
  var filePath = getCurrentFilePath(editor);
  var optionsFromSettings = {
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
  if (!filePath || !getConfigOption('useEditorConfig')) {
    return optionsFromSettings;
  }
  return _extends({}, optionsFromSettings, getEditorConfigOptions(filePath));
};

var getPrettierEslintOptions = function getPrettierEslintOptions() {
  return {
    prettierLast: getPrettierEslintOption('prettierLast')
  };
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

var isWhitelistProvided = function isWhitelistProvided() {
  return getConfigOption('formatOnSaveOptions.whitelistedGlobs').length > 0;
};

module.exports = {
  getConfigOption: getConfigOption,
  getEditorConfigOptions: getEditorConfigOptions,
  getPrettierOption: getPrettierOption,
  getPrettierOptions: getPrettierOptions,
  getPrettierEslintOption: getPrettierEslintOption,
  getPrettierEslintOptions: getPrettierEslintOptions,
  shouldUseEslint: shouldUseEslint,
  shouldDisplayErrors: shouldDisplayErrors,
  isWhitelistProvided: isWhitelistProvided,
  isFormatOnSaveEnabled: isFormatOnSaveEnabled,
  isLinterEslintAutofixEnabled: isLinterEslintAutofixEnabled,
  shouldRespectEslintignore: shouldRespectEslintignore
};