jest.mock('../editorInterface');
jest.mock('../linterInterface');

const { getCurrentFilePath } = require('../editorInterface');
const linterInterface = require('../linterInterface');
const { createRange } = require('../helpers');
const handleError = require('./handleError');

// helpers
const buildFakeError = ({ line, column }, useAlternativeErrorApi = false) => {
  const error = new Error(`Unexpected token (${line}:${column}) | stack trace`);
  if (useAlternativeErrorApi) {
    error.loc = { line, column };
  } else {
    error.loc = { start: { line, column } };
  }

  return error;
};

const positionOfFirstCallOfFirstMessageOfSetMessages = () =>
  linterInterface.setMessages.mock.calls[0][1][0].location.position;

// tests
it('sets an error message in the indie-linter', () => {
  getCurrentFilePath.mockImplementation(() => '/fake/file/path.js');
  const error = buildFakeError({ line: 1, column: 2 });
  const editor = null;
  const bufferRange = { start: { row: 0, column: 0 }, end: { row: 0, column: 0 } };

  handleError({ bufferRange, editor, error });

  const expectedMessages = [
    {
      location: {
        file: '/fake/file/path.js',
        position: createRange([0, 1], [0, 1]),
      },
      excerpt: 'Unexpected token',
      severity: 'error',
    },
  ];
  expect(linterInterface.setMessages).toHaveBeenCalledWith(editor, expectedMessages);
});

it('works with the alternative error location API from Prettier', () => {
  getCurrentFilePath.mockImplementation(() => '/fake/file/path.js');
  const error = buildFakeError({ line: 1, column: 2 }, true);
  const editor = null;
  const bufferRange = { start: { row: 0, column: 0 }, end: { row: 0, column: 0 } };

  handleError({ bufferRange, editor, error });

  const expectedMessages = [
    {
      location: {
        file: '/fake/file/path.js',
        position: createRange([0, 1], [0, 1]),
      },
      excerpt: 'Unexpected token',
      severity: 'error',
    },
  ];
  expect(linterInterface.setMessages).toHaveBeenCalledWith(editor, expectedMessages);
});

describe('position property of the message sent to the linter', () => {
  it('accounts for the start row of the buffer range', () => {
    const editor = null;
    const bufferRange = { start: { row: 3, column: 99 }, end: { row: 99, column: 99 } };
    const error = buildFakeError({ line: 1, column: 2 });

    handleError({ bufferRange, editor, error });

    const expectedPosition = createRange([3, 1], [3, 1]);
    expect(positionOfFirstCallOfFirstMessageOfSetMessages()).toEqual(expectedPosition);
  });

  it('accounts for the start column of the buffer range if the error line is the first line', () => {
    const editor = null;
    const bufferRange = { start: { row: 3, column: 99 }, end: { row: 99, column: 99 } };
    const error = buildFakeError({ line: 0, column: 2 });

    handleError({ bufferRange, editor, error });

    const expectedPosition = createRange([2, 100], [2, 100]);
    expect(positionOfFirstCallOfFirstMessageOfSetMessages()).toEqual(expectedPosition);
  });
});
