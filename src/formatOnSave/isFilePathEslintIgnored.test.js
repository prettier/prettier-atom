const path = require('path');
const isFilePathEslintIgnored = require('./isFilePathEslintIgnored');

it('returns true if the filepath is eslintignored', () => {
  const filePath = path.join(__dirname, '..', '..', 'tests', 'fixtures', 'matchesEslintignore.js');

  const actual = isFilePathEslintIgnored(filePath);

  expect(actual).toBe(true);
});

it('returns false if the filepath is not eslintignored', () => {
  const filePath = path.join(__dirname, '..', '..', 'tests', 'fixtures', 'doesNotMatchEslintignore.js');

  const actual = isFilePathEslintIgnored(filePath);

  expect(actual).toBe(false);
});

it('returns false if no .eslintignore file can be found', () => {
  const filePath = '';

  const actual = isFilePathEslintIgnored(filePath);

  expect(actual).toBe(false);
});
