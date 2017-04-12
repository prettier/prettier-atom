// @flow
const prettierEslint = require('prettier-eslint');

const { executePrettierOnBufferRange, executePrettierOnEmbeddedScripts } = require('./executePrettier');
const textEditor = require('../tests/mocks/textEditor');
const helpers = require('./helpers');

jest.mock('./helpers');
jest.mock('prettier-eslint');

let editor;
const bufferRangeFixture = { start: { column: 0, row: 0 }, end: { column: 20, row: 0 } };

const prettier = { format: jest.fn(() => 'some transformed text') };

beforeEach(() => {
  // $FlowFixMe
  helpers.getPrettier.mockImplementation(() => prettier);
  prettier.format.mockImplementation(() => 'some transformed text');
  prettierEslint.mockImplementation(() => 'some transformed text');
  editor = textEditor({ getTextInBufferRange: jest.fn(() => 'untransformed text') });
});

describe('executePrettierOnBufferRange()', () => {
  test('transforms the given buffer range using prettier', () => {
    // $FlowFixMe
    helpers.getPrettierOptions.mockImplementation(() => 'fake prettier options');
    executePrettierOnBufferRange(editor, bufferRangeFixture);

    expect(prettier.format).toHaveBeenCalledWith('untransformed text', 'fake prettier options');
  });

  test('sets the transformed text in the buffer range', () => {
    executePrettierOnBufferRange(editor, bufferRangeFixture);

    expect(editor.setTextInBufferRange).toHaveBeenCalledWith(bufferRangeFixture, 'some transformed text');
  });

  test('sets the cursor position back to the beginning', () => {
    const startCursorScreenPosition = { column: 5, row: 0 };
    editor.getCursorScreenPosition.mockImplementation(() => startCursorScreenPosition);

    executePrettierOnBufferRange(editor, bufferRangeFixture);

    expect(editor.setCursorScreenPosition).toHaveBeenCalledWith(startCursorScreenPosition);
  });

  test('runs linter:lint if available to refresh linter highlighting', () => {
    executePrettierOnBufferRange(editor, bufferRangeFixture);

    expect(helpers.runLinter).toHaveBeenCalled();
  });

  test('transforms the given buffer range using prettier-eslint if config enables it', () => {
    // $FlowFixMe
    helpers.shouldUseEslint.mockImplementation(() => true);
    // $FlowFixMe
    helpers.getCurrentFilePath.mockImplementation(() => 'foo.js');

    executePrettierOnBufferRange(editor, bufferRangeFixture);

    expect(prettierEslint).toHaveBeenCalledWith({ filePath: 'foo.js', text: 'untransformed text' });
  });

  test('passes prettierLast option to prettier-eslint', () => {
    // $FlowFixMe
    helpers.shouldUseEslint.mockImplementation(() => true);
    // $FlowFixMe
    helpers.getCurrentFilePath.mockImplementation(() => 'foo.js');
    // $FlowFixMe
    helpers.getPrettierEslintOptions.mockImplementation(() => ({ prettierLast: true }));

    executePrettierOnBufferRange(editor, bufferRangeFixture);

    expect(prettierEslint).toHaveBeenCalledWith({
      prettierLast: true,
      filePath: 'foo.js',
      text: 'untransformed text',
    });
  });

  describe('when text in buffer range is already pretty', () => {
    beforeEach(() => {
      prettier.format.mockImplementation(() => 'untransformed text');
    });

    test("does not change the text in the editor's buffer range", () => {
      executePrettierOnBufferRange(editor, bufferRangeFixture);

      expect(editor.setTextInBufferRange).not.toHaveBeenCalled();
    });

    test("does not change the editor's cursor position", () => {
      executePrettierOnBufferRange(editor, bufferRangeFixture);

      expect(editor.setCursorScreenPosition).not.toHaveBeenCalled();
    });
  });

  describe('when prettier throws an error', () => {
    beforeEach(() => {
      prettier.format.mockImplementation(() => {
        throw new Error();
      });
      atom = { notifications: { addError: jest.fn() } };
    });

    test('displays an error', () => {
      // $FlowFixMe
      helpers.shouldDisplayErrors.mockImplementation(() => true);

      executePrettierOnBufferRange(editor, bufferRangeFixture);

      expect(atom.notifications.addError).toHaveBeenCalled();
    });

    test('skips displaying an error if user chose to silence them', () => {
      // $FlowFixMe
      helpers.shouldDisplayErrors.mockImplementation(() => false);

      executePrettierOnBufferRange(editor, bufferRangeFixture);

      expect(atom.notifications.addError).not.toHaveBeenCalled();
    });

    test("does not change the text in the editor's buffer range", () => {
      executePrettierOnBufferRange(editor, bufferRangeFixture);

      expect(editor.setTextInBufferRange).not.toHaveBeenCalled();
    });

    test("does not change the editor's cursor position", () => {
      executePrettierOnBufferRange(editor, bufferRangeFixture);

      expect(editor.setCursorScreenPosition).not.toHaveBeenCalled();
    });
  });
});

describe('executePrettierOnEmbeddedScripts()', () => {
  test('finds embedded scripts in buffer and transforms each', () => {
    // $FlowFixMe
    helpers.getPrettierOptions.mockImplementation(() => 'fake prettier options');
    const fileBufferRange = { range: { start: { row: 0, column: 0 }, end: { row: 4, column: 5 } } };
    editor.getBuffer.mockImplementation(() => ({ getRange: () => fileBufferRange }));
    editor.backwardsScanInBufferRange.mockImplementation((regex, range, iterator) =>
      iterator(fileBufferRange));

    executePrettierOnEmbeddedScripts(editor);

    expect(prettier.format).toHaveBeenCalledWith('untransformed text', 'fake prettier options');
  });
});
