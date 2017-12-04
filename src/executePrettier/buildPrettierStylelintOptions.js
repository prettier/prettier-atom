// @flow
const buildPrettierOptions = require('./buildPrettierOptions');
const { getCurrentFilePath } = require('../editorInterface');

const buildPrettierStylelintOptions = (editor: TextEditor, text: string) => ({
  text,
  prettierOptions: buildPrettierOptions(editor),
  filePath: getCurrentFilePath(editor),
});

module.exports = buildPrettierStylelintOptions;
