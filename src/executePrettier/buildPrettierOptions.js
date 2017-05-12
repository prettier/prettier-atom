// @flow
const _ = require('lodash/fp');
const { getCurrentFilePath } = require('../editorInterface');
const { shouldUseEditorConfig, getPrettierOptions, getAtomTabLength } = require('../atomInterface');
const buildEditorConfigOptions = require('./buildEditorConfigOptions');

const isDefined: (x: any) => boolean = _.negate(_.isNil);

const isAppropriateToBuildEditorConfigOptions: (filePath: FilePath) => boolean = _.overEvery([
  isDefined,
  shouldUseEditorConfig,
]);

const buildEditorConfigOptionsIfAppropriate: (editor: TextEditor) => ?{} = _.flow(
  getCurrentFilePath,
  _.cond([[isAppropriateToBuildEditorConfigOptions, buildEditorConfigOptions]]),
);

const buildPrettierOptions = (editor: TextEditor) => {
  const optionsFromSettings = getPrettierOptions();

  if (optionsFromSettings.tabWidth === 'auto') {
    optionsFromSettings.tabWidth = getAtomTabLength(editor);
  }

  return {
    ...optionsFromSettings,
    ...buildEditorConfigOptionsIfAppropriate(editor),
  };
};

module.exports = buildPrettierOptions;
