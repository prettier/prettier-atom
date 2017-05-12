jest.mock('./buildPrettierOptions');
jest.mock('../atomInterface');
jest.mock('../editorInterface');

const buildMockEditor = require('../../tests/mocks/textEditor');
const { getCurrentFilePath } = require('../editorInterface');
const { getPrettierEslintOptions } = require('../atomInterface');
const buildPrettierOptions = require('./buildPrettierOptions');
const buildPrettierEslintOptions = require('./buildPrettierEslintOptions');

it('returns options for running prettier eslint', () => {
  buildPrettierOptions.mockImplementation(() => ({ tabWidth: 2 }));
  getPrettierEslintOptions.mockImplementation(() => ({ prettierLast: true }));
  getCurrentFilePath.mockImplementation(() => 'xyz.js');
  const editor = buildMockEditor();
  const text = 'const foo = null;';

  const actual = buildPrettierEslintOptions(editor, text);
  const expected = {
    text,
    prettierLast: true,
    filePath: 'xyz.js',
    fallbackPrettierOptions: {
      tabWidth: 2,
    },
  };

  expect(actual).toEqual(expected);
});
