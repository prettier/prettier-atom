jest.mock('../executePrettier');
jest.mock('../editorInterface');

const textEditor = require('../../tests/mocks/textEditor');
const { executePrettierOnBufferRange, executePrettierOnEmbeddedScripts } = require('../executePrettier');
const { isCurrentScopeEmbeddedScope, getBufferRange } = require('../editorInterface');
const manualFormat = require('./index');

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
