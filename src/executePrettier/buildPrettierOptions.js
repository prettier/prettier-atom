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
        ? getPrettierInstance(editor).resolveConfig.sync(getCurrentFilePath(editor))
        : null,
  ],
]);

const buildPrettierOptions = (editor: TextEditor) => {
  const optionsFromSettings = getPrettierOptions();

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

  if (isCurrentScopeMarkdownScope(editor)) {
    optionsFromSettings.parser = 'markdown';
  }

  if (isCurrentScopeVueScope(editor)) {
    optionsFromSettings.parser = 'vue';
  }

  return {
    ...optionsFromSettings,
    ...buildEditorConfigOptionsIfAppropriate(editor),
    ...getPrettierConfigOptions(editor),
  };
};

module.exports = buildPrettierOptions;
