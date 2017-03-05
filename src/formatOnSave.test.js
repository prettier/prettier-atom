// @flow
const helpers = require('./helpers');
const formatOnSave = require('./formatOnSave');
const textEditor = require('../tests/mocks/textEditor');
const { executePrettierOnBufferRange, executePrettierOnEmbeddedScripts } = require('./executePrettier');

jest.mock('./executePrettier');
jest.mock('./helpers');

let editor;
const filePathFixture = 'foo.js';
const rangeFixture = {};

beforeEach(() => {
  editor = textEditor();

  // Defaults for running on buffer range
  // $FlowFixMe
  helpers.isFormatOnSaveEnabled.mockImplementation(() => true);
  // $FlowFixMe
  helpers.getConfigOption.mockImplementation(() => true);
  // $FlowFixMe
  helpers.isInScope.mockImplementation(() => true);
  // $FlowFixMe
  helpers.isFilePathEslintignored.mockImplementation(() => false);
  // $FlowFixMe
  helpers.isCurrentScopeEmbeddedScope.mockImplementation(() => false);
  editor.getBuffer.mockImplementation(() => ({ getRange: jest.fn(() => rangeFixture) }));
});

test('it executes prettier on buffer range', () => {
  formatOnSave(editor, filePathFixture);

  expect(executePrettierOnBufferRange).toHaveBeenCalledWith(editor, rangeFixture);
});

test('it executes prettier on embedded scripts if scope is an embedded scope', () => {
  // $FlowFixMe
  helpers.isCurrentScopeEmbeddedScope.mockImplementation(() => true);

  formatOnSave(editor, filePathFixture);

  expect(executePrettierOnEmbeddedScripts).toHaveBeenCalledWith(editor);
});

test('it does nothing if formatOnSave is not enabled', () => {
  // $FlowFixMe
  helpers.isFormatOnSaveEnabled.mockImplementation(() => false);

  formatOnSave(editor, filePathFixture);

  expect(helpers.isFormatOnSaveEnabled).toHaveBeenCalled();
  expect(executePrettierOnBufferRange).not.toHaveBeenCalled();
  expect(executePrettierOnEmbeddedScripts).not.toHaveBeenCalled();
});

test('it does nothing if not a valid scope according to config', () => {
  // $FlowFixMe
  helpers.isInScope.mockImplementation(() => false);

  formatOnSave(editor, filePathFixture);

  expect(helpers.isInScope).toHaveBeenCalled();
  expect(executePrettierOnBufferRange).not.toHaveBeenCalled();
  expect(executePrettierOnEmbeddedScripts).not.toHaveBeenCalled();
});

test('it does nothing if config says to respectEslintignore and file is matched by eslintignore', () => {
  // $FlowFixMe
  helpers.shouldRespectEslintignore.mockImplementation(() => true);
  // $FlowFixMe
  helpers.isFilePathEslintignored.mockImplementation(() => true);

  formatOnSave(editor, filePathFixture);

  expect(helpers.shouldRespectEslintignore).toHaveBeenCalled();
  expect(helpers.isFilePathEslintignored).toHaveBeenCalledWith('foo.js');
  expect(executePrettierOnBufferRange).not.toHaveBeenCalled();
  expect(executePrettierOnEmbeddedScripts).not.toHaveBeenCalled();
});
