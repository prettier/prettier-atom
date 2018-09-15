const path = require('path');
const isFilePathTslintIgnored = require('./isFilePathTslintIgnored');

it('returns true if the filepath is tslintignored', () => {
  const filePath = path.join(__dirname, '..', '..', 'tests', 'fixtures', 'matchesTslintignore.js');

  const actual = isFilePathTslintIgnored(filePath);

  expect(actual).toBe(true);
});

it('returns false if the filepath is not tslintignored', () => {
  const filePath = path.join(__dirname, '..', '..', 'tests', 'fixtures', 'doesNotMatchTslintignore.js');

  const actual = isFilePathTslintIgnored(filePath);

  expect(actual).toBe(false);
});

it('returns false if no .tslintignore file can be found', () => {
  const filePath = '';

  const actual = isFilePathTslintIgnored(filePath);

  expect(actual).toBe(false);
});
