'use strict';

const { isFormatOnSaveEnabled } = require('../atomInterface');

const getFormatOnSaveStatus = () => isFormatOnSaveEnabled() ? 'enabled' : 'disabled';

module.exports = getFormatOnSaveStatus;