// @flow

// constants
const LINTER_LINT_COMMAND = 'linter:lint';

// local helpers
const getConfigOption = (key: string) => atom.config.get(`prettier-atom.${key}`);

const setConfigOption = (key: string, value: any) => atom.config.set(`prettier-atom.${key}`, value);

const isLinterLintCommandDefined = (editor: TextEditor) =>
  atom.commands
    .findCommands({ target: atom.views.getView(editor) })
    .some(command => command.name === LINTER_LINT_COMMAND);

// public
const isLinterEslintAutofixEnabled = () => atom.config.get('linter-eslint.fixOnSave');

const shouldUseEslint = () => getConfigOption('useEslint');

const shouldUseEditorConfig = () => getConfigOption('useEditorConfig');

const shouldDisplayErrors = () => !getConfigOption('silenceErrors');

const isFormatOnSaveEnabled = () => getConfigOption('formatOnSaveOptions.enabled');

const shouldRespectEslintignore = () => getConfigOption('formatOnSaveOptions.respectEslintignore');

const getScopes = () => getConfigOption('formatOnSaveOptions.scopes');

const getWhitelistedGlobs = () => getConfigOption('formatOnSaveOptions.whitelistedGlobs');

const getExcludedGlobs = () => getConfigOption('formatOnSaveOptions.excludedGlobs');

const toggleFormatOnSave = () => setConfigOption('formatOnSaveOptions.enabled', !isFormatOnSaveEnabled());

const getAtomTabLength = (editor: TextEditor) =>
  atom.config.get('editor.tabLength', { scope: editor.getLastCursor().getScopeDescriptor() });

const getPrettierOptions = () => getConfigOption('prettierOptions');

const getPrettierEslintOptions = () => getConfigOption('prettierEslintOptions');

const getAtomVersion = () => atom.getVersion();

const isPackageActive = (name: string) => atom.packages.isPackageActive(name);

const getPrettierAtomConfig = () => atom.config.get('prettier-atom');

const addTooltip = (element: HTMLElement, options: Atom$Tooltips$Options) =>
  atom.tooltips.add(element, options);

const addInfoNotification = (message: string, options?: Atom$Notifications$Options) =>
  atom.notifications.addInfo(message, options);

const addWarningNotification = (message: string, options?: Atom$Notifications$Options) =>
  atom.notifications.addWarning(message, options);

const addErrorNotification = (message: string, options?: Atom$Notifications$Options) =>
  atom.notifications.addError(message, options);

const runLinter = (editor: TextEditor) =>
  isLinterLintCommandDefined(editor) &&
  atom.commands.dispatch(atom.views.getView(editor), LINTER_LINT_COMMAND);

module.exports = {
  addErrorNotification,
  addInfoNotification,
  addTooltip,
  addWarningNotification,
  getAtomTabLength,
  getAtomVersion,
  isPackageActive,
  getExcludedGlobs,
  getPrettierAtomConfig,
  getPrettierEslintOptions,
  getPrettierOptions,
  getScopes,
  getWhitelistedGlobs,
  isFormatOnSaveEnabled,
  isLinterEslintAutofixEnabled,
  runLinter,
  shouldDisplayErrors,
  shouldRespectEslintignore,
  shouldUseEditorConfig,
  shouldUseEslint,
  toggleFormatOnSave,
};
