jest.mock('./buildPrettierOptions');
jest.mock('../atomInterface');
jest.mock('../editorInterface');

const buildMockEditor = require('../../tests/mocks/textEditor');
const { getCurrentFilePath } = require('../editorInterface');
const buildPrettierOptions = require('./buildPrettierOptions');
const buildPrettierStylelintOptions = require('./buildPrettierStylelintOptions');

it('returns options for running prettier stylelint', () => {
  buildPrettierOptions.mockImplementation(() => ({ tabWidth: 2 }));
  getCurrentFilePath.mockImplementation(() => 'xyz.css');
  const editor = buildMockEditor();
  const text = 'const foo = null;';

  const actual = buildPrettierStylelintOptions(editor, text);
  const expected = {
    text,
    filePath: 'xyz.css',
    prettierOptions: {
      tabWidth: 2,
    },
  };

  expect(actual).toEqual(expected);
});
