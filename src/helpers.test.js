// @flow
const path = require('path');
const atomLinter = require('atom-linter');
const prettier = require('prettier');

const textEditor = require('../tests/mocks/textEditor');
const {
  getConfigOption,
  getCurrentFilePath,
  getPrettier,
  isInScope,
  isFilePathEslintignored,
  isFilePathExcluded,
  isFilePathWhitelisted,
  isCurrentScopeEmbeddedScope,
  isLinterEslintAutofixEnabled,
  runLinter,
  getDebugInfo,
} = require('./helpers');

jest.mock('atom-linter');
jest.mock('prettier');

describe('getConfigOption', () => {
  test('retrieves a config option from the prettier-atom config', () => {
    const mockGet = jest.fn(() => 'foo');
    atom = { config: { get: mockGet } };

    const actual = getConfigOption('foo');
    const expected = 'foo';

    expect(mockGet).lastCalledWith('prettier-atom.foo');
    expect(actual).toBe(expected);
  });
});

describe('getCurrentFilePath', () => {
  test("returns the editor's current filePath", () => {
    const editor = textEditor();

    const actual = getCurrentFilePath(editor);
    const expected = 'xyz.js';

    expect(actual).toBe(expected);
  });

  test('returns undefined if there is no file', () => {
    const editor = textEditor({ buffer: { file: null } });

    const actual = getCurrentFilePath(editor);
    const expected = undefined;

    expect(actual).toBe(expected);
  });
});

describe('getPrettier', () => {
  test('returns default prettier if no prettier package can be found', () => {
    atomLinter.findCached.mockImplementation(() => undefined);
    const filePath = path.join(__dirname, 'sourceFile.js');

    const actual = getPrettier(filePath);
    const expected = prettier;

    expect(actual).toEqual(expected);
  });

  test('returns local prettier instance when it exists', () => {
    const prettierLib = path.join(__dirname, '..', 'tests', 'fixtures', 'prettier.js');
    atomLinter.findCached.mockImplementation(() => prettierLib);

    const filePath = path.join(__dirname, '..', 'tests', 'fixtures', 'sourceFile.js');

    const actual = getPrettier(filePath);
    // $FlowFixMe
    const expected = require(prettierLib); // eslint-disable-line

    expect(actual).toBe(expected);
  });
});

describe('isInScope', () => {
  test("returns true if the editor's current scope is listed among the config's scopes", () => {
    const mockGet = jest.fn(() => ['source.js.jsx', 'text.html.vue']);
    atom = { config: { get: mockGet } };
    const mockGetGrammar = jest.fn(() => ({ scopeName: 'source.js.jsx' }));
    const editor = textEditor({ getGrammar: mockGetGrammar });

    const actual = isInScope(editor);
    const expected = true;

    expect(mockGet).toHaveBeenCalledWith('prettier-atom.formatOnSaveOptions.scopes');
    expect(mockGetGrammar).toHaveBeenCalled();
    expect(actual).toBe(expected);
  });

  test("returns false if the editor's current scope is not listed among the config's scopes", () => {
    const mockGet = jest.fn(() => ['source.js.jsx', 'text.html.vue']);
    atom = { config: { get: mockGet } };
    const mockGetGrammar = jest.fn(() => ({ scopeName: 'source.foo' }));
    const editor = textEditor({ getGrammar: mockGetGrammar });

    const actual = isInScope(editor);
    const expected = false;

    expect(mockGetGrammar).toHaveBeenCalled();
    expect(mockGet).toHaveBeenCalledWith('prettier-atom.formatOnSaveOptions.scopes');
    expect(actual).toBe(expected);
  });
});

describe('isFilePathEslintignored', () => {
  test('is false if no .eslintignore file can be found', () => {
    atomLinter.findCached.mockImplementation(() => null);
    const filePath = path.join(__dirname, '..', 'tests', 'fixtures', 'matchesEslintignore.js');

    const actual = isFilePathEslintignored(filePath);
    const expected = false;

    expect(actual).toBe(expected);
  });

  test('is false if the filePath does not match a glob in the nearest eslintignore', () => {
    atomLinter.findCached.mockImplementation(() =>
      path.join(__dirname, '..', 'tests', 'fixtures', '.eslintignore'),
    );
    const filePath = path.join(__dirname, '..', 'tests', 'fixtures', 'doesNotMatchEslintignore.js');

    const actual = isFilePathEslintignored(filePath);
    const expected = false;

    expect(atomLinter.findCached).toHaveBeenCalledWith(
      path.join(__dirname, '..', 'tests', 'fixtures'),
      '.eslintignore',
    );
    expect(actual).toBe(expected);
  });

  test('is true if the filePath does match a glob in the nearest eslintignore', () => {
    atomLinter.findCached.mockImplementation(() =>
      path.join(__dirname, '..', 'tests', 'fixtures', '.eslintignore'),
    );
    const filePath = path.join(__dirname, '..', 'tests', 'fixtures', 'matchesEslintignore.js');

    const actual = isFilePathEslintignored(filePath);
    const expected = true;

    expect(atomLinter.findCached).toHaveBeenCalledWith(
      path.join(__dirname, '..', 'tests', 'fixtures'),
      '.eslintignore',
    );
    expect(actual).toBe(expected);
  });
});

