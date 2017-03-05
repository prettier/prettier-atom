// @flow
const helpers = require('./helpers');
const warnAboutLinterEslintFixOnSave = require('./warnAboutLinterEslintFixOnSave');

jest.mock('./helpers');

beforeEach(() => {
  atom = { notifications: { addWarning: jest.fn() } };
  // $FlowFixMe
  helpers.isLinterEslintAutofixEnabled.mockImplementation(() => true);
  // $FlowFixMe
  helpers.shouldUseEslint.mockImplementation(() => true);
});

test('it warns about not having eslint autofix on', () => {
  warnAboutLinterEslintFixOnSave();

  // $FlowFixMe
  expect(atom.notifications.addWarning).toHaveBeenCalled();
});

test('it does not warn if eslint autofix is disabled', () => {
  // $FlowFixMe
  helpers.isLinterEslintAutofixEnabled.mockImplementation(() => false);

  warnAboutLinterEslintFixOnSave();

  // $FlowFixMe
  expect(atom.notifications.addWarning).not.toHaveBeenCalled();
});

test('it does not warn if eslint integration is disabled', () => {
  // $FlowFixMe
  helpers.shouldUseEslint.mockImplementation(() => false);

  warnAboutLinterEslintFixOnSave();

  // $FlowFixMe
  expect(atom.notifications.addWarning).not.toHaveBeenCalled();
});
