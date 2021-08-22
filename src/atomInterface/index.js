// @flow
const path = require('path');
const _ = require('lodash/fp');

// constants
const LINTER_LINT_COMMAND = 'linter:lint';

// local helpers
const getConfigOption = (key: string) => atom.config.get(`prettier-atom.${key}`);

const setConfigOption = (key: string, value: any) => atom.config.set(`prettier-atom.${key}`, value);

const isLinterLintCommandDefined = (editor: TextEditor) =>
  atom.commands
    .findCommands({ target: atom.views.getView(editor) })
    .some((command) => command.name === LINTER_LINT_COMMAND);

// public
const isLinterEslintAutofixEnabled = (): any | boolean =>
  atom.packages.isPackageActive('linter-eslint') && atom.config.get('linter-eslint.fixOnSave');

const shouldUseEslint = (): any => getConfigOption('useEslint');

const shouldUseStylelint = (): any => getConfigOption('useStylelint');

const shouldUseEditorConfig = (): any => getConfigOption('useEditorConfig');

const isFormatOnSaveEnabled = (): any => getConfigOption('formatOnSaveOptions.enabled');

const isDisabledIfNotInPackageJson = (): any =>
  getConfigOption('formatOnSaveOptions.isDisabledIfNotInPackageJson');

const isDisabledIfNoConfigFile = (): any => getConfigOption('formatOnSaveOptions.isDisabledIfNoConfigFile');

const shouldRespectEslintignore = (): any => getConfigOption('formatOnSaveOptions.respectEslintignore');

const shouldIgnoreNodeModules = (): any => getConfigOption('formatOnSaveOptions.ignoreNodeModules');

const toggleFormatOnSave = (): any =>
  setConfigOption('formatOnSaveOptions.enabled', !isFormatOnSaveEnabled());

const getPrettierEslintOptions = (): any => getConfigOption('prettierEslintOptions');

const getAtomVersion = (): string => atom.getVersion();

const getPrettierAtomConfig = (): any => atom.config.get('prettier-atom');

const getWhitelistedGlobs = (): any => getConfigOption('formatOnSaveOptions.whitelistedGlobs');

const getExcludedGlobs = (): any => getConfigOption('formatOnSaveOptions.excludedGlobs');

const addTooltip = (element: HTMLElement, options: Atom$Tooltips$Options): Atom$Disposable =>
  atom.tooltips.add(element, options);

const addInfoNotification = (message: string, options?: Atom$Notifications$Options): void =>
  atom.notifications.addInfo(message, options);

const addWarningNotification = (message: string, options?: Atom$Notifications$Options): void =>
  atom.notifications.addWarning(message, options);

const addErrorNotification = (message: string, options?: Atom$Notifications$Options): void =>
  atom.notifications.addError(message, options);

const attemptWithErrorNotification = async (func: Function, ...args: Array<any>) => {
  try {
    await func(...args);
  } catch (e) {
    console.error(e); // eslint-disable-line no-console
    addErrorNotification(e.message, { dismissable: true, stack: e.stack });
  }
};

const runLinter = (editor: TextEditor): void | boolean =>
  isLinterLintCommandDefined(editor) &&
  atom.commands.dispatch(atom.views.getView(editor), LINTER_LINT_COMMAND);

const invokeAtomRelativizePath = _.flow(
  (filePath) => atom.project.relativizePath(filePath), // NOTE: fat arrow necessary for `this`
  _.get('[1]'),
);

const relativizePathToDirname = (filePath: string) => path.relative(path.dirname(filePath), filePath);

const relativizePathFromAtomProject: (filePath: ?string) => ?string = _.cond([
  [_.isNil, _.constant(null)],
  [_.flow(invokeAtomRelativizePath, path.isAbsolute), relativizePathToDirname],
  [_.stubTrue, invokeAtomRelativizePath],
]);

module.exports = {
  addErrorNotification,
  addInfoNotification,
  addTooltip,
  addWarningNotification,
  getAtomVersion,
  getPrettierAtomConfig,
  getPrettierEslintOptions,
  getWhitelistedGlobs,
  getExcludedGlobs,
  isDisabledIfNotInPackageJson,
  isDisabledIfNoConfigFile,
  isFormatOnSaveEnabled,
  isLinterEslintAutofixEnabled,
  relativizePathFromAtomProject,
  runLinter,
  shouldIgnoreNodeModules,
  shouldRespectEslintignore,
  shouldUseEslint,
  shouldUseStylelint,
  shouldUseEditorConfig,
  toggleFormatOnSave,
  attemptWithErrorNotification,
};
