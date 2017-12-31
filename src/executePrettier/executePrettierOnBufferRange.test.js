jest.mock('prettier-eslint');
jest.mock('prettier-stylelint');
jest.mock('prettier');
jest.mock('../atomInterface');
jest.mock('../editorInterface');
jest.mock('../helpers');
jest.mock('./buildPrettierOptions');
jest.mock('./buildPrettierEslintOptions');
jest.mock('./buildPrettierStylelintOptions');
jest.mock('./handleError');

const prettier = require('prettier');
const prettierEslint = require('prettier-eslint');
const prettierStylelint = require('prettier-stylelint');
const { shouldUseEslint, shouldUseStylelint, runLinter } = require('../atomInterface');
const { getCurrentFilePath, isCurrentScopeCssScope } = require('../editorInterface');
const { getPrettierInstance } = require('../helpers');
const buildPrettierEslintOptions = require('./buildPrettierEslintOptions');
const buildPrettierStylelintOptions = require('./buildPrettierStylelintOptions');
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

it('sets the transformed text in the buffer range', async () => {
  await executePrettierOnBufferRange(editor, bufferRangeFixture);

  expect(prettier.format).toHaveBeenCalledWith('const foo = (2);', { useTabs: false });
  expect(editor.setTextInBufferRange).toHaveBeenCalledWith(bufferRangeFixture, 'const foo = 2;');
});

it('sets the transformed text via diff when the option is passed', async () => {
  const setTextViaDiffMock = jest.fn();
  editor.getBuffer.mockImplementation(() => ({
    getRange: () => ({ isEqual: () => true }),
    setTextViaDiff: setTextViaDiffMock,
  }));

  await executePrettierOnBufferRange(editor, bufferRangeFixture, { setTextViaDiff: true });

  expect(prettier.format).toHaveBeenCalledWith('const foo = (2);', { useTabs: false });
  expect(setTextViaDiffMock).toHaveBeenCalledWith('const foo = 2;');
});

it('runs linter:lint if available to refresh linter highlighting', async () => {
  await executePrettierOnBufferRange(editor, bufferRangeFixture);

  expect(runLinter).toHaveBeenCalledWith(editor);
});

it('sets the cursor position back to the beginning', async () => {
  const cursorPositionPriorToFormat = { start: { column: 0, row: 0 }, end: { column: 10, row: 1 } };
  editor.getCursorScreenPosition.mockImplementation(() => cursorPositionPriorToFormat);
  await executePrettierOnBufferRange(editor, bufferRangeFixture);

  expect(editor.setCursorScreenPosition).toHaveBeenCalledWith(cursorPositionPriorToFormat);
});

it('transforms the given buffer range using prettier-eslint if config enables it', async () => {
  shouldUseEslint.mockImplementation(() => true);

  const options = {
    filePath: 'foo.js',
    prettierLast: true,
    fallbackPrettierOptions: { useTabs: false },
  };

  buildPrettierEslintOptions.mockImplementation((_editor, text) => ({
    text,
    ...options,
  }));
  getCurrentFilePath.mockImplementation(() => 'foo.js');

  await executePrettierOnBufferRange(editor, bufferRangeFixture);

  expect(prettierEslint).toHaveBeenCalledWith({
    text: 'const foo = (2);',
    ...options,
  });
});

it('transforms the given buffer range using prettier-stylelint if scope is CSS and config enables it', async () => {
  isCurrentScopeCssScope.mockImplementation(() => true);
  shouldUseStylelint.mockImplementation(() => true);

  const options = {
    filePath: 'foo.js',
    prettierOptions: { useTabs: false },
  };

  buildPrettierStylelintOptions.mockImplementation((_editor, text) => ({
    text,
    ...options,
  }));
  getCurrentFilePath.mockImplementation(() => 'foo.css');

  await executePrettierOnBufferRange(editor, bufferRangeFixture);

  expect(prettierStylelint.format).toHaveBeenCalledWith({
    text: 'const foo = (2);',
    ...options,
  });
});

describe('when text in buffer range is already pretty', () => {
  beforeEach(() => {
    editor.getTextInBufferRange.mockImplementation(() => 'const foo = 2;');
  });

  it("does not change the text in the editor's buffer range", async () => {
    await executePrettierOnBufferRange(editor, bufferRangeFixture);

    expect(editor.setTextInBufferRange).not.toHaveBeenCalled();
  });

  it("does not change the editor's cursor position", async () => {
    await executePrettierOnBufferRange(editor, bufferRangeFixture);

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

  it('handles the error', async () => {
    await executePrettierOnBufferRange(editor, bufferRangeFixture);

    expect(handleError).toHaveBeenCalledWith({ editor, error, bufferRange: bufferRangeFixture });
  });

  it("does not change the text in the editor's buffer range", async () => {
    await executePrettierOnBufferRange(editor, bufferRangeFixture);

    expect(editor.setTextInBufferRange).not.toHaveBeenCalled();
  });

  it("does not change the editor's cursor position", async () => {
    await executePrettierOnBufferRange(editor, bufferRangeFixture);

    expect(editor.setCursorScreenPosition).not.toHaveBeenCalled();
  });
});
