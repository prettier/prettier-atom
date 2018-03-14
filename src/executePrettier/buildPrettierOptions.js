// @flow
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
  isCurrentScopeVueScope,
} = require('../editorInterface');
const { shouldUseEditorConfig, getPrettierOptions, getAtomTabLength } = require('../atomInterface');
const { getPrettierInstance } = require('../helpers');

type EditorConfigToPretterResult = {
  tabWidth?: number,
  printWidth?: number,
  useTabs?: boolean,
};

const isDefined: (x: any) => boolean = _.negate(_.isNil);

const buildEditorConfigOptions: (file: FilePath) => EditorConfigToPretterResult = _.flow(
  editorconfig.parseSync,
  editorconfigToPretter,
);

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
    editor => {
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
    },
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
