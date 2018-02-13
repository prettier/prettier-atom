jest.mock('editorconfig');
jest.mock('editorconfig-to-prettier');
jest.mock('../atomInterface');
jest.mock('../editorInterface');
jest.mock('../helpers');

const editorconfig = require('editorconfig');
const editorconfigToPrettier = require('editorconfig-to-prettier');
const { getPrettierOptions, getAtomTabLength, shouldUseEditorConfig } = require('../atomInterface');
const {
  getCurrentFilePath,
  isCurrentScopeTypescriptScope,
  isCurrentScopeCssScope,
  isCurrentScopeJsonScope,
  isCurrentScopeGraphQlScope,
  isCurrentScopeMarkdownScope,
  isCurrentScopeVueScope,
} = require('../editorInterface');
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

it('uses markdown as the parser if current scope is listed as a Markdown scope in settings', () => {
  const editor = buildMockEditor();
  const fakePrettierOptions = { parser: 'babylon' };
  getPrettierOptions.mockImplementation(() => fakePrettierOptions);
  isCurrentScopeMarkdownScope.mockImplementation(() => true);

  const actual = buildPrettierOptions(editor);

  expect(actual).toEqual({ parser: 'markdown' });
});

it('uses vue as the parser if current scope is listed as a Vue SFC scope in settings', () => {
  const editor = buildMockEditor();
  const fakePrettierOptions = { parser: 'babylon' };
  getPrettierOptions.mockImplementation(() => fakePrettierOptions);
  isCurrentScopeVueScope.mockImplementation(() => true);

  const actual = buildPrettierOptions(editor);

  expect(actual).toEqual({ parser: 'vue' });
});

describe('when a prettier config is found', () => {
  it('returns settings from the prettier config', () => {
    const editor = buildMockEditor();
    const fakePrettierConfigOptions = { tabWidth: 4, printWidth: 100, useTabs: true };
    const mockPrettierInstance = { resolveConfig: { sync: jest.fn(() => fakePrettierConfigOptions) } };
    getPrettierInstance.mockImplementation(() => mockPrettierInstance);
    getCurrentFilePath.mockImplementation(() => 'parent-dir/foo.js');

    const actual = buildPrettierOptions(editor);

    expect(actual).toEqual(fakePrettierConfigOptions);
  });

  it('tells prettier whether to use editorconfig when resolving options', () => {
    const editor = buildMockEditor();
    const mockPrettierInstance = { resolveConfig: { sync: jest.fn(() => ({})) } };
    getPrettierInstance.mockImplementation(() => mockPrettierInstance);
    shouldUseEditorConfig.mockImplementation(() => true);
    getCurrentFilePath.mockImplementation(() => 'parent-dir/foo.js');

    buildPrettierOptions(editor);

    expect(mockPrettierInstance.resolveConfig.sync).toHaveBeenCalledTimes(2);
    expect(mockPrettierInstance.resolveConfig.sync.mock.calls[0][1]).toBeUndefined();
    expect(mockPrettierInstance.resolveConfig.sync.mock.calls[1][1]).toEqual({ editorconfig: true });
  });
});

describe('when a prettier config is not found', () => {
  it('returns settings from prettier-atom', () => {
    const editor = buildMockEditor();
    const fakePrettierOptions = { singleQuote: true, tabWidth: 2 };
    const mockPrettierInstance = { resolveConfig: { sync: jest.fn(() => null) } };
    getPrettierInstance.mockImplementation(() => mockPrettierInstance);
    shouldUseEditorConfig.mockImplementation(() => false);
    getCurrentFilePath.mockImplementation(() => 'parent-dir/foo.js');
    getPrettierOptions.mockImplementation(() => fakePrettierOptions);

    const actual = buildPrettierOptions(editor);

    expect(actual).toEqual(fakePrettierOptions);
  });

  it('overrides prettier-atom settings with editorconfig values if editor config is enabled', () => {
    const editor = buildMockEditor();
    const fakePrettierOptions = { singleQuote: true, tabWidth: 2 };
    const fakeEditorconfigOptions = { tab_width: 4 };
    const fakePrettierOptionsFromEditorconfig = { tabWidth: 4 };
    const mockPrettierInstance = { resolveConfig: { sync: jest.fn(() => null) } };
    const filepath = 'parent-dir/foo.js';
    getPrettierInstance.mockImplementation(() => mockPrettierInstance);
    editorconfig.parseSync.mockImplementation(() => fakeEditorconfigOptions);
    editorconfigToPrettier.mockImplementation(() => fakePrettierOptionsFromEditorconfig);
    shouldUseEditorConfig.mockImplementation(() => true);
    getCurrentFilePath.mockImplementation(() => filepath);
    getPrettierOptions.mockImplementation(() => fakePrettierOptions);

    const actual = buildPrettierOptions(editor);

    expect(editorconfig.parseSync).toHaveBeenCalledWith(filepath);
    expect(editorconfigToPrettier).toHaveBeenCalledWith(fakeEditorconfigOptions);
    expect(actual).toEqual({ ...fakePrettierOptions, ...fakePrettierOptionsFromEditorconfig });
  });
});
