jest.mock('../atomInterface');

const {
  isLinterEslintAutofixEnabled,
  shouldUseEslint,
  addWarningNotification,
  isPackageActive,
} = require('../atomInterface');
const warnAboutLinterEslintFixOnSave = require('./index');

test('it warns about not having eslint autofix on', () => {
  isPackageActive.mockImplementation(() => true);
  isLinterEslintAutofixEnabled.mockImplementation(() => true);
  shouldUseEslint.mockImplementation(() => true);

  warnAboutLinterEslintFixOnSave();

  expect(addWarningNotification).toHaveBeenCalled();
});

test('it does not warn if eslint autofix is disabled', () => {
  isPackageActive.mockImplementation(() => true);
  isLinterEslintAutofixEnabled.mockImplementation(() => false);
  shouldUseEslint.mockImplementation(() => true);

  warnAboutLinterEslintFixOnSave();

  expect(addWarningNotification).not.toHaveBeenCalled();
});

test('it does not warn if eslint integration is disabled', () => {
  isPackageActive.mockImplementation(() => true);
  isLinterEslintAutofixEnabled.mockImplementation(() => true);
  shouldUseEslint.mockImplementation(() => false);

  warnAboutLinterEslintFixOnSave();

  expect(addWarningNotification).not.toHaveBeenCalled();
});

test('it checks if linter-eslint is active before displaying the warning', () => {
  isPackageActive.mockImplementation(() => false);

  warnAboutLinterEslintFixOnSave();

  expect(isPackageActive).toHaveBeenCalledWith('linter-eslint');
});
