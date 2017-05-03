'use strict';

var _require = require('./helpers'),
    getConfigOption = _require.getConfigOption,
    setConfigOption = _require.setConfigOption;

var toggleFormatOnSave = function toggleFormatOnSave() {
  var key = 'formatOnSaveOptions.enabled';
  setConfigOption(key, !getConfigOption(key));
};

module.exports = toggleFormatOnSave;