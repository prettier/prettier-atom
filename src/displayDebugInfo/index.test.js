jest.mock('read-pkg-up');
jest.mock('../atomInterface');
jest.mock('../helpers/getPrettierPath');

const readPkgUp = require('read-pkg-up');
const displayDebugInfo = require('./index');
const { getAtomVersion, getPrettierAtomConfig, addInfoNotification } = require('../atomInterface');
const { getGlobalPrettierPath } = require('../helpers/getPrettierPath');

test('it displays a notification on Atom with package information', () => {
  let title;
  let options;
  addInfoNotification.mockImplementation((_title, _options) => {
    title = _title;
    options = _options;
  });
  readPkgUp.sync.mockImplementation(() => ({
    package: {
      version: 'FAKE_PACKAGE_VERSION',
    },
  }));
  getAtomVersion.mockImplementation(() => 'FAKE_ATOM_VERSION');
  getPrettierAtomConfig.mockImplementation(() => 'FAKE_PRETTIER_ATOM_CONFIG');
  getGlobalPrettierPath.mockImplementation(() => 'FAKE_PRETTIER_PATH');

  displayDebugInfo();

  expect(title).toContain('prettier-atom');
  expect(options.detail).toMatchSnapshot();
  expect(options.dismissable).toBe(true);
});
