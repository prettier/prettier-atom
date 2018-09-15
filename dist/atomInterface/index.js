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

const shouldUseTslint = () => getConfigOption('useTslint');

const shouldUseStylelint = () => getConfigOption('useStylelint');

const isFormatOnSaveEnabled = () => getConfigOption('formatOnSaveOptions.enabled');

const isDisabledIfNotInPackageJson = () => getConfigOption('formatOnSaveOptions.isDisabledIfNotInPackageJson');

const isDisabledIfNoConfigFile = () => getConfigOption('formatOnSaveOptions.isDisabledIfNoConfigFile');

const shouldRespectEslintignore = () => getConfigOption('formatOnSaveOptions.respectEslintignore');

const shouldRespectTslintignore = () => getConfigOption('formatOnSaveOptions.respectTslintignore');

const toggleFormatOnSave = () => setConfigOption('formatOnSaveOptions.enabled', !isFormatOnSaveEnabled());

const getPrettierEslintOptions = () => getConfigOption('prettierEslintOptions');

const getPrettierTslintOptions = () => getConfigOption('prettierTslintOptions');

const getAtomVersion = () => atom.getVersion();

const getPrettierAtomConfig = () => atom.config.get('prettier-atom');

const getWhitelistedGlobs = () => getConfigOption('formatOnSaveOptions.whitelistedGlobs');

const getExcludedGlobs = () => getConfigOption('formatOnSaveOptions.excludedGlobs');

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
  getAtomVersion,
  getPrettierAtomConfig,
  getPrettierEslintOptions,
  getPrettierTslintOptions,
  getWhitelistedGlobs,
  getExcludedGlobs,
  isDisabledIfNotInPackageJson,
  isDisabledIfNoConfigFile,
  isFormatOnSaveEnabled,
  isLinterEslintAutofixEnabled,
  runLinter,
  shouldRespectEslintignore,
  shouldRespectTslintignore,
  shouldUseEslint,
  shouldUseTslint,
  shouldUseStylelint,
  toggleFormatOnSave,
  attemptWithErrorNotification
};