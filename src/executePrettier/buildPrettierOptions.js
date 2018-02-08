// @flow
const _ = require('lodash/fp');
const {
  getCurrentFilePath,
  isCurrentScopeTypescriptScope,
  isCurrentScopeCssScope,
  isCurrentScopeJsonScope,
  isCurrentScopeGraphQlScope,
  isCurrentScopeMarkdownScope,
  isCurrentScopeVueScope,
} = require('../editorInterface');
const { shouldUseEditorConfig, getPrettierOptions, getAtomTabLength } = require('../atomInterface');
const buildEditorConfigOptions = require('./buildEditorConfigOptions');
const { getPrettierInstance } = require('../helpers');

const isDefined: (x: any) => boolean = _.negate(_.isNil);

const isAppropriateToBuildEditorConfigOptions: (filePath: FilePath) => boolean = _.overEvery([
  isDefined,
  shouldUseEditorConfig,
]);

const buildEditorConfigOptionsIfAppropriate: (editor: TextEditor) => ?{} = _.flow(
  getCurrentFilePath,
  _.cond([[isAppropriateToBuildEditorConfigOptions, buildEditorConfigOptions]]),
);

const getPrettierConfigOptions: (editor: TextEditor) => ?{} = _.cond([
  [
    _.flow(getCurrentFilePath, isDefined),
    editor =>
      isDefined(getPrettierInstance(editor).resolveConfig.sync)
        ? getPrettierInstance(editor).resolveConfig.sync(getCurrentFilePath(editor), {
            editorconfig: shouldUseEditorConfig(),
          })
        : null,
  ],
]);

const getScopeSpecificSettings = (editor: TextEditor) => {
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

const getOptionsFromSettings = (editor: TextEditor, scopeSpecificSettings: Object) => {
  const optionsFromSettings = getPrettierOptions();

  if (optionsFromSettings.tabWidth === 'auto') {
    optionsFromSettings.tabWidth = getAtomTabLength(editor);
  }

  return {
    ...optionsFromSettings,
    ...scopeSpecificSettings,
    ...buildEditorConfigOptionsIfAppropriate(editor),
  };
};

const buildPrettierOptions = (editor: TextEditor) => {
  const prettierConfigOptions = getPrettierConfigOptions(editor);
  const scopeSpecificSettings = getScopeSpecificSettings(editor);

  if (prettierConfigOptions) {
    return {
      ...scopeSpecificSettings,
      ...prettierConfigOptions,
    };
  }

  return getOptionsFromSettings(editor, scopeSpecificSettings);
};

module.exports = buildPrettierOptions;
