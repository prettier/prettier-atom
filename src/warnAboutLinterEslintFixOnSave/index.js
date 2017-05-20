// @flow
const {
  shouldUseEslint,
  isLinterEslintAutofixEnabled,
  addWarningNotification,
  isPackageActive,
} = require('../atomInterface');

const MESSAGE =
  "prettier-atom: linter-eslint's `Fix on Save` feature is currently enabled. " +
  'We recommend disabling this feature when using the ESlint integration from prettier-atom';
const OPTIONS = { dismissable: true };

const isLinterEslintActive = () => isPackageActive('linter-eslint');

const displayWarning = () => addWarningNotification(MESSAGE, OPTIONS);

const warnAboutLinterEslintFixOnSave = () =>
  isLinterEslintActive() && shouldUseEslint() && isLinterEslintAutofixEnabled() && displayWarning();

module.exports = warnAboutLinterEslintFixOnSave;
