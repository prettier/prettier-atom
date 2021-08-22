// @flow
const { isFormatOnSaveEnabled } = require('../atomInterface');

const getFormatOnSaveStatus = (): string => (isFormatOnSaveEnabled() ? 'enabled' : 'disabled');

module.exports = getFormatOnSaveStatus;
