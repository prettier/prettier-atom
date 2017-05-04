'use strict';

var _require = require('./options'),
    shouldUseEslint = _require.shouldUseEslint,
    isLinterEslintAutofixEnabled = _require.isLinterEslintAutofixEnabled;

var message = "prettier-atom: linter-eslint's `Fix on Save` feature is currently enabled. " + 'We recommend disabling this feature when using the ESlint integration from prettier-atom';

var options = { dismissable: true };

// $FlowFixMe
var displayWarning = function displayWarning() {
  return atom.notifications.addWarning(message, options);
};

var warnAboutLinterEslintFixOnSave = function warnAboutLinterEslintFixOnSave() {
  return shouldUseEslint() && isLinterEslintAutofixEnabled() && displayWarning();
};

module.exports = warnAboutLinterEslintFixOnSave;