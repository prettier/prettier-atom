jest.mock('prettier-eslint');
jest.mock('prettier');
jest.mock('../atomInterface');
jest.mock('../editorInterface');
jest.mock('./getPrettierInstance');
jest.mock('./buildPrettierOptions');
jest.mock('./buildPrettierEslintOptions');
jest.mock('./handleError');

const prettier = require('prettier');
const prettierEslint = require('prettier-eslint');
const { shouldUseEslint, runLinter } = require('../atomInterface');
const { getCurrentFilePath } = require('../editorInterface');
const getPrettierInstance = require('./getPrettierInstance');
const buildPrettierEslintOptions = require('./buildPrettierEslintOptions');
const buildPrettierOptions = require('./buildPrettierOptions');
const handleError = require('./handleError');
const buildMockTextEditor = require('../../tests/mocks/textEditor');
const executePrettierOnBufferRange = require('./executePrettierOnBufferRange');

let editor;
const bufferRangeFixture = { start: { column: 0, row: 0 }, end: { column: 20, row: 0 } };

beforeEach(() => {
  editor = buildMockTextEditor();
  editor.getTextInBufferRange.mockImplementation(() => 'const foo = (2);');
  prettier.format.mockImplementation(() => 'const foo = 2;');
  buildPrettierOptions.mockImplementation(() => ({ useTabs: false }));
  getPrettierInstance.mockImplementation(() => prettier);
});

it('sets the transformed text in the buffer range', () => {
  executePrettierOnBufferRange(editor, bufferRangeFixture);

  expect(prettier.format).toHaveBeenCalledWith('const foo = (2);', { useTabs: false });
  expect(editor.setTextInBufferRange).toHaveBeenCalledWith(bufferRangeFixture, 'const foo = 2;');
});

it('runs linter:lint if available to refresh linter highlighting', () => {
  executePrettierOnBufferRange(editor, bufferRangeFixture);

  expect(runLinter).toHaveBeenCalledWith(editor);
});

it('sets the cursor position back to the beginning', () => {
  const cursorPositionPriorToFormat = { start: { column: 0, row: 0 }, end: { column: 10, row: 1 } };
  editor.getCursorScreenPosition.mockImplementation(() => cursorPositionPriorToFormat);
  executePrettierOnBufferRange(editor, bufferRangeFixture);

  expect(editor.setCursorScreenPosition).toHaveBeenCalledWith(cursorPositionPriorToFormat);
});

it('transforms the given buffer range using prettier-eslint if config enables it', () => {
  shouldUseEslint.mockImplementation(() => true);
  buildPrettierEslintOptions.mockImplementation((_editor, text) => ({
    text,
    filePath: 'foo.js',
    prettierLast: true,
    fallbackPrettierOptions: { useTabs: false },
  }));
  getCurrentFilePath.mockImplementation(() => 'foo.js');

  executePrettierOnBufferRange(editor, bufferRangeFixture);

  expect(prettierEslint).toHaveBeenCalledWith({
    filePath: 'foo.js',
    text: 'const foo = (2);',
    prettierLast: true,
    fallbackPrettierOptions: {
      useTabs: false,
    },
  });
});

describe('when text in buffer range is already pretty', () => {
  beforeEach(() => {
    editor.getTextInBufferRange.mockImplementation(() => 'const foo = 2;');
  });

  it("does not change the text in the editor's buffer range", () => {
    executePrettierOnBufferRange(editor, bufferRangeFixture);

    expect(editor.setTextInBufferRange).not.toHaveBeenCalled();
  });

  it("does not change the editor's cursor position", () => {
    executePrettierOnBufferRange(editor, bufferRangeFixture);

    expect(editor.setCursorScreenPosition).not.toHaveBeenCalled();
  });
});

describe('when prettier throws an error', () => {
  const error = new Error();

  beforeEach(() => {
    prettier.format.mockImplementation(() => {
      throw error;
    });
  });

  it('handles the error', () => {
    executePrettierOnBufferRange(editor, bufferRangeFixture);

    expect(handleError).toHaveBeenCalledWith({ editor, error, bufferRange: bufferRangeFixture });
  });

  it("does not change the text in the editor's buffer range", () => {
    executePrettierOnBufferRange(editor, bufferRangeFixture);

    expect(editor.setTextInBufferRange).not.toHaveBeenCalled();
  });

  it("does not change the editor's cursor position", () => {
    executePrettierOnBufferRange(editor, bufferRangeFixture);

    expect(editor.setCursorScreenPosition).not.toHaveBeenCalled();
  });
});
