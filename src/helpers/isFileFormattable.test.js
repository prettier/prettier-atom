jest.mock('./getPrettierInstance');
jest.mock('../editorInterface');

const isFileFormattable = require('./isFileFormattable');
const buildMockEditor = require('../../tests/mocks/textEditor');
const getPrettierInstance = require('./getPrettierInstance');
const { getCurrentFilePath, isCurrentFilePathDefined } = require('../editorInterface');

const mockEditor = buildMockEditor();

beforeEach(() => {
  isCurrentFilePathDefined.mockImplementation(() => true);
  getCurrentFilePath.mockImplementation(() => 'xyz.js');
});

const mockGetFileInfoSyncFunc = syncFunc =>
  getPrettierInstance.mockImplementation(() => ({ getFileInfo: { sync: syncFunc } }));

it('calls prettier.getFileInfo.sync with the proper arguments', () => {
  const sync = jest.fn();
  mockGetFileInfoSyncFunc(sync);
  getPrettierInstance.mockImplementation(() => ({ getFileInfo: { sync } }));

  isFileFormattable(mockEditor);

  expect(sync).toHaveBeenCalledWith('xyz.js', {}, '.prettierignore');
});

it('returns true if the file is formattable', () => {
  mockGetFileInfoSyncFunc(() => ({ exists: true, ignored: false, inferredParser: 'babylon' }));

  const actual = isFileFormattable(mockEditor);

  expect(actual).toEqual(true);
});

it('returns false if no editor is passed', () => {
  const actual = isFileFormattable();

  expect(actual).toEqual(false);
});

it('returns false if no filepath can be found', () => {
  mockGetFileInfoSyncFunc(() => null);

  const actual = isFileFormattable(mockEditor);

  expect(actual).toEqual(false);
});

it('returns false if prettier is configured to ignore the file', () => {
  mockGetFileInfoSyncFunc(() => ({ exists: true, ignored: true }));

  const actual = isFileFormattable(mockEditor);

  expect(actual).toEqual(false);
});

it('returns false if prettier cannot infer a suitable parser', () => {
  mockGetFileInfoSyncFunc(() => ({ exists: true, ignored: false, parser: null }));

  const actual = isFileFormattable(mockEditor);

  expect(actual).toEqual(false);
});
