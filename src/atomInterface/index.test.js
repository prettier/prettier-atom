const {
  runLinter,
  shouldUseEslint,
  shouldUseStylelint,
  getPrettierEslintOptions,
  isLinterEslintAutofixEnabled,
  relativizePathFromAtomProject,
  toggleFormatOnSave,
} = require('./index');
const textEditor = require('../../tests/mocks/textEditor');

describe('relativizePathFromAtomProject()', () => {
  it('runs `atom.project.relativizePath` if the filepath and project are present', () => {
    const absoluteFilePath = '/Users/johndoe/src/main.js';
    const relativeFilePath = 'main.js';
    atom = { project: { relativizePath: jest.fn(() => [null, relativeFilePath]) } };

    const actual = relativizePathFromAtomProject(absoluteFilePath);

    expect(actual).toEqual(relativeFilePath);
    expect(atom.project.relativizePath).toHaveBeenCalledWith(absoluteFilePath);
  });

  it('relativizes the path to the parent dir if the filepath is present but project is missing', () => {
    const absoluteFilePath = '/Users/johndoe/src/main.js';
    const relativeFilePath = 'main.js';
    atom = { project: { relativizePath: jest.fn(() => [null, absoluteFilePath]) } };

    const actual = relativizePathFromAtomProject(absoluteFilePath);

    expect(actual).toEqual(relativeFilePath);
    expect(atom.project.relativizePath).toHaveBeenCalledWith(absoluteFilePath);
  });

  it('returns null if no filepath is present', () => {
    const filePath = null;

    const actual = relativizePathFromAtomProject(filePath);

    expect(actual).toEqual(null);
  });
});

describe('runLinter()', () => {
  it('runs `linter:lint` command', () => {
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

  it('does nothing if `linter:lint` command does not exist', () => {
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

describe('shouldUseEslint()', () => {
  it('is true if the config option is enabled', () => {
    const mockGet = jest.fn(() => true);
    atom = { config: { get: mockGet } };

    const actual = shouldUseEslint();

    expect(mockGet).toHaveBeenCalledWith('prettier-atom.useEslint');
    expect(actual).toBe(true);
  });

  it('is false if the config option is not enabled', () => {
    const mockGet = jest.fn(() => false);
    atom = { config: { get: mockGet } };

    const actual = shouldUseEslint();

    expect(mockGet).toHaveBeenCalledWith('prettier-atom.useEslint');
    expect(actual).toBe(false);
  });
});

describe('shouldUseStylelint()', () => {
  it('is true if the config option is enabled', () => {
    const mockGet = jest.fn(() => true);
    atom = { config: { get: mockGet } };

    const actual = shouldUseStylelint();

    expect(mockGet).toHaveBeenCalledWith('prettier-atom.useStylelint');
    expect(actual).toBe(true);
  });

  it('is false if the config option is not enabled', () => {
    const mockGet = jest.fn(() => false);
    atom = { config: { get: mockGet } };

    const actual = shouldUseStylelint();

    expect(mockGet).toHaveBeenCalledWith('prettier-atom.useStylelint');
    expect(actual).toBe(false);
  });
});

describe('getPrettierEslintOptions()', () => {
  it('retrieves the given prettier-eslint options from the prettier-atom config', () => {
    const mockGet = jest.fn(() => true);
    atom = { config: { get: mockGet } };

    const actual = getPrettierEslintOptions();

    expect(mockGet).toHaveBeenLastCalledWith('prettier-atom.prettierEslintOptions');
    expect(actual).toBe(true);
  });
});

describe('isLinterEslintAutofixEnabled()', () => {
  it('is true if linter-eslint is active and fix on save is enabled', () => {
    atom = { config: { get: () => true }, packages: { isPackageActive: () => true } };

    const actual = isLinterEslintAutofixEnabled();

    expect(actual).toBe(true);
  });

  it('is false if linter-eslint is not active', () => {
    atom = { config: { get: () => true }, packages: { isPackageActive: () => false } };

    const actual = isLinterEslintAutofixEnabled();

    expect(actual).toBe(false);
  });

  it('is false if fix on save is not enabled', () => {
    atom = { config: { get: () => false }, packages: { isPackageActive: () => true } };

    const actual = isLinterEslintAutofixEnabled();

    expect(actual).toBe(false);
  });
});

describe('toggleFormatOnSave()', () => {
  it('sets formatOnSaveOptions.enabled to false if it was true', () => {
    atom = { config: { get: jest.fn(() => true), set: jest.fn() } };

    toggleFormatOnSave();

    expect(atom.config.set).toHaveBeenCalledWith('prettier-atom.formatOnSaveOptions.enabled', false);
  });

  it('sets formatOnSaveOptions.enabled to true if it was false', () => {
    atom = { config: { get: jest.fn(() => false), set: jest.fn() } };

    toggleFormatOnSave();

    expect(atom.config.set).toHaveBeenCalledWith('prettier-atom.formatOnSaveOptions.enabled', true);
  });
});
