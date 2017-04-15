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
  // $FlowFixMe
  helpers.getCurrentFilePath.mockImplementation(() => filePathFixture);
  editor.getBuffer.mockImplementation(() => ({ getRange: jest.fn(() => rangeFixture) }));
});

test('it executes prettier on buffer range', () => {
  formatOnSave(editor);

  expect(executePrettierOnBufferRange).toHaveBeenCalledWith(editor, rangeFixture);
});

test('it executes prettier on buffer range if file is whitelisted regardless of exclusions or scopes', () => {
  // $FlowFixMe
  helpers.isWhitelistProvided.mockImplementation(() => true);
  // $FlowFixMe
  helpers.isInScope.mockImplementation(() => false);
  // $FlowFixMe
  helpers.isFilePathExcluded.mockImplementation(() => true);
  // $FlowFixMe
  helpers.isFilePathWhitelisted.mockImplementation(() => true);

  formatOnSave(editor);

  expect(executePrettierOnBufferRange).toHaveBeenCalledWith(editor, rangeFixture);
});

test('it does not execute prettier if whitelist is provided and file is not whitelisted', () => {
  // $FlowFixMe
  helpers.isWhitelistProvided.mockImplementation(() => true);
  // $FlowFixMe
  helpers.isInScope.mockImplementation(() => true);
  // $FlowFixMe
  helpers.isFilePathExcluded.mockImplementation(() => false);
  // $FlowFixMe
  helpers.isFilePathWhitelisted.mockImplementation(() => false);

  formatOnSave(editor);

  expect(executePrettierOnBufferRange).toHaveBeenCalledTimes(0);
});

test('it executes prettier on embedded scripts if scope is an embedded scope', () => {
  // $FlowFixMe
  helpers.isCurrentScopeEmbeddedScope.mockImplementation(() => true);

  formatOnSave(editor);

  expect(executePrettierOnEmbeddedScripts).toHaveBeenCalledWith(editor);
});

test('it does nothing if formatOnSave is not enabled', () => {
  // $FlowFixMe
  helpers.isFormatOnSaveEnabled.mockImplementation(() => false);

  formatOnSave(editor);

  expect(helpers.isFormatOnSaveEnabled).toHaveBeenCalled();
  expect(executePrettierOnBufferRange).not.toHaveBeenCalled();
  expect(executePrettierOnEmbeddedScripts).not.toHaveBeenCalled();
});

test('it does nothing if file is saved for the first time', () => {
  // $FlowFixMe
  helpers.getCurrentFilePath.mockImplementation(() => undefined);

  formatOnSave(editor);

  expect(helpers.isFormatOnSaveEnabled).toHaveBeenCalled();
  expect(helpers.getCurrentFilePath).toHaveBeenCalled();
  expect(executePrettierOnBufferRange).not.toHaveBeenCalled();
  expect(executePrettierOnEmbeddedScripts).not.toHaveBeenCalled();
});

test('it does nothing if not a valid scope according to config', () => {
  // $FlowFixMe
  helpers.isInScope.mockImplementation(() => false);

  formatOnSave(editor);

  expect(helpers.isInScope).toHaveBeenCalled();
  expect(executePrettierOnBufferRange).not.toHaveBeenCalled();
  expect(executePrettierOnEmbeddedScripts).not.toHaveBeenCalled();
});

test('it does nothing if filePath matches an excluded glob', () => {
  // $FlowFixMe
  helpers.isFilePathExcluded.mockImplementation(() => true);

  formatOnSave(editor);

  expect(helpers.isFilePathExcluded).toHaveBeenCalled();
  expect(executePrettierOnBufferRange).not.toHaveBeenCalled();
  expect(executePrettierOnEmbeddedScripts).not.toHaveBeenCalled();
});

test('it does nothing if config says to respectEslintignore and file is matched by eslintignore', () => {
  // $FlowFixMe
  helpers.getCurrentFilePath.mockImplementation(() => filePathFixture);
  // $FlowFixMe
  helpers.shouldRespectEslintignore.mockImplementation(() => true);
  // $FlowFixMe
  helpers.isFilePathEslintignored.mockImplementation(() => true);

  formatOnSave(editor);

  expect(helpers.shouldRespectEslintignore).toHaveBeenCalled();
  expect(helpers.isFilePathEslintignored).toHaveBeenCalledWith('foo.js');
  expect(executePrettierOnBufferRange).not.toHaveBeenCalled();
  expect(executePrettierOnEmbeddedScripts).not.toHaveBeenCalled();
});

test('does not attempt to check filePath matches .eslintignore if `currentFilePath` is null', () => {
  // $FlowFixMe
  helpers.getCurrentFilePath.mockImplementation(() => null);

  formatOnSave(editor);

  expect(helpers.shouldRespectEslintignore).not.toHaveBeenCalled();
});
