jest.mock('../executePrettier');
jest.mock('../editorInterface');
jest.mock('../linterInterface');

const textEditor = require('../../tests/mocks/textEditor');
const { executePrettierOnBufferRange, executePrettierOnEmbeddedScripts } = require('../executePrettier');
const { isCurrentScopeEmbeddedScope, getBufferRange } = require('../editorInterface');
const { clearLinterErrors } = require('../linterInterface');
const manualFormat = require('./index');

it('clears linter errors before running', () => {
  const editor = textEditor();

  manualFormat(editor);

  expect(clearLinterErrors).toHaveBeenCalledWith(editor);
});

it('executes prettier on buffer range', () => {
  const editor = textEditor();
  const bufferRange = {};
  getBufferRange.mockImplementation(() => bufferRange);

  manualFormat(editor);

  expect(executePrettierOnBufferRange).toHaveBeenCalledWith(editor, bufferRange);
});

it('executes prettier on selected buffer ranges if there is text selected', () => {
  const bufferRange = {};
  const editor = textEditor({
    getSelectedText: jest.fn(() => 'const foo = 2'),
    getSelectedBufferRanges: jest.fn(() => [{}]),
  });

  manualFormat(editor);

  expect(editor.getSelectedText).toHaveBeenCalled();
  expect(executePrettierOnBufferRange).toHaveBeenCalledWith(editor, bufferRange);
});

it('executes prettier on embedded scripts if is embedded scope', () => {
  const editor = textEditor();
  isCurrentScopeEmbeddedScope.mockImplementation(() => true);

  manualFormat(editor);

  expect(isCurrentScopeEmbeddedScope).toHaveBeenCalledWith(editor);
  expect(executePrettierOnEmbeddedScripts).toHaveBeenCalledWith(editor);
});
