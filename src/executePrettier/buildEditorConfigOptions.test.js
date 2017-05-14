jest.mock('editorconfig');

const editorconfig = require('editorconfig');
const buildEditorConfigOptions = require('./buildEditorConfigOptions');

describe('tabWidth', () => {
  it("is set to the tab_width if defined and indent_style is set to 'tab'", () => {
    editorconfig.parseSync.mockImplementation(() => ({ indent_style: 'tab', tab_width: 2 }));

    const actual = buildEditorConfigOptions();

    expect(actual).toHaveProperty('tabWidth', 2);
  });

  it("is set to the tab_width if indent_size is set to 'tab'", () => {
    editorconfig.parseSync.mockImplementation(() => ({ tab_width: 2, indent_size: 'tab' }));

    const actual = buildEditorConfigOptions();

    expect(actual).toHaveProperty('tabWidth', 2);
  });

  it("is set to the indent_size if is number and indent_style is not 'tab'", () => {
    editorconfig.parseSync.mockImplementation(() => ({ indent_size: 2 }));

    const actual = buildEditorConfigOptions();

    expect(actual).toHaveProperty('tabWidth', 2);
  });

  it('is not set if indent_size is not defined', () => {
    editorconfig.parseSync.mockImplementation(() => ({}));

    const actual = buildEditorConfigOptions().tabWidth;

    expect(actual).toBeUndefined();
  });
});

describe('printWidth', () => {
  it('is set to the max_line_length if it is a number', () => {
    editorconfig.parseSync.mockImplementation(() => ({ max_line_length: 80 }));

    const actual = buildEditorConfigOptions();

    expect(actual).toHaveProperty('printWidth', 80);
  });

  it("is not set if max_line_length is set to 'off'", () => {
    editorconfig.parseSync.mockImplementation(() => ({ max_line_length: 'off' }));

    const actual = buildEditorConfigOptions();

    expect(actual).not.toHaveProperty('printWidth');
  });

  it('is not set if max_line_length is not defined', () => {
    editorconfig.parseSync.mockImplementation(() => ({}));

    const actual = buildEditorConfigOptions();

    expect(actual).not.toHaveProperty('printWidth');
  });
});

describe('useTabs', () => {
  it('is false if indent_style is space', () => {
    editorconfig.parseSync.mockImplementation(() => ({ indent_style: 'space' }));

    const actual = buildEditorConfigOptions();

    expect(actual).toHaveProperty('useTabs', false);
  });

  it('is true if indent_style is tab', () => {
    editorconfig.parseSync.mockImplementation(() => ({ indent_style: 'tab' }));

    const actual = buildEditorConfigOptions();

    expect(actual).toHaveProperty('useTabs', true);
  });

  it('does not get set if indent_style is not defined', () => {
    editorconfig.parseSync.mockImplementation(() => ({}));

    const actual = buildEditorConfigOptions();

    expect(actual).not.toHaveProperty('useTabs');
  });
});
