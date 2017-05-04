// @flow
const prettierEslint = require('prettier-eslint');

const { executePrettierOnBufferRange, executePrettierOnEmbeddedScripts } = require('./executePrettier');
const textEditor = require('../tests/mocks/textEditor');
const helpers = require('./helpers');
const options = require('./options');

jest.mock('./helpers');
jest.mock('./options');
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
    options.getPrettierOptions.mockImplementation(() => ({ option: 'fake prettier option' }));
    executePrettierOnBufferRange(editor, bufferRangeFixture);

    expect(prettier.format).toHaveBeenCalledWith('untransformed text', { option: 'fake prettier option' });
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
    // $FlowFixMe
    options.shouldUseEslint.mockImplementation(() => true);
    // $FlowFixMe
    options.getPrettierEslintOptions.mockImplementation(() => ({ prettierLast: true }));
    // $FlowFixMe
    options.getPrettierOptions.mockImplementation(() => ({ semi: true }));
    // $FlowFixMe
    helpers.getCurrentFilePath.mockImplementation(() => 'foo.js');

    executePrettierOnBufferRange(editor, bufferRangeFixture);

    expect(prettierEslint).toHaveBeenCalledWith({
      filePath: 'foo.js',
      text: 'untransformed text',
      prettierLast: true,
      fallbackPrettierOptions: {
        semi: true,
      },
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
      options.shouldDisplayErrors.mockImplementation(() => true);

      executePrettierOnBufferRange(editor, bufferRangeFixture);

      expect(atom.notifications.addError).toHaveBeenCalled();
    });

    test('skips displaying an error if user chose to silence them', () => {
      // $FlowFixMe
      options.shouldDisplayErrors.mockImplementation(() => false);

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
    options.getPrettierOptions.mockImplementation(() => ({ option: 'fake prettier option' }));
    const fileBufferRange = { range: { start: { row: 0, column: 0 }, end: { row: 4, column: 5 } } };
    editor.getBuffer.mockImplementation(() => ({ getRange: () => fileBufferRange }));
    editor.backwardsScanInBufferRange.mockImplementation((regex, range, iterator) =>
      iterator(fileBufferRange),
    );

    executePrettierOnEmbeddedScripts(editor);

    expect(prettier.format).toHaveBeenCalledWith('untransformed text', { option: 'fake prettier option' });
  });
});
