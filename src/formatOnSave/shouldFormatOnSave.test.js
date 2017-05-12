jest.mock('../editorInterface');
jest.mock('../atomInterface');
jest.mock('./isFilePathEslintIgnored');

const createMockTextEditor = require('../../tests/mocks/textEditor');
const {
  isFormatOnSaveEnabled,
  getExcludedGlobs,
  getWhitelistedGlobs,
  getScopes,
} = require('../atomInterface');
const { getCurrentScope, getCurrentFilePath } = require('../editorInterface');
const isFilePathEslintIgnored = require('./isFilePathEslintIgnored');
const shouldFormatOnSave = require('./shouldFormatOnSave');

const fakeCurrentFilePath = 'foo.js';
const callShouldFormatOnSave = () => shouldFormatOnSave(createMockTextEditor());

beforeEach(() => {
  isFormatOnSaveEnabled.mockImplementation(() => true);
  getScopes.mockImplementation(() => ['js', 'jsx']);
  getCurrentScope.mockImplementation(() => 'js');
  getCurrentFilePath.mockImplementation(() => fakeCurrentFilePath);
  isFilePathEslintIgnored.mockImplementation(() => false);
});

it('returns true if should format on save', () => {
  const actual = callShouldFormatOnSave();

  expect(actual).toBe(true);
});

it('returns false if formatOnSave is not enabled', () => {
  isFormatOnSaveEnabled.mockImplementation(() => false);

  const actual = callShouldFormatOnSave();

  expect(actual).toBe(false);
});

it('returns false if there is no filePath', () => {
  getCurrentFilePath.mockImplementation(() => undefined);

  const actual = callShouldFormatOnSave();

  expect(actual).toBe(false);
});

it('returns false if the filepath is blacklisted and not whitelisted', () => {
  getExcludedGlobs.mockImplementation(() => [fakeCurrentFilePath]);

  const actual = callShouldFormatOnSave();

  expect(actual).toBe(false);
});

it('returns true if the filepath is blacklisted and also whitelisted', () => {
  getExcludedGlobs.mockImplementation(() => [fakeCurrentFilePath]);
  getWhitelistedGlobs.mockImplementation(() => [fakeCurrentFilePath]);

  const actual = callShouldFormatOnSave();

  expect(actual).toBe(true);
});

it('returns false if whitelist globs exist but the filepath does not match them', () => {
  getWhitelistedGlobs.mockImplementation(() => ['foo.ruby']);

  const actual = callShouldFormatOnSave();

  expect(actual).toBe(false);
});

it('returns false if the filepath is not in scope', () => {
  getCurrentScope.mockImplementation(() => 'ruby');

  const actual = callShouldFormatOnSave();

  expect(actual).toBe(false);
});

it('returns false if the filepath is eslintignored', () => {
  isFilePathEslintIgnored.mockImplementation(() => true);

  const actual = callShouldFormatOnSave();

  expect(actual).toBe(false);
});
