'use strict';

var _require = require('./helpers'),
    getDebugInfo = _require.getDebugInfo;

var displayDebugInfo = function displayDebugInfo() {
  var info = getDebugInfo();
  var details = ['Atom version: ' + info.atomVersion, 'prettier-atom version: ' + info.prettierAtomVersion, 'prettier version: ' + info.prettierVersion, 'prettier-eslint version: ' + info.prettierESLintVersion, 'prettier-atom configuration: ' + JSON.stringify(info.prettierAtomConfig, null, 2)].join('\n');
  atom.notifications.addInfo('prettier-atom: details on current install', {
    detail: details,
    dismissable: true
  });
};

module.exports = displayDebugInfo;