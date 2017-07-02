jest.mock('../executePrettier');
jest.mock('../editorInterface');
jest.mock('./shouldFormatOnSave');

const { executePrettierOnBufferRange, executePrettierOnEmbeddedScripts } = require('../executePrettier');
const { isCurrentScopeEmbeddedScope, getBufferRange } = require('../editorInterface');
const createMockTextEditor = require('../../tests/mocks/textEditor');
const shouldFormatOnSave = require('./shouldFormatOnSave');
const formatOnSave = require('./index');

it('executes prettier on the buffer range if appropriate and scope is not embedded', () => {
  const editor = createMockTextEditor();
  const mockRange = { start: [0, 0], end: [0, 1] };
  getBufferRange.mockImplementation(() => mockRange);
  shouldFormatOnSave.mockImplementation(() => true);
  isCurrentScopeEmbeddedScope.mockImplementation(() => false);

  formatOnSave(editor);

  expect(executePrettierOnBufferRange).toHaveBeenCalledWith(editor, mockRange);
});

it('executes prettier on the embedded scripts if appropriate and scope is embedded', () => {
  const editor = createMockTextEditor();
  shouldFormatOnSave.mockImplementation(() => true);
  isCurrentScopeEmbeddedScope.mockImplementation(() => true);

  formatOnSave(editor);

  expect(executePrettierOnEmbeddedScripts).toHaveBeenCalledWith(editor);
});

it('does nothing if it should not format on save', () => {
  const editor = createMockTextEditor();
  shouldFormatOnSave.mockImplementation(() => false);

  formatOnSave(editor);

  expect(shouldFormatOnSave).toHaveBeenCalledWith(editor);
  expect(executePrettierOnBufferRange).not.toHaveBeenCalled();
  expect(executePrettierOnEmbeddedScripts).not.toHaveBeenCalled();
});

it('catches uncaught errors so that the user is not prevented from saving', () => {
  const editor = createMockTextEditor();
  const fakeError = new Error('fake error');
  atom = { notifications: { addError: jest.fn() } };
  shouldFormatOnSave.mockImplementation(() => {
    throw fakeError;
  });

  formatOnSave(editor);

  expect(atom.notifications.addError).toHaveBeenCalled();
});
