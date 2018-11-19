jest.mock('atom-linter');

const prettier = require('prettier');
const path = require('path');
const atomLinter = require('atom-linter');
const globalModules = require('global-modules');
const yarnGlobalModules = require('yarn-global-modules')();
const createMockTextEditor = require('../../tests/mocks/textEditor');
const getPrettierInstance = require('./getPrettierInstance');

test("returns user's project's local prettier instance if it exists", () => {
  const filePath = path.join(__dirname, '..', '..', 'tests', 'fixtures', 'sourceFile.js');
  const file = { path: filePath, getPath: () => filePath };
  const editor = createMockTextEditor({ buffer: { file } });
  const prettierLib = path.join(__dirname, '..', '..', 'tests', 'fixtures', 'prettier.js');
  atomLinter.findCached.mockImplementation(() => prettierLib);

  const actual = getPrettierInstance(editor);

  expect(actual).toEqual(require(prettierLib)); // eslint-disable-line
  expect(atomLinter.findCached).toHaveBeenCalledWith(
    path.join(__dirname, '..', '..', 'tests', 'fixtures'),
    path.join('node_modules', 'prettier', 'index.js'),
  );
});

test("returns global prettier (by npm) if user's project has no local prettier package", () => {
  const filePath = path.join(__dirname, 'sourceFile.js');
  const file = { getPath: () => filePath };
  const editor = createMockTextEditor({ buffer: { file } });
  const fakeGloballyInstalledPrettier = path.join(__dirname, '..', '..', 'tests', 'fixtures', 'prettier.js');
  atomLinter.findCached.mockImplementation(
    dir => (dir === globalModules ? fakeGloballyInstalledPrettier : null),
  );

  const actual = getPrettierInstance(editor);

  expect(actual).toEqual(require(fakeGloballyInstalledPrettier)); // eslint-disable-line
  expect(atomLinter.findCached).toHaveBeenCalledTimes(2);
  expect(atomLinter.findCached).toHaveBeenLastCalledWith(
    globalModules,
    path.join('node_modules', 'prettier', 'index.js'),
  );
});

test("returns global prettier (by yarn) if user's project has no local prettier package", () => {
  const filePath = path.join(__dirname, 'sourceFile.js');
  const file = { getPath: () => filePath };
  const editor = createMockTextEditor({ buffer: { file } });
  const fakeGloballyInstalledPrettier = path.join(__dirname, '..', '..', 'tests', 'fixtures', 'prettier.js');
  atomLinter.findCached.mockImplementation(
    dir => (dir === yarnGlobalModules ? fakeGloballyInstalledPrettier : null),
  );

  const actual = getPrettierInstance(editor);

  expect(actual).toEqual(require(fakeGloballyInstalledPrettier)); // eslint-disable-line
  expect(atomLinter.findCached).toHaveBeenCalledTimes(3);
  expect(atomLinter.findCached).toHaveBeenLastCalledWith(
    yarnGlobalModules,
    path.join('node_modules', 'prettier', 'index.js'),
  );
});

test("returns bundled prettier if user's project has no local prettier package", () => {
  atomLinter.findCached.mockImplementation(() => undefined);
  const filePath = path.join(__dirname, 'sourceFile.js');
  const file = { path: filePath, getPath: () => filePath };
  const editor = createMockTextEditor({ buffer: { file } });

  const actual = getPrettierInstance(editor);

  expect(actual).toEqual(prettier);
});

test('returns bundled prettier if filePath is null', () => {
  const file = { path: null, getPath: () => null };
  const editor = createMockTextEditor({ buffer: { file } });

  const actual = getPrettierInstance(editor);

  expect(actual).toEqual(prettier);
});

test('returns bundled prettier if filePath has no parent directory', () => {
  const file = { path: 'foo.js', getPath: () => 'foo.js' };
  const editor = createMockTextEditor({ buffer: { file } });

  const actual = getPrettierInstance(editor);

  expect(actual).toEqual(prettier);
});
