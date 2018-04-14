'use strict';

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// constants
const LINTER_LINT_COMMAND = 'linter:lint';

// local helpers
const getConfigOption = key => atom.config.get(`prettier-atom.${key}`);

const setConfigOption = (key, value) => atom.config.set(`prettier-atom.${key}`, value);

const isLinterLintCommandDefined = editor => atom.commands.findCommands({ target: atom.views.getView(editor) }).some(command => command.name === LINTER_LINT_COMMAND);

// public
const isLinterEslintAutofixEnabled = () => atom.packages.isPackageActive('linter-eslint') && atom.config.get('linter-eslint.fixOnSave');

const shouldUseEslint = () => getConfigOption('useEslint');

const shouldUseStylelint = () => getConfigOption('useStylelint');

const shouldUseEditorConfig = () => getConfigOption('useEditorConfig');

const isFormatOnSaveEnabled = () => getConfigOption('formatOnSaveOptions.enabled');

const isDisabledIfNotInPackageJson = () => getConfigOption('formatOnSaveOptions.isDisabledIfNotInPackageJson');

const isDisabledIfNoConfigFile = () => getConfigOption('formatOnSaveOptions.isDisabledIfNoConfigFile');

const shouldRespectEslintignore = () => getConfigOption('formatOnSaveOptions.respectEslintignore');

const getJavascriptScopes = () => getConfigOption('scopes.javascript');

const getTypescriptScopes = () => getConfigOption('scopes.typescript');

const getCssScopes = () => getConfigOption('scopes.css');

const getJsonScopes = () => getConfigOption('scopes.json');

const getGraphQlScopes = () => getConfigOption('scopes.graphQl');

const getMarkdownScopes = () => getConfigOption('scopes.markdown');

const getVueScopes = () => getConfigOption('scopes.vue');

const getAllScopes = () => [getJavascriptScopes(), getTypescriptScopes(), getCssScopes(), getJsonScopes(), getGraphQlScopes(), getMarkdownScopes(), getVueScopes()].reduce((acc, els) => acc.concat(els));

const getWhitelistedGlobs = () => getConfigOption('formatOnSaveOptions.whitelistedGlobs');

const getExcludedGlobs = () => getConfigOption('formatOnSaveOptions.excludedGlobs');

const toggleFormatOnSave = () => setConfigOption('formatOnSaveOptions.enabled', !isFormatOnSaveEnabled());

const getAtomTabLength = editor => atom.config.get('editor.tabLength', { scope: editor.getLastCursor().getScopeDescriptor() });

const getPrettierOptions = () => getConfigOption('prettierOptions');

const getPrettierEslintOptions = () => getConfigOption('prettierEslintOptions');

const getAtomVersion = () => atom.getVersion();

const getPrettierAtomConfig = () => atom.config.get('prettier-atom');

const addTooltip = (element, options) => atom.tooltips.add(element, options);

const addInfoNotification = (message, options) => atom.notifications.addInfo(message, options);

const addWarningNotification = (message, options) => atom.notifications.addWarning(message, options);

const addErrorNotification = (message, options) => atom.notifications.addError(message, options);

const attemptWithErrorNotification = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (func, ...args) {
    try {
      yield func(...args);
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
      addErrorNotification(e.message, { dismissable: true, stack: e.stack });
    }
  });

  return function attemptWithErrorNotification(_x) {
    return _ref.apply(this, arguments);
  };
})();

const runLinter = editor => isLinterLintCommandDefined(editor) && atom.commands.dispatch(atom.views.getView(editor), LINTER_LINT_COMMAND);

module.exports = {
  addErrorNotification,
  addInfoNotification,
  addTooltip,
  addWarningNotification,
  getAtomTabLength,
  getAtomVersion,
  getExcludedGlobs,
  getPrettierAtomConfig,
  getPrettierEslintOptions,
  getPrettierOptions,
  getJavascriptScopes,
  getTypescriptScopes,
  getCssScopes,
  getJsonScopes,
  getGraphQlScopes,
  getMarkdownScopes,
  getVueScopes,
  getAllScopes,
  getWhitelistedGlobs,
  isDisabledIfNotInPackageJson,
  isDisabledIfNoConfigFile,
  isFormatOnSaveEnabled,
  isLinterEslintAutofixEnabled,
  runLinter,
  shouldRespectEslintignore,
  shouldUseEditorConfig,
  shouldUseEslint,
  shouldUseStylelint,
  toggleFormatOnSave,
  attemptWithErrorNotification
};