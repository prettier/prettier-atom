"use strict";

jest.mock('../atomInterface');

const {
  isLinterEslintAutofixEnabled,
  shouldUseEslint,
  addWarningNotification
} = require('../atomInterface');

const warnAboutLinterEslintFixOnSave = require('./index');

test('it warns about not having eslint autofix on', () => {
  isLinterEslintAutofixEnabled.mockImplementation(() => true);
  shouldUseEslint.mockImplementation(() => true);
  warnAboutLinterEslintFixOnSave();
  expect(addWarningNotification).toHaveBeenCalled();
});
test('it does not warn if eslint autofix is disabled', () => {
  isLinterEslintAutofixEnabled.mockImplementation(() => false);
  shouldUseEslint.mockImplementation(() => true);
  warnAboutLinterEslintFixOnSave();
  expect(addWarningNotification).not.toHaveBeenCalled();
});
test('it does not warn if eslint integration is disabled', () => {
  isLinterEslintAutofixEnabled.mockImplementation(() => true);
  shouldUseEslint.mockImplementation(() => false);
  warnAboutLinterEslintFixOnSave();
  expect(addWarningNotification).not.toHaveBeenCalled();
});