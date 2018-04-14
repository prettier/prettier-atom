'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _ = require('lodash/fp');
const editorconfig = require('editorconfig');
const editorconfigToPretter = require('editorconfig-to-prettier');
const {
  getCurrentFilePath,
  isCurrentScopeTypescriptScope,
  isCurrentScopeCssScope,
  isCurrentScopeJsonScope,
  isCurrentScopeGraphQlScope,
  isCurrentScopeMarkdownScope,
  isCurrentScopeVueScope
} = require('../editorInterface');
const { shouldUseEditorConfig, getPrettierOptions, getAtomTabLength } = require('../atomInterface');
const { getPrettierInstance } = require('../helpers');

const isDefined = _.negate(_.isNil);

const buildEditorConfigOptions = _.flow(editorconfig.parseSync, editorconfigToPretter);

const isAppropriateToBuildEditorConfigOptions = _.overEvery([isDefined, shouldUseEditorConfig]);

const buildEditorConfigOptionsIfAppropriate = _.flow(getCurrentFilePath, _.cond([[isAppropriateToBuildEditorConfigOptions, buildEditorConfigOptions]]));

const getPrettierConfigOptions = _.cond([[_.flow(getCurrentFilePath, isDefined), editor => {
  // $FlowFixMe
  const hasResolveConfigSync = isDefined(getPrettierInstance(editor).resolveConfig.sync);
  if (!hasResolveConfigSync) return null;

  // $FlowFixMe
  const resolveConfigSync = getPrettierInstance(editor).resolveConfig.sync;
  const filePath = getCurrentFilePath(editor);

  // TODO: when davidtheclark/cosmiconfig#107 is merged, this logic should
  //   be modified to treat an empty file as an empty object.
  let prettierConfig = resolveConfigSync(filePath);

  // We only want to resolve with editorconfig when a prettier configuration
  //   is found in the first place.
  if (prettierConfig && shouldUseEditorConfig()) {
    prettierConfig = resolveConfigSync(filePath, { editorconfig: true });
  }

  return prettierConfig || null;
}]]);

const getScopeSpecificSettings = editor => {
  const scopeSpecificSettings = {};

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

const getOptionsFromSettings = (editor, scopeSpecificSettings) => {
  const optionsFromSettings = getPrettierOptions();

  if (optionsFromSettings.tabWidth === 'auto') {
    optionsFromSettings.tabWidth = getAtomTabLength(editor);
  }

  return (0, _extends3.default)({}, optionsFromSettings, scopeSpecificSettings, buildEditorConfigOptionsIfAppropriate(editor));
};

const buildPrettierOptions = editor => {
  const prettierConfigOptions = getPrettierConfigOptions(editor);
  const scopeSpecificSettings = getScopeSpecificSettings(editor);

  if (prettierConfigOptions) {
    return (0, _extends3.default)({}, scopeSpecificSettings, prettierConfigOptions);
  }

  return getOptionsFromSettings(editor, scopeSpecificSettings);
};

module.exports = buildPrettierOptions;