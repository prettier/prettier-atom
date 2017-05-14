'use strict';

var _require = require('../atomInterface'),
    isFormatOnSaveEnabled = _require.isFormatOnSaveEnabled;

var getFormatOnSaveStatus = function getFormatOnSaveStatus() {
  return isFormatOnSaveEnabled() ? 'enabled' : 'disabled';
};

module.exports = getFormatOnSaveStatus;