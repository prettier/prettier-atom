'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ = require('lodash/fp');

var _require = require('../editorInterface'),
    getCurrentFilePath = _require.getCurrentFilePath,
    isCurrentScopeTypescriptScope = _require.isCurrentScopeTypescriptScope,
    isCurrentScopeCssScope = _require.isCurrentScopeCssScope,
    isCurrentScopeJsonScope = _require.isCurrentScopeJsonScope,
    isCurrentScopeGraphQlScope = _require.isCurrentScopeGraphQlScope;

var _require2 = require('../atomInterface'),
    shouldUseEditorConfig = _require2.shouldUseEditorConfig,
    getPrettierOptions = _require2.getPrettierOptions,
    getAtomTabLength = _require2.getAtomTabLength;

var buildEditorConfigOptions = require('./buildEditorConfigOptions');

var isDefined = _.negate(_.isNil);

var isAppropriateToBuildEditorConfigOptions = _.overEvery([isDefined, shouldUseEditorConfig]);

var buildEditorConfigOptionsIfAppropriate = _.flow(getCurrentFilePath, _.cond([[isAppropriateToBuildEditorConfigOptions, buildEditorConfigOptions]]));

var buildPrettierOptions = function buildPrettierOptions(editor) {
  var optionsFromSettings = getPrettierOptions();

  if (optionsFromSettings.tabWidth === 'auto') {
    optionsFromSettings.tabWidth = getAtomTabLength(editor);
  }

  if (isCurrentScopeTypescriptScope(editor)) {
    optionsFromSettings.parser = 'typescript';
  }

  if (isCurrentScopeCssScope(editor)) {
    optionsFromSettings.parser = 'postcss';
  }

  if (isCurrentScopeJsonScope(editor)) {
    optionsFromSettings.parser = 'json';
    optionsFromSettings.trailingComma = 'none';
  }

  if (isCurrentScopeGraphQlScope(editor)) {
    optionsFromSettings.parser = 'graphql';
  }

  return _extends({}, optionsFromSettings, buildEditorConfigOptionsIfAppropriate(editor));
};

module.exports = buildPrettierOptions;