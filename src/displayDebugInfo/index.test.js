jest.mock('read-pkg');
jest.mock('../atomInterface');

const readPkg = require('read-pkg');
const displayDebugInfo = require('./index');
const { getAtomVersion, getPrettierAtomConfig, addInfoNotification } = require('../atomInterface');

test('it displays a notification on Atom with package information', () => {
  let title;
  let options;
  addInfoNotification.mockImplementation((_title, _options) => {
    title = _title;
    options = _options;
  });
  readPkg.sync.mockImplementation(() => ({ version: 'FAKE_PACKAGE_VERSION' }));
  getAtomVersion.mockImplementation(() => 'FAKE_ATOM_VERSION');
  getPrettierAtomConfig.mockImplementation(() => 'FAKE_PRETTIER_ATOM_CONFIG');

  displayDebugInfo();

  expect(title).toContain('prettier-atom');
  expect(options.detail).toMatchSnapshot();
  expect(options.dismissable).toBe(true);
});
