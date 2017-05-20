'use strict';

var _require = require('../atomInterface'),
    shouldUseEslint = _require.shouldUseEslint,
    isLinterEslintAutofixEnabled = _require.isLinterEslintAutofixEnabled,
    addWarningNotification = _require.addWarningNotification,
    isPackageActive = _require.isPackageActive;

var MESSAGE = "prettier-atom: linter-eslint's `Fix on Save` feature is currently enabled. " + 'We recommend disabling this feature when using the ESlint integration from prettier-atom';
var OPTIONS = { dismissable: true };

var isLinterEslintActive = function isLinterEslintActive() {
  return isPackageActive('linter-eslint');
};

var displayWarning = function displayWarning() {
  return addWarningNotification(MESSAGE, OPTIONS);
};

var warnAboutLinterEslintFixOnSave = function warnAboutLinterEslintFixOnSave() {
  return isLinterEslintActive() && shouldUseEslint() && isLinterEslintAutofixEnabled() && displayWarning();
};

module.exports = warnAboutLinterEslintFixOnSave;