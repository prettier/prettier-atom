jest.mock('../atomInterface');
jest.mock('../editorInterface');
jest.mock('./buildEditorConfigOptions');
jest.mock('../helpers');

const { getPrettierOptions, getAtomTabLength, shouldUseEditorConfig } = require('../atomInterface');
const {
  getCurrentFilePath,
  isCurrentScopeTypescriptScope,
  isCurrentScopeCssScope,
  isCurrentScopeJsonScope,
  isCurrentScopeGraphQlScope,
} = require('../editorInterface');
const buildEditorConfigOptions = require('./buildEditorConfigOptions');
const buildMockEditor = require('../../tests/mocks/textEditor');
const buildPrettierOptions = require('./buildPrettierOptions');
const { getPrettierInstance } = require('../helpers');

beforeEach(() => {
  getPrettierInstance.mockImplementation(() => ({ resolveConfig: { sync: jest.fn() } }));
});

it('returns prettier options', () => {
  const editor = buildMockEditor();
  const fakePrettierOptions = { fakeOption: 'fake value' };
  getPrettierOptions.mockImplementation(() => fakePrettierOptions);

  const actual = buildPrettierOptions(editor);

  expect(actual).toEqual(fakePrettierOptions);
});

it('uses the atom tab length if the tabWidth option is set to "auto"', () => {
  const editor = buildMockEditor();
  const fakePrettierOptions = { tabWidth: 'auto' };
  getPrettierOptions.mockImplementation(() => fakePrettierOptions);
  getAtomTabLength.mockImplementation(() => 2);

  const actual = buildPrettierOptions(editor);

  expect(actual).toEqual({ tabWidth: 2 });
});

it('uses typescript as the parser if current scope is listed as a typescript scope in settings', () => {
  const editor = buildMockEditor();
  const fakePrettierOptions = { parser: 'babylon' };
  getPrettierOptions.mockImplementation(() => fakePrettierOptions);
  isCurrentScopeTypescriptScope.mockImplementation(() => true);

  const actual = buildPrettierOptions(editor);

  expect(actual).toEqual({ parser: 'typescript' });
});

it('uses postcss as the parser if current scope is listed as a CSS scope in settings', () => {
  const editor = buildMockEditor();
  const fakePrettierOptions = { parser: 'babylon' };
  getPrettierOptions.mockImplementation(() => fakePrettierOptions);
  isCurrentScopeCssScope.mockImplementation(() => true);

  const actual = buildPrettierOptions(editor);

  expect(actual).toEqual({ parser: 'postcss' });
});

it('uses json as the parser if current scope is listed as a JSON scope in settings', () => {
  const editor = buildMockEditor();
  const fakePrettierOptions = { parser: 'babylon' };
  getPrettierOptions.mockImplementation(() => fakePrettierOptions);
  isCurrentScopeJsonScope.mockImplementation(() => true);

  const actual = buildPrettierOptions(editor);

  expect(actual).toEqual({ parser: 'json', trailingComma: 'none' });
});

it('uses graphql as the parser if current scope is listed as a GraphQl scope in settings', () => {
  const editor = buildMockEditor();
  const fakePrettierOptions = { parser: 'babylon' };
  getPrettierOptions.mockImplementation(() => fakePrettierOptions);
  isCurrentScopeGraphQlScope.mockImplementation(() => true);

  const actual = buildPrettierOptions(editor);

  expect(actual).toEqual({ parser: 'graphql' });
});

it('does not use editorconfig options if that setting is not enabled', () => {
  const editor = buildMockEditor();
  getPrettierOptions.mockImplementation(() => ({}));
  shouldUseEditorConfig.mockImplementation(() => false);

  buildPrettierOptions(editor);

  expect(buildEditorConfigOptions).not.toHaveBeenCalled();
});

it('overrides values with editorconfig values if editor config is enabled', () => {
  const editor = buildMockEditor();
  const fakePrettierOptions = { tabWidth: 2, printWidth: 80, useTabs: false };
  const fakeEditorConfigOptions = { tabWidth: 4, printWidth: 100, useTabs: true };
  getPrettierOptions.mockImplementation(() => fakePrettierOptions);
  buildEditorConfigOptions.mockImplementation(() => fakeEditorConfigOptions);
  shouldUseEditorConfig.mockImplementation(() => true);
  getCurrentFilePath.mockImplementation(() => 'parent-dir/foo.js');

  const actual = buildPrettierOptions(editor);

  expect(actual).toEqual(fakeEditorConfigOptions);
});

it('overrides values with prettier config values if one exists', () => {
  const editor = buildMockEditor();
  const fakePrettierOptions = { tabWidth: 2, printWidth: 80, useTabs: false };
  const fakePrettierConfigOptions = { tabWidth: 4, printWidth: 100, useTabs: true };
  const mockPrettierInstance = { resolveConfig: { sync: jest.fn(() => fakePrettierConfigOptions) } };
  getPrettierInstance.mockImplementation(() => mockPrettierInstance);
  getCurrentFilePath.mockImplementation(() => 'parent-dir/foo.js');
  getPrettierOptions.mockImplementation(() => fakePrettierOptions);

  const actual = buildPrettierOptions(editor);

  expect(actual).toEqual(fakePrettierConfigOptions);
});
