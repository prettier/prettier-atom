// @flow
const displayDebugInfo = require('./displayDebugInfo');

test('it displays a notification on Atom with package information', () => {
  let title;
  let options;

  atom = {
    getVersion: jest.fn(),
    config: {
      get: jest.fn(),
    },
    notifications: {
      addInfo: jest.fn((msg, opts) => {
        title = msg;
        options = opts;
      }),
    },
  };

  displayDebugInfo();
  expect(atom.notifications.addInfo).toHaveBeenCalled();
  expect(title).toContain('prettier-atom');
  // $FlowFixMe
  expect(typeof options.detail).toBe('string');
  // $FlowFixMe
  expect(options.detail.length).toBeGreaterThan(0);
  // $FlowFixMe
  expect(options.dismissable).toBe(true);
});
