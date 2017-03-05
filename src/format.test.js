// @flow
/* eslint-disable global-require */
const textEditor = require('../tests/mocks/textEditor');
const format = require('./format');
const { executePrettierOnBufferRange, executePrettierOnEmbeddedScripts } = require('./executePrettier');
const helpers = require('./helpers');

jest.mock('./executePrettier');
jest.mock('./helpers');

let editor;

beforeEach(() => {
  editor = textEditor();
  atom = {};
});

test('executes prettier on selected buffer ranges if there is text selected', () => {
  const bufferRange = {};
  editor.getSelectedText.mockImplementation(() => 'some selected text');
  editor.getSelectedBufferRanges.mockImplementation(() => [{}]);

  format(editor);

  expect(editor.getSelectedText).toHaveBeenCalled();
  expect(executePrettierOnBufferRange).toHaveBeenCalledWith(editor, bufferRange);
});

test('executes prettier on embedded scripts if is embedded scope', () => {
  // $FlowFixMe
  helpers.isCurrentScopeEmbeddedScope.mockImplementation(() => true);

  format(editor);

  expect(helpers.isCurrentScopeEmbeddedScope).toHaveBeenCalledWith(editor);
  expect(executePrettierOnEmbeddedScripts).toHaveBeenCalledWith(editor);
});

test('executes prettier on buffer range', () => {
  // $FlowFixMe
  helpers.isCurrentScopeEmbeddedScope.mockImplementation(() => false);
  const bufferRange = {};
  editor.getBuffer.mockImplementation(() => ({ getRange: () => bufferRange }));

  format(editor);

  expect(executePrettierOnBufferRange).toHaveBeenCalledWith(editor, bufferRange);
});
