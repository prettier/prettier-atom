jest.mock('read-pkg-up');
jest.mock('../editorInterface');
jest.mock('../atomInterface');

const readPkgUp = require('read-pkg-up');
const { getCurrentDir } = require('../editorInterface');
const { shouldUseEslint } = require('../atomInterface');
const isPrettierInPackageJson = require('./isPrettierInPackageJson');

describe('when shouldUseEslint is false', () => {
  beforeEach(() => {
    shouldUseEslint.mockImplementation(() => false);
  });

  it('calls read-pkg-up with the current filepath', () => {
    getCurrentDir.mockImplementation(() => '/parent-dir-of-file');

    isPrettierInPackageJson();

    expect(readPkgUp.sync).toHaveBeenCalledWith({ cwd: '/parent-dir-of-file' });
  });

  it('is true if prettier is a dependency', () => {
    readPkgUp.sync.mockImplementation(() => ({ pkg: { dependencies: { prettier: '^0.0.1' } } }));

    const actual = isPrettierInPackageJson();

    expect(actual).toBe(true);
  });

  it('is true if prettier is a dev dependency', () => {
    readPkgUp.sync.mockImplementation(() => ({ pkg: { devDependencies: { prettier: '^0.0.1' } } }));

    const actual = isPrettierInPackageJson();

    expect(actual).toBe(true);
  });

  it('is false if prettier is not a dependency', () => {
    const actual = isPrettierInPackageJson();

    expect(actual).toBe(false);
  });
});

describe('when shouldUseEslint is true', () => {
  beforeEach(() => {
    shouldUseEslint.mockImplementation(() => true);
  });

  it('calls read-pkg-up with the current filepath', () => {
    getCurrentDir.mockImplementation(() => '/parent-dir-of-file');

    isPrettierInPackageJson();

    expect(readPkgUp.sync).toHaveBeenCalledWith({ cwd: '/parent-dir-of-file' });
  });

  it('is true if prettier-eslint is a dependency', () => {
    readPkgUp.sync.mockImplementation(() => ({ pkg: { dependencies: { 'prettier-eslint': '^0.0.1' } } }));

    const actual = isPrettierInPackageJson();

    expect(actual).toBe(true);
  });

  it('is true if prettier-eslint is a dev dependency', () => {
    readPkgUp.sync.mockImplementation(() => ({ pkg: { devDependencies: { 'prettier-eslint': '^0.0.1' } } }));

    const actual = isPrettierInPackageJson();

    expect(actual).toBe(true);
  });

  it('is true if prettier-eslint-cli is a dependency', () => {
    readPkgUp.sync.mockImplementation(() => ({ pkg: { dependencies: { 'prettier-eslint-cli': '^0.0.1' } } }));

    const actual = isPrettierInPackageJson();

    expect(actual).toBe(true);
  });

  it('is true if prettier-eslint-cli is a dev dependency', () => {
    readPkgUp.sync.mockImplementation(() => ({
      pkg: { devDependencies: { 'prettier-eslint-cli': '^0.0.1' } },
    }));

    const actual = isPrettierInPackageJson();

    expect(actual).toBe(true);
  });

  it('is false if neither prettier-eslint nor prettier-eslint-cli are dependencies', () => {
    const actual = isPrettierInPackageJson();

    expect(actual).toBe(false);
  });
});