describe('isFilePathExcluded', () => {
  test('returns false if filePath is not listed in the globs', () => {
    atom = { config: { get: jest.fn(() => []) } };

    const actual = isFilePathExcluded('foo.js');
    const expected = false;

    expect(atom.config.get).toHaveBeenCalledWith('prettier-atom.formatOnSaveOptions.excludedGlobs');
    expect(actual).toBe(expected);
  });

  test('returns true if filePath is listed in the globs', () => {
    atom = { config: { get: jest.fn(() => ['*.js']) } };

    const actual = isFilePathExcluded('foo.js');
    const expected = true;

    expect(atom.config.get).toHaveBeenCalledWith('prettier-atom.formatOnSaveOptions.excludedGlobs');
    expect(actual).toBe(expected);
  });
});

describe('isFilePathWhitelisted', () => {
  test('returns false if filePath is not listed in the globs', () => {
    atom = { config: { get: jest.fn(() => []) } };

    const actual = isFilePathWhitelisted('foo.js');
    const expected = false;

    expect(atom.config.get).toHaveBeenCalledWith('prettier-atom.formatOnSaveOptions.whitelistedGlobs');
    expect(actual).toBe(expected);
  });

  test('returns true if filePath is not listed in the globs', () => {
    atom = { config: { get: jest.fn(() => ['*.js']) } };

    const actual = isFilePathWhitelisted('foo.js');
    const expected = true;

    expect(atom.config.get).toHaveBeenCalledWith('prettier-atom.formatOnSaveOptions.whitelistedGlobs');
    expect(actual).toBe(expected);
  });
});

describe('isCurrentScopeEmbeddedScope', () => {
  test('returns true if current scope is embedded scope', () => {
    const editor = textEditor({ getGrammar: () => ({ scopeName: 'text.html.vue' }) });

    const actual = isCurrentScopeEmbeddedScope(editor);

    expect(actual).toBe(true);
  });

  test('returns false if the current scope is not embedded scope', () => {
    const editor = textEditor({ getGrammar: () => ({ scopeName: 'source.js.jsx' }) });

    const actual = isCurrentScopeEmbeddedScope(editor);

    expect(actual).toBe(false);
  });
});

describe('runLinter()', () => {
  test('runs `linter:lint` command', () => {
    const editor = textEditor();
    const viewMock = { isViewMock: true };
    const commandsMock = [{ name: 'linter:lint', displayName: 'Linter: Lint' }];
    atom = {
      commands: { dispatch: jest.fn(), findCommands: jest.fn(() => commandsMock) },
      views: { getView: jest.fn(() => viewMock) },
    };

    runLinter(editor);

    expect(atom.views.getView).toHaveBeenCalledWith(editor);
    expect(atom.commands.dispatch).toHaveBeenCalledWith(viewMock, 'linter:lint');
  });

  test('does nothing if `linter:lint` command does not exist', () => {
    const editor = textEditor();
    const viewMock = { isViewMock: true };
    const commandsMock = [];
    atom = {
      commands: { dispatch: jest.fn(), findCommands: jest.fn(() => commandsMock) },
      views: { getView: jest.fn(() => viewMock) },
    };

    runLinter(editor);

    expect(atom.commands.findCommands).toHaveBeenCalledWith({ target: viewMock });
    expect(atom.commands.dispatch).not.toHaveBeenCalled();
  });
});

describe('getDebugInfo()', () => {
  test('returns versions of prettier-atom + dependencies, and its configuration', () => {
    const expectedAtomVersion = '4.44.44';
    const expectedConfig = 'config';
    const mockGetVersion = jest.fn(() => expectedAtomVersion);
    const mockGet = jest.fn(() => expectedConfig);
    atom = {
      getVersion: mockGetVersion,
      config: { get: mockGet },
    };

    const minVersionLength = '0.0.0'.length;
    const info = getDebugInfo();

    expect(info.atomVersion).toBe(expectedAtomVersion);
    expect(typeof info.prettierVersion).toBe('string');
    expect(typeof info.prettierAtomVersion).toBe('string');
    expect(typeof info.prettierESLintVersion).toBe('string');
    expect(info.prettierVersion.length).toBeGreaterThanOrEqual(minVersionLength);
    expect(info.prettierAtomVersion.length).toBeGreaterThanOrEqual(minVersionLength);
    expect(info.prettierESLintVersion.length).toBeGreaterThanOrEqual(minVersionLength);
    expect(info.prettierAtomConfig).toBe(expectedConfig);
  });
});
