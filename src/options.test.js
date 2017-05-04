const editorconfig = require('editorconfig');
const textEditor = require('../tests/mocks/textEditor');

const {
  shouldUseEslint,
  shouldDisplayErrors,
  getPrettierOption,
  getPrettierOptions,
  getPrettierEslintOption,
  getPrettierEslintOptions,
  getEditorConfigOptions,
  isWhitelistProvided,
  isLinterEslintAutofixEnabled,
} = require('./options');

jest.mock('editorconfig');

describe('shouldUseEslint', () => {
  test('is true if the config option is enabled', () => {
    const mockGet = jest.fn(() => true);
    atom = { config: { get: mockGet } };

    const actual = shouldUseEslint();
    const expected = true;

    expect(mockGet).toHaveBeenCalledWith('prettier-atom.useEslint');
    expect(actual).toBe(expected);
  });

  test('is false if the config option is not enabled', () => {
    const mockGet = jest.fn(() => false);
    atom = { config: { get: mockGet } };

    const actual = shouldUseEslint();
    const expected = false;

    expect(mockGet).toHaveBeenCalledWith('prettier-atom.useEslint');
    expect(actual).toBe(expected);
  });
});

describe('shouldDisplayErrors', () => {
  test('is true if the user has chosen to silence errors', () => {
    const mockGet = jest.fn(() => true);
    atom = { config: { get: mockGet } };

    const actual = shouldDisplayErrors();
    const expected = false;

    expect(mockGet).lastCalledWith('prettier-atom.silenceErrors');
    expect(actual).toBe(expected);
  });
});

describe('getPrettierOption', () => {
  test('retrieves the given prettier option from the prettier-atom config', () => {
    const mockGet = jest.fn(() => 'auto');
    atom = { config: { get: mockGet } };

    const actual = getPrettierOption('tabWidth');
    const expected = 'auto';

    expect(mockGet).lastCalledWith('prettier-atom.prettierOptions.tabWidth');
    expect(actual).toBe(expected);
  });
});

describe('getPrettierEslintOption', () => {
  test('retrieves the given prettier-eslint option from the prettier-atom config', () => {
    const mockGet = jest.fn(() => true);
    atom = { config: { get: mockGet } };

    const actual = getPrettierEslintOption('prettierLast');
    const expected = true;

    expect(mockGet).lastCalledWith('prettier-atom.prettierEslintOptions.prettierLast');
    expect(actual).toBe(expected);
  });
});

describe('getPrettierOptions', () => {
  test('returns all prettier options', () => {
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

  test('uses the editor tab width if config is set to "auto"', () => {
    const mockGet = option =>
      (option === 'editor.tabLength'
        ? 8
        : {
          'prettier-atom.prettierOptions.printWidth': 80,
          'prettier-atom.prettierOptions.tabWidth': 'auto',
          'prettier-atom.prettierOptions.parser': 'flow',
          'prettier-atom.prettierOptions.singleQuote': true,
          'prettier-atom.prettierOptions.trailingComma': true,
          'prettier-atom.prettierOptions.bracketSpacing': true,
          'prettier-atom.prettierOptions.semi': true,
          'prettier-atom.prettierOptions.useTabs': true,
          'prettier-atom.prettierOptions.jsxBracketSameLine': true,
        }[option]);
    atom = { config: { get: mockGet } };
    const editor = textEditor({ getLastCursor: () => ({ getScopeDescriptor: () => 'source.js.jsx' }) });

    const actual = getPrettierOptions(editor).tabWidth;
    const expected = 8;

    expect(actual).toEqual(expected);
  });

  test('uses the editorconfig options if provided', () => {
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
    editorconfig.parseSync.mockImplementation(() => ({
      tab_width: 4,
      max_line_length: 100,
      indent_style: 'space',
    }));
    const editor = textEditor();

    const actual = getPrettierOptions(editor);
    expect(actual).toMatchSnapshot();
  });
});

describe('getEditorConfigOptions', () => {
  test('maps editorconfig options', () => {
    editorconfig.parseSync.mockImplementation(() => ({
      indent_size: 4,
      end_of_line: 'lf',
      charset: 'utf-8',
      trim_trailing_whitespace: true,
      insert_final_newline: true,
      tab_width: 2,
      max_line_length: 100,
    }));
    const actual = getEditorConfigOptions('filename.js');
    const expected = {
      tabWidth: 2,
      printWidth: 100,
    };
    expect(actual).toEqual(expected);
    expect(editorconfig.parseSync).toHaveBeenCalledWith('filename.js');
  });

  describe('returns boolean value for useTabs option', () => {
    test('when indent style is tab', () => {
      editorconfig.parseSync.mockImplementation(() => ({
        indent_style: 'tab',
      }));
      const actual = getEditorConfigOptions('filename.js').useTabs;
      const expected = true;
      expect(actual).toEqual(expected);
    });
    test('when indent style is space', () => {
      editorconfig.parseSync.mockImplementation(() => ({
        indent_style: 'space',
      }));
      const actual = getEditorConfigOptions('filename.js').useTabs;
      const expected = false;
      expect(actual).toEqual(expected);
    });
  });
});

describe('getPrettierEslintOptions', () => {
  test('returns all prettier-eslint options', () => {
    const mockGet = option =>
      ({
        'prettier-atom.prettierEslintOptions.prettierLast': true,
      }[option]);
    atom = { config: { get: mockGet } };
    const actual = getPrettierEslintOptions();

    expect(actual).toMatchSnapshot();
  });
});

describe('isLinterEslintAutofixEnabled', () => {
  test('returns the value from the linter-eslint config', () => {
    atom = { config: { get: jest.fn(() => true) } };

    const actual = isLinterEslintAutofixEnabled();
    const expected = true;

    expect(atom.config.get).toHaveBeenCalledWith('linter-eslint.fixOnSave');
    expect(actual).toBe(expected);
  });
});

describe('isWhitelistProvided', () => {
  test('returns true if there are whitelist items provided', () => {
    atom = { config: { get: jest.fn(() => ['*.js']) } };
    const actual = isWhitelistProvided();
    const expected = true;
    expect(atom.config.get).toHaveBeenCalledWith('prettier-atom.formatOnSaveOptions.whitelistedGlobs');
    expect(actual).toBe(expected);
  });

  test('returns false if the whitelist is empty', () => {
    atom = { config: { get: jest.fn(() => []) } };
    const actual = isWhitelistProvided();
    const expected = false;
    expect(atom.config.get).toHaveBeenCalledWith('prettier-atom.formatOnSaveOptions.whitelistedGlobs');
    expect(actual).toBe(expected);
  });
});
