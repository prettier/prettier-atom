// @flow
const toggleFormatOnSave = require('./toggleFormatOnSave');
const { getConfigOption } = require('./helpers');

test('it toggles the state of prettier-atom\'s option formatOnSaveOptions.enabled', () => {
  let enabled = false;
  atom = {
    config: {
      get: jest.fn(() => enabled),
      set: jest.fn((key, value) => (enabled = value)),
    },
  };

  toggleFormatOnSave();
  expect(getConfigOption('...')).toBe(true);
  toggleFormatOnSave();
  expect(getConfigOption('...')).toBe(false);
});
