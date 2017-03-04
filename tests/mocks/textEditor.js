// @flow

const textEditorFactory = (overrides?: {} = {}): TextEditor => Object.assign(
  {},
  {
    backwardsScanInBufferRange: jest.fn(),
    buffer: {
      file: {
        path: 'xyz.js',
      },
    },
    getBuffer: jest.fn(),
    getGrammar: jest.fn(),
    getSelectedText: jest.fn(),
    getLastCursor: jest.fn(),
    getCursorScreenPosition: jest.fn(),
    getTextInBufferRange: jest.fn(),
    setTextInBufferRange: jest.fn(),
    getSelectedBufferRanges: jest.fn(),
    setCursorScreenPosition: jest.fn(),
  },
  overrides,
);

module.exports = textEditorFactory;
