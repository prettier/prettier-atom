// @flow
const EMBEDDED_SCOPES = ['text.html.vue', 'text.html.basic'];

const getBufferRange = (editor: TextEditor) => editor.getBuffer().getRange();

const getCurrentScope = (editor: TextEditor) => editor.getGrammar().scopeName;

const isCurrentScopeEmbeddedScope = (editor: TextEditor) => EMBEDDED_SCOPES.includes(getCurrentScope(editor));

const getCurrentFilePath = (editor: TextEditor) => (editor.buffer.file ? editor.buffer.file.path : undefined);

module.exports = {
  getBufferRange,
  isCurrentScopeEmbeddedScope,
  getCurrentScope,
  getCurrentFilePath,
};
