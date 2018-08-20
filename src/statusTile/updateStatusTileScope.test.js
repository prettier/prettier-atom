jest.mock('../helpers');

const { isFileFormattable, isPrettierProperVersion } = require('../helpers');
const updateStatusTileScope = require('./updateStatusTileScope');

let mockHtmlElement = null;
let mockEditor = null;

beforeEach(() => {
  isFileFormattable.mockImplementation(() => true);
  isPrettierProperVersion.mockImplementation(() => true);
  mockEditor = {};
  mockHtmlElement = { dataset: {} };
});

it('sets the match-scope data attribute to "true" if the current file can be formatted and prettier is the proper version', () => {
  updateStatusTileScope(mockHtmlElement, mockEditor);

  expect(mockHtmlElement.dataset.prettierCanFormatFile).toBe('true');
});

it('sets the match-scope data attribute to "false" if the editor is not formattable', () => {
  isFileFormattable.mockImplementation(() => false);

  updateStatusTileScope(mockHtmlElement, mockEditor);

  expect(mockHtmlElement.dataset.prettierCanFormatFile).toBe('false');
});

it('sets the match-scope data attribute to "false" if prettier is not the proper version', () => {
  isPrettierProperVersion.mockImplementation(() => false);

  updateStatusTileScope(mockHtmlElement, mockEditor);

  expect(mockHtmlElement.dataset.prettierCanFormatFile).toBe('false');
});

it('sets the match-scope data attribute to "false" if there is no active editor', () => {
  mockEditor = null;

  updateStatusTileScope(mockHtmlElement, mockEditor);

  expect(mockHtmlElement.dataset.prettierCanFormatFile).toBe('false');
});
