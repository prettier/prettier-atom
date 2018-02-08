'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash/fp');

var _require = require('../editorInterface'),
    getCurrentFilePath = _require.getCurrentFilePath,
    isCurrentScopeTypescriptScope = _require.isCurrentScopeTypescriptScope,
    isCurrentScopeCssScope = _require.isCurrentScopeCssScope,
    isCurrentScopeJsonScope = _require.isCurrentScopeJsonScope,
    isCurrentScopeGraphQlScope = _require.isCurrentScopeGraphQlScope,
    isCurrentScopeMarkdownScope = _require.isCurrentScopeMarkdownScope,
    isCurrentScopeVueScope = _require.isCurrentScopeVueScope;

var _require2 = require('../atomInterface'),
    shouldUseEditorConfig = _require2.shouldUseEditorConfig,
    getPrettierOptions = _require2.getPrettierOptions,
    getAtomTabLength = _require2.getAtomTabLength;

var buildEditorConfigOptions = require('./buildEditorConfigOptions');

var _require3 = require('../helpers'),
    getPrettierInstance = _require3.getPrettierInstance;

var isDefined = _.negate(_.isNil);

var isAppropriateToBuildEditorConfigOptions = _.overEvery([isDefined, shouldUseEditorConfig]);

var buildEditorConfigOptionsIfAppropriate = _.flow(getCurrentFilePath, _.cond([[isAppropriateToBuildEditorConfigOptions, buildEditorConfigOptions]]));

var getPrettierConfigOptions = _.cond([[_.flow(getCurrentFilePath, isDefined), function (editor) {
  return isDefined(getPrettierInstance(editor).resolveConfig.sync) ? getPrettierInstance(editor).resolveConfig.sync(getCurrentFilePath(editor), {
    editorconfig: shouldUseEditorConfig()
  }) : null;
}]]);

var getScopeSpecificSettings = function getScopeSpecificSettings(editor) {
  var scopeSpecificSettings = {};

  if (isCurrentScopeTypescriptScope(editor)) {
    scopeSpecificSettings.parser = 'typescript';
  }

  if (isCurrentScopeCssScope(editor)) {
    scopeSpecificSettings.parser = 'postcss';
  }

  if (isCurrentScopeJsonScope(editor)) {
    scopeSpecificSettings.parser = 'json';
    scopeSpecificSettings.trailingComma = 'none';
  }

  if (isCurrentScopeGraphQlScope(editor)) {
    scopeSpecificSettings.parser = 'graphql';
  }

  if (isCurrentScopeMarkdownScope(editor)) {
    scopeSpecificSettings.parser = 'markdown';
  }

  if (isCurrentScopeVueScope(editor)) {
    scopeSpecificSettings.parser = 'vue';
  }

  return scopeSpecificSettings;
};

var getOptionsFromSettings = function getOptionsFromSettings(editor, scopeSpecificSettings) {
  var optionsFromSettings = getPrettierOptions();

  if (optionsFromSettings.tabWidth === 'auto') {
    optionsFromSettings.tabWidth = getAtomTabLength(editor);
  }

  return (0, _extends3.default)({}, optionsFromSettings, scopeSpecificSettings, buildEditorConfigOptionsIfAppropriate(editor));
};

var buildPrettierOptions = function buildPrettierOptions(editor) {
  var prettierConfigOptions = getPrettierConfigOptions(editor);
  var scopeSpecificSettings = getScopeSpecificSettings(editor);

  if (prettierConfigOptions) {
    return (0, _extends3.default)({}, scopeSpecificSettings, prettierConfigOptions);
  }

  return getOptionsFromSettings(editor, scopeSpecificSettings);
};

module.exports = buildPrettierOptions;