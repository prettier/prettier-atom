jest.mock('../editorInterface');
jest.mock('../atomInterface');
jest.mock('../helpers/getPrettierInstance');
jest.mock('./isFilePathEslintIgnored');
jest.mock('./isFilePathPrettierIgnored');
jest.mock('./isPrettierInPackageJson');

const createMockTextEditor = require('../../tests/mocks/textEditor');
const {
  isDisabledIfNotInPackageJson,
  isDisabledIfNoConfigFile,
  isFormatOnSaveEnabled,
  getExcludedGlobs,
  getWhitelistedGlobs,
  getAllScopes,
} = require('../atomInterface');
const getPrettierInstance = require('../helpers/getPrettierInstance');
const { getCurrentScope, getCurrentFilePath } = require('../editorInterface');
const isFilePathEslintIgnored = require('./isFilePathEslintIgnored');
const isFilePathPrettierIgnored = require('./isFilePathPrettierIgnored');
const shouldFormatOnSave = require('./shouldFormatOnSave');
const isPrettierInPackageJson = require('./isPrettierInPackageJson');

const fakeCurrentFilePath = 'foo.js';
const callShouldFormatOnSave = () => shouldFormatOnSave(createMockTextEditor());

beforeEach(() => {
  isFormatOnSaveEnabled.mockImplementation(() => true);
  getAllScopes.mockImplementation(() => ['js', 'jsx']);
  getCurrentScope.mockImplementation(() => 'js');
  getCurrentFilePath.mockImplementation(() => fakeCurrentFilePath);
  isFilePathEslintIgnored.mockImplementation(() => false);
  isDisabledIfNotInPackageJson.mockImplementation(() => false);
  isDisabledIfNoConfigFile.mockImplementation(() => false);
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

it('returns false if the filepath is prettier ignored', () => {
  isFilePathPrettierIgnored.mockImplementation(() => true);

  const actual = callShouldFormatOnSave();

  expect(actual).toBe(false);
});

it('returns true if prettier needs to be in package json and is found in package json', () => {
  isDisabledIfNotInPackageJson.mockImplementation(() => true);
  isPrettierInPackageJson.mockImplementation(() => true);

  const actual = callShouldFormatOnSave();

  expect(actual).toBe(true);
});

it("returns false if prettier needs to be in package json and it isn't", () => {
  isDisabledIfNotInPackageJson.mockImplementation(() => true);
  isPrettierInPackageJson.mockImplementation(() => false);

  const actual = callShouldFormatOnSave();

  expect(actual).toBe(false);
});

it("returns true if prettier config file needs to be present and it's found", () => {
  isDisabledIfNoConfigFile.mockImplementation(() => true);
  const fakeSync = jest.fn(() => ({ tabWidth: 100 }));
  getPrettierInstance.mockImplementation(() => ({ resolveConfig: { sync: fakeSync } }));

  const actual = callShouldFormatOnSave();

  expect(actual).toBe(true);
  expect(fakeSync).toHaveBeenCalledWith(fakeCurrentFilePath);
});

it("returns false if prettier config file needs to be present and it isn't", () => {
  isDisabledIfNoConfigFile.mockImplementation(() => true);
  const fakeSync = jest.fn(() => null);
  getPrettierInstance.mockImplementation(() => ({ resolveConfig: { sync: fakeSync } }));

  const actual = callShouldFormatOnSave();

  expect(actual).toBe(false);
  expect(fakeSync).toHaveBeenCalledWith(fakeCurrentFilePath);
});
