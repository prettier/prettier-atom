'use strict';

const { shouldUseEslint, isLinterEslintAutofixEnabled, addWarningNotification } = require('../atomInterface');

const MESSAGE = "prettier-atom: linter-eslint's `Fix on Save` feature is currently enabled. " + 'We recommend disabling this feature when using the ESlint integration from prettier-atom';
const OPTIONS = { dismissable: true };

const displayWarning = () => addWarningNotification(MESSAGE, OPTIONS);

const warnAboutLinterEslintFixOnSave = () => shouldUseEslint() && isLinterEslintAutofixEnabled() && displayWarning();

module.exports = warnAboutLinterEslintFixOnSave;