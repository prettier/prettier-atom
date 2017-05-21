'use strict';

var _require = require('../atomInterface'),
    shouldUseEslint = _require.shouldUseEslint,
    isLinterEslintAutofixEnabled = _require.isLinterEslintAutofixEnabled,
    addWarningNotification = _require.addWarningNotification;

var MESSAGE = "prettier-atom: linter-eslint's `Fix on Save` feature is currently enabled. " + 'We recommend disabling this feature when using the ESlint integration from prettier-atom';
var OPTIONS = { dismissable: true };

var displayWarning = function displayWarning() {
  return addWarningNotification(MESSAGE, OPTIONS);
};

var warnAboutLinterEslintFixOnSave = function warnAboutLinterEslintFixOnSave() {
  return shouldUseEslint() && isLinterEslintAutofixEnabled() && displayWarning();
};

module.exports = warnAboutLinterEslintFixOnSave;