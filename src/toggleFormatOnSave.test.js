// @flow
const toggleFormatOnSave = require('./toggleFormatOnSave');

test('it sets formatOnSaveOptions.enabled to false if it was true', () => {
  atom = {
    config: {
      get: jest.fn(() => true),
      set: jest.fn(),
    },
  };

  toggleFormatOnSave();

  expect(atom.config.set).toHaveBeenCalledWith('prettier-atom.formatOnSaveOptions.enabled', false);
});

test('it sets formatOnSaveOptions.enabled to true if it was false', () => {
  atom = {
    config: {
      get: jest.fn(() => false),
      set: jest.fn(),
    },
  };

  toggleFormatOnSave();

  expect(atom.config.set).toHaveBeenCalledWith('prettier-atom.formatOnSaveOptions.enabled', true);
});
