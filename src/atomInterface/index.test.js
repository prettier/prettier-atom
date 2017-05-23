const {
  runLinter,
  shouldUseEslint,
  shouldDisplayErrors,
  getPrettierOptions,
  getPrettierEslintOptions,
  isLinterEslintAutofixEnabled,
  toggleFormatOnSave,
} = require('./index');
const textEditor = require('../../tests/mocks/textEditor');

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

describe('shouldDisplayErrors()', () => {
  it('is true if the user has chosen to silence errors', () => {
    const mockGet = jest.fn(() => true);
    atom = { config: { get: mockGet } };

    const actual = shouldDisplayErrors();

    expect(mockGet).lastCalledWith('prettier-atom.silenceErrors');
    expect(actual).toBe(false);
  });
});

describe('getPrettierEslintOptions()', () => {
  it('retrieves the given prettier-eslint options from the prettier-atom config', () => {
    const mockGet = jest.fn(() => true);
    atom = { config: { get: mockGet } };

    const actual = getPrettierEslintOptions();

    expect(mockGet).lastCalledWith('prettier-atom.prettierEslintOptions');
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

describe('getPrettierOptions()', () => {
  it('returns all prettier options', () => {
    const mockGet = option =>
      ({
        'prettier-atom.prettierOptions.printWidth': 80,
        'prettier-atom.prettierOptions.tabWidth': 2,
        'prettier-atom.prettierOptions.parser': 'flow',
        'prettier-atom.prettierOptions.singleQuote': true,
        'prettier-atom.prettierOptions.trailingComma': true,
        'prettier-atom.prettierOptions.bracketSpacing': true,
        'prettier-atom.prettierOptions.semi': true,
        'prettier-atom.prettierOptions.useTabs': true,
        'prettier-atom.prettierOptions.jsxBracketSameLine': true,
      }[option]);
    atom = { config: { get: mockGet } };
    const editor = textEditor();

    const actual = getPrettierOptions(editor);

    expect(actual).toMatchSnapshot();
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
