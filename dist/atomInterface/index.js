'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
  return getConfigOption('scopes.javascript');
};

var getTypescriptScopes = function getTypescriptScopes() {
  return getConfigOption('scopes.typescript');
};

var getCssScopes = function getCssScopes() {
  return getConfigOption('scopes.css');
};

var getJsonScopes = function getJsonScopes() {
  return getConfigOption('scopes.json');
};

var getGraphQlScopes = function getGraphQlScopes() {
  return getConfigOption('scopes.graphQl');
};

var getMarkdownScopes = function getMarkdownScopes() {
  return getConfigOption('scopes.markdown');
};

var getVueScopes = function getVueScopes() {
  return getConfigOption('scopes.vue');
};

var getAllScopes = function getAllScopes() {
  return [getJavascriptScopes(), getTypescriptScopes(), getCssScopes(), getJsonScopes(), getGraphQlScopes(), getMarkdownScopes(), getVueScopes()].reduce(function (acc, els) {
    return acc.concat(els);
  });
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

var attemptWithErrorNotification = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(func) {
    for (var _len = arguments.length, args = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      args[_key - 1] = arguments[_key];
    }

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return func.apply(undefined, args);

          case 3:
            _context.next = 9;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);

            console.error(_context.t0); // eslint-disable-line no-console
            addErrorNotification(_context.t0.message, { dismissable: true, stack: _context.t0.stack });

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 5]]);
  }));

  return function attemptWithErrorNotification(_x) {
    return _ref.apply(this, arguments);
  };
}();

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
  getVueScopes: getVueScopes,
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