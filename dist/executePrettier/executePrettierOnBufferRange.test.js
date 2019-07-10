"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { keys.push.apply(keys, Object.getOwnPropertySymbols(object)); } if (enumerableOnly) keys = keys.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

jest.mock('prettier-eslint');
jest.mock('prettier-stylelint');
jest.mock('prettier');
jest.mock('../atomInterface');
jest.mock('../editorInterface');
jest.mock('../helpers');
jest.mock('./handleError');

const prettier = require('prettier');

const prettierEslint = require('prettier-eslint');

const prettierStylelint = require('prettier-stylelint');

const {
  getPrettierEslintOptions,
  shouldUseEslint,
  shouldUseStylelint,
  runLinter
} = require('../atomInterface');

const {
  getCurrentFilePath,
  isCurrentScopeStyleLintScope
} = require('../editorInterface');

const {
  getPrettierInstance
} = require('../helpers');

const handleError = require('./handleError');

const buildMockTextEditor = require('../../tests/mocks/textEditor');

const executePrettierOnBufferRange = require('./executePrettierOnBufferRange');

let editor;
const bufferRangeFixture = {
  start: {
    column: 0,
    row: 0
  },
  end: {
    column: 20,
    row: 0
  }
};
const sourceFixture = 'const foo = (2);';
const formattedFixture = 'const foo = 2;';
const optionsFixture = {
  tabWidth: 2,
  filepath: 'foo.js'
};
beforeEach(() => {
  editor = buildMockTextEditor();
  editor.getTextInBufferRange.mockImplementation(() => sourceFixture);
  editor.getCursorBufferPosition.mockImplementation(() => ({
    column: 0,
    row: 0
  }));
  prettier.format.mockImplementation(() => formattedFixture);
  prettier.formatWithCursor.mockImplementation(() => formattedFixture);
  getPrettierInstance.mockImplementation(() => prettier);
  prettier.resolveConfig.sync.mockImplementation(() => optionsFixture);
});
it('sets the transformed text in the buffer range',
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(function* () {
  yield executePrettierOnBufferRange(editor, bufferRangeFixture);
  expect(editor.setTextInBufferRange).toHaveBeenCalled(); // NOTE: there is currently a bug in prettier that causes formatWithCursor to
  // only return the formatted text when running in test environment, but works
  // as expected when in production.
  // expect(editor.setTextInBufferRange).toHaveBeenCalledWith(bufferRangeFixture, formattedFixture);
}));
it('uses Prettier#formatWithCursor',
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(function* () {
  const cursorOffset = 10;
  editor.getBuffer.mockImplementation(() => ({
    getRange: () => ({
      isEqual: () => true
    }),
    characterIndexForPosition: jest.fn(() => cursorOffset),
    positionForCharacterIndex: jest.fn(() => ({
      row: 0,
      column: 0
    }))
  }));
  yield executePrettierOnBufferRange(editor, bufferRangeFixture);
  expect(prettier.formatWithCursor).toHaveBeenCalledWith(sourceFixture, _objectSpread({
    cursorOffset
  }, optionsFixture));
}));
it('sets the transformed text via diff when the option is passed',
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(function* () {
  const setTextViaDiffMock = jest.fn();
  editor.getBuffer.mockImplementation(() => ({
    getRange: () => ({
      isEqual: () => true
    }),
    characterIndexForPosition: jest.fn(() => 0),
    positionForCharacterIndex: jest.fn(() => ({
      row: 0,
      column: 0
    })),
    setTextViaDiff: setTextViaDiffMock
  }));
  yield executePrettierOnBufferRange(editor, bufferRangeFixture, {
    setTextViaDiff: true
  });
  expect(prettier.formatWithCursor).toHaveBeenCalledWith(sourceFixture, _objectSpread({
    cursorOffset: 0
  }, optionsFixture));
  expect(setTextViaDiffMock).toHaveBeenCalled(); // NOTE: there is currently a bug in prettier that causes formatWithCursor to
  // only return the formatted text when running in test environment, but works
  // as expected when in production.
  // expect(setTextViaDiffMock).toHaveBeenCalledWith(formattedFixture);
}));
it('runs linter:lint if available to refresh linter highlighting',
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(function* () {
  yield executePrettierOnBufferRange(editor, bufferRangeFixture);
  expect(runLinter).toHaveBeenCalledWith(editor);
}));
it('transforms the given buffer range using prettier-eslint if config enables it',
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(function* () {
  shouldUseEslint.mockImplementation(() => true);
  const prettierLast = true;
  getPrettierEslintOptions.mockImplementation(() => ({
    prettierLast
  }));
  getCurrentFilePath.mockImplementation(() => 'foo.js');
  yield executePrettierOnBufferRange(editor, bufferRangeFixture);
  expect(prettierEslint).toHaveBeenCalledWith({
    filePath: 'foo.js',
    prettierLast,
    text: sourceFixture
  });
}));
it('transforms the given buffer range using prettier-stylelint if scope is CSS and config enables it',
/*#__PURE__*/
(0, _asyncToGenerator2["default"])(function* () {
  isCurrentScopeStyleLintScope.mockImplementation(() => true);
  shouldUseStylelint.mockImplementation(() => true);
  const filePath = 'foo.js';
  getCurrentFilePath.mockImplementation(() => filePath);
  yield executePrettierOnBufferRange(editor, bufferRangeFixture);
  expect(prettierStylelint.format).toHaveBeenCalledWith({
    filePath,
    text: sourceFixture
  });
}));
describe('when text in buffer range is already pretty', () => {
  beforeEach(() => {
    editor.getTextInBufferRange.mockImplementation(() => formattedFixture);
  });
  it("does not change the text in the editor's buffer range",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(function* () {
    const before = editor.getTextInBufferRange(bufferRangeFixture);
    yield executePrettierOnBufferRange(editor, bufferRangeFixture);
    const after = editor.getTextInBufferRange(bufferRangeFixture);
    expect(before).toEqual(after); // NOTE: there is currently a bug in prettier that causes formatWithCursor to
    // only return the formatted text when running in test environment, but works
    // as expected when in production. This causes a false positive for
    // this test.
    // expect(editor.setTextInBufferRange).not.toHaveBeenCalled();
  }));
  it("does not change the editor's cursor position",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(function* () {
    yield executePrettierOnBufferRange(editor, bufferRangeFixture);
    expect(editor.setCursorScreenPosition).not.toHaveBeenCalled();
  }));
});
describe('when prettier throws an error', () => {
  const error = new Error();
  beforeEach(() => {
    prettier.formatWithCursor.mockImplementation(() => {
      throw error;
    }); // NOTE: while we guard against `formatWithCursor` we need to test throwing
    // `format` too

    prettier.format.mockImplementation(() => {
      throw error;
    });
  });
  it('handles the error',
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(function* () {
    yield executePrettierOnBufferRange(editor, bufferRangeFixture);
    expect(handleError).toHaveBeenCalledWith({
      editor,
      error,
      bufferRange: bufferRangeFixture
    });
  }));
  it("does not change the text in the editor's buffer range",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(function* () {
    yield executePrettierOnBufferRange(editor, bufferRangeFixture);
    expect(editor.setTextInBufferRange).not.toHaveBeenCalled();
  }));
  it("does not change the editor's cursor position",
  /*#__PURE__*/
  (0, _asyncToGenerator2["default"])(function* () {
    yield executePrettierOnBufferRange(editor, bufferRangeFixture);
    expect(editor.setCursorScreenPosition).not.toHaveBeenCalled();
  }));
});