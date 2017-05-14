jest.mock('../atomInterface');
jest.mock('./buildEditorConfigOptions');

const { getPrettierOptions, getAtomTabLength, shouldUseEditorConfig } = require('../atomInterface');
const buildEditorConfigOptions = require('./buildEditorConfigOptions');
const buildMockEditor = require('../../tests/mocks/textEditor');
const buildPrettierOptions = require('./buildPrettierOptions');

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

  const actual = buildPrettierOptions(editor);

  expect(actual).toEqual(fakeEditorConfigOptions);
});
