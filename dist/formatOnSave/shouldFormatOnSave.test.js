"use strict";

jest.mock('../editorInterface');
jest.mock('../atomInterface');
jest.mock('../helpers/getPrettierInstance');
jest.mock('../helpers/isPrettierProperVersion');
jest.mock('../helpers/isFileFormattable');
jest.mock('./isFilePathEslintIgnored');
jest.mock('./isPrettierInPackageJson');

const createMockTextEditor = require('../../tests/mocks/textEditor');

const {
  isDisabledIfNotInPackageJson,
  isDisabledIfNoConfigFile,
  isFormatOnSaveEnabled,
  getExcludedGlobs,
  getWhitelistedGlobs,
  relativizePathFromAtomProject,
  shouldRespectEslintignore
} = require('../atomInterface');

const getPrettierInstance = require('../helpers/getPrettierInstance');

const isPrettierProperVersion = require('../helpers/isPrettierProperVersion');

const isFileFormattable = require('../helpers/isFileFormattable');

const {
  getCurrentFilePath
} = require('../editorInterface');

const isFilePathEslintIgnored = require('./isFilePathEslintIgnored');

const shouldFormatOnSave = require('./shouldFormatOnSave');

const isPrettierInPackageJson = require('./isPrettierInPackageJson');

const fakeCurrentFilePath = 'foo.js';

const callShouldFormatOnSave = () => shouldFormatOnSave(createMockTextEditor());

beforeEach(() => {
  isFormatOnSaveEnabled.mockImplementation(() => true);
  isFileFormattable.mockImplementation(() => true);
  getCurrentFilePath.mockImplementation(() => fakeCurrentFilePath);
  relativizePathFromAtomProject.mockImplementation(() => fakeCurrentFilePath);
  isFilePathEslintIgnored.mockImplementation(() => false);
  isPrettierProperVersion.mockImplementation(() => true);
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
it('returns false if the filepath is eslintignored and eslintignore should be respected', () => {
  shouldRespectEslintignore.mockImplementation(() => true);
  isFilePathEslintIgnored.mockImplementation(() => true);
  const actual = callShouldFormatOnSave();
  expect(actual).toBe(false);
});
it('returns true if the filepath is eslintignored but eslintignore should _not_ be respected', () => {
  shouldRespectEslintignore.mockImplementation(() => false);
  isFilePathEslintIgnored.mockImplementation(() => true);
  const actual = callShouldFormatOnSave();
  expect(actual).toBe(true);
});
it('returns true if the filepath is not eslintignored', () => {
  shouldRespectEslintignore.mockImplementation(() => true);
  isFilePathEslintIgnored.mockImplementation(() => false);
  const actual = callShouldFormatOnSave();
  expect(actual).toBe(true);
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
  const fakeSync = jest.fn(() => ({
    tabWidth: 100
  }));
  getPrettierInstance.mockImplementation(() => ({
    resolveConfig: {
      sync: fakeSync
    }
  }));
  const actual = callShouldFormatOnSave();
  expect(actual).toBe(true);
  expect(fakeSync).toHaveBeenCalledWith(fakeCurrentFilePath);
});
it("returns false if prettier config file needs to be present and it isn't", () => {
  isDisabledIfNoConfigFile.mockImplementation(() => true);
  const fakeSync = jest.fn(() => null);
  getPrettierInstance.mockImplementation(() => ({
    resolveConfig: {
      sync: fakeSync
    }
  }));
  const actual = callShouldFormatOnSave();
  expect(actual).toBe(false);
  expect(fakeSync).toHaveBeenCalledWith(fakeCurrentFilePath);
});
it('returns false if the file is not formattable by Prettier', () => {
  isFileFormattable.mockImplementation(() => false);
  const actual = callShouldFormatOnSave();
  expect(actual).toBe(false);
});
it('returns false if the prettier is not the proper version', () => {
  isPrettierProperVersion.mockImplementation(() => false);
  const actual = callShouldFormatOnSave();
  expect(actual).toBe(false);
});