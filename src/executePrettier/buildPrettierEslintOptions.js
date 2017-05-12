// @flow
const buildPrettierOptions = require('./buildPrettierOptions');
const { getPrettierEslintOptions } = require('../atomInterface');
const { getCurrentFilePath } = require('../editorInterface');

const buildPrettierEslintOptions = (editor: TextEditor, text: string) => ({
  text,
  ...getPrettierEslintOptions(),
  fallbackPrettierOptions: buildPrettierOptions(editor),
  filePath: getCurrentFilePath(editor),
});

module.exports = buildPrettierEslintOptions;
