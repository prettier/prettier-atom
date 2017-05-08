// @flow
const options = require('./options');
const warnAboutLinterEslintFixOnSave = require('./warnAboutLinterEslintFixOnSave');

jest.mock('./options');

beforeEach(() => {
  atom = { notifications: { addWarning: jest.fn() } };
  // $FlowFixMe
  options.isLinterEslintAutofixEnabled.mockImplementation(() => true);
  // $FlowFixMe
  options.shouldUseEslint.mockImplementation(() => true);
});

test('it warns about not having eslint autofix on', () => {
  warnAboutLinterEslintFixOnSave();

  // $FlowFixMe
  expect(atom.notifications.addWarning).toHaveBeenCalled();
});

test('it does not warn if eslint autofix is disabled', () => {
  // $FlowFixMe
  options.isLinterEslintAutofixEnabled.mockImplementation(() => false);

  warnAboutLinterEslintFixOnSave();

  // $FlowFixMe
  expect(atom.notifications.addWarning).not.toHaveBeenCalled();
});

test('it does not warn if eslint integration is disabled', () => {
  // $FlowFixMe
  options.shouldUseEslint.mockImplementation(() => false);

  warnAboutLinterEslintFixOnSave();

  // $FlowFixMe
  expect(atom.notifications.addWarning).not.toHaveBeenCalled();
});
