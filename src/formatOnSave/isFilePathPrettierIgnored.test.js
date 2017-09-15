const path = require('path');
const isFilePathPrettierIgnored = require('./isFilePathPrettierIgnored');

it('returns true if the filepath is prettierignored', () => {
  const filePath = path.join(__dirname, '..', '..', 'tests', 'fixtures', 'matchesPrettierignore.js');

  const actual = isFilePathPrettierIgnored(filePath);

  expect(actual).toBe(true);
});

it('returns false if the filepath is not prettierignored', () => {
  const filePath = path.join(__dirname, '..', '..', 'tests', 'fixtures', 'doesNotMatchPrettierignore.js');

  const actual = isFilePathPrettierIgnored(filePath);

  expect(actual).toBe(false);
});

it('returns false if no .prettierignore file can be found', () => {
  const filePath = '';

  const actual = isFilePathPrettierIgnored(filePath);

  expect(actual).toBe(false);
});
