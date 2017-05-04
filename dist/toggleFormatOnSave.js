'use strict';

var _require = require('./helpers'),
    getConfigOption = _require.getConfigOption,
    setConfigOption = _require.setConfigOption;

var FORMAT_ON_SAVE = 'formatOnSaveOptions.enabled';

var toggleFormatOnSave = function toggleFormatOnSave() {
  setConfigOption(FORMAT_ON_SAVE, !getConfigOption(FORMAT_ON_SAVE));
};

module.exports = toggleFormatOnSave;