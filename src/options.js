// @flow
const editorconfig = require('editorconfig');

const { getCurrentFilePath, getConfigOption } = require('./helpers');

const getPrettierOption = (key: string) => getConfigOption(`prettierOptions.${key}`);

const getPrettierEslintOption = (key: string) => getConfigOption(`prettierEslintOptions.${key}`);

const shouldUseEslint = () => getConfigOption('useEslint');

const shouldDisplayErrors = () => !getConfigOption('silenceErrors');

const getAtomTabLength = (editor: TextEditor) =>
  atom.config.get('editor.tabLength', { scope: editor.getLastCursor().getScopeDescriptor() });

const useAtomTabLengthIfAuto = (editor, tabLength) =>
  tabLength === 'auto' ? getAtomTabLength(editor) : Number(tabLength);

const mapEditorConfigOptions = (options: Object) => {
  const { indent_style: indentStyle, tab_width: tabWidth, max_line_length: printWidth } = options;
  return {
    ...(tabWidth ? { tabWidth } : null),
    ...(printWidth ? { printWidth } : null),
    ...(indentStyle ? { useTabs: indentStyle === 'tab' } : null),
  };
};

const getEditorConfigOptions = (file: FilePath) => {
  const options = editorconfig.parseSync(file);
  return options ? mapEditorConfigOptions(options) : null;
};

const getPrettierOptions = (editor: TextEditor) => {
  const filePath = getCurrentFilePath(editor);
  const optionsFromSettings = {
    printWidth: getPrettierOption('printWidth'),
    tabWidth: useAtomTabLengthIfAuto(editor, getPrettierOption('tabWidth')),
    parser: getPrettierOption('parser'),
    singleQuote: getPrettierOption('singleQuote'),
    trailingComma: getPrettierOption('trailingComma'),
    bracketSpacing: getPrettierOption('bracketSpacing'),
    semi: getPrettierOption('semi'),
    useTabs: getPrettierOption('useTabs'),
    jsxBracketSameLine: getPrettierOption('jsxBracketSameLine'),
  };
  return filePath ? { ...optionsFromSettings, ...getEditorConfigOptions(filePath) } : optionsFromSettings;
};

const getPrettierEslintOptions = () => ({
  prettierLast: getPrettierEslintOption('prettierLast'),
});

const isFormatOnSaveEnabled = () => getConfigOption('formatOnSaveOptions.enabled');

const shouldRespectEslintignore = () => getConfigOption('formatOnSaveOptions.respectEslintignore');

const isLinterEslintAutofixEnabled = () => atom.config.get('linter-eslint.fixOnSave');

const isWhitelistProvided = () => getConfigOption('formatOnSaveOptions.whitelistedGlobs').length > 0;

module.exports = {
  getConfigOption,
  getEditorConfigOptions,
  getPrettierOption,
  getPrettierOptions,
  getPrettierEslintOption,
  getPrettierEslintOptions,
  shouldUseEslint,
  shouldDisplayErrors,
  isWhitelistProvided,
  isFormatOnSaveEnabled,
  isLinterEslintAutofixEnabled,
  shouldRespectEslintignore,
};
