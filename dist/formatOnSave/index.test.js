"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

jest.mock('../executePrettier');
jest.mock('../editorInterface');
jest.mock('../linterInterface');
jest.mock('./shouldFormatOnSave');

const {
  executePrettierOnBufferRange
} = require('../executePrettier');

const {
  getBufferRange
} = require('../editorInterface');

const {
  clearLinterErrors
} = require('../linterInterface');

const createMockTextEditor = require('../../tests/mocks/textEditor');

const shouldFormatOnSave = require('./shouldFormatOnSave');

const formatOnSave = require('./index');

it('returns a Promise', /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
  const editor = createMockTextEditor();
  const result = formatOnSave(editor);
  expect(result).toBeInstanceOf(Promise);
}));
it('clears linter errors before running', /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
  const editor = createMockTextEditor();
  yield formatOnSave(editor);
  expect(clearLinterErrors).toHaveBeenCalledWith(editor);
}));
it('executes prettier on the buffer range if appropriate and scope is not embedded', /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
  const editor = createMockTextEditor();
  const mockRange = {
    start: [0, 0],
    end: [0, 1]
  };
  getBufferRange.mockImplementation(() => mockRange);
  shouldFormatOnSave.mockImplementation(() => true);
  yield formatOnSave(editor);
  expect(executePrettierOnBufferRange).toHaveBeenCalledWith(editor, mockRange, {
    setTextViaDiff: true
  });
}));
it('does nothing if it should not format on save', /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
  const editor = createMockTextEditor();
  shouldFormatOnSave.mockImplementation(() => false);
  yield formatOnSave(editor);
  expect(shouldFormatOnSave).toHaveBeenCalledWith(editor);
  expect(executePrettierOnBufferRange).not.toHaveBeenCalled();
}));
it('catches uncaught errors so that the user is not prevented from saving', /*#__PURE__*/(0, _asyncToGenerator2.default)(function* () {
  const originalConsoleError = console.error; // eslint-disable-line no-console

  console.error = jest.fn(); // eslint-disable-line no-console

  const editor = createMockTextEditor();
  const fakeError = new Error('fake error');
  atom = {
    notifications: {
      addError: jest.fn()
    }
  };
  shouldFormatOnSave.mockImplementation(() => {
    throw fakeError;
  });
  yield formatOnSave(editor);
  expect(atom.notifications.addError).toHaveBeenCalled();
  expect(console.error).toHaveBeenCalledWith(fakeError); // eslint-disable-line no-console

  console.error = originalConsoleError; // eslint-disable-line no-console
}));