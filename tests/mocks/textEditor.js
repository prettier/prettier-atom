// @flow
const textEditorFactory = (overrides?: {} = {}): TextEditor =>
  Object.assign(
    {},
    {
      backwardsScanInBufferRange: jest.fn(),
      buffer: {
        file: {
          path: 'xyz.js',
          getPath: jest.fn(),
        },
      },
      getBuffer: jest.fn(() => ({
        characterIndexForPosition: jest.fn(() => 1),
        getRange: jest.fn(() => ({
          isEqual: jest.fn(),
          start: { row: 0, column: 0 },
          end: { row: 0, column: 0 },
        })),
        positionForCharacterIndex: jest.fn(),
        setTextViaDiff: jest.fn(),
      })),
      getGrammar: jest.fn(() => ({ scopeName: 'FAKE SCOPE NAME' })),
      getSelectedText: jest.fn(),
      getLastCursor: jest.fn(),
      getCursorScreenPosition: jest.fn(),
      getCursorBufferPosition: jest.fn(),
      getTextInBufferRange: jest.fn(),
      setTextInBufferRange: jest.fn(),
      getSelectedBufferRanges: jest.fn(),
      setCursorScreenPosition: jest.fn(),
      setCursorBufferPosition: jest.fn(),
    },
    overrides,
  );

module.exports = textEditorFactory;
