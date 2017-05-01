// @flow
const { getConfigOption, setConfigOption } = require('./helpers');

const FORMAT_ON_SAVE = 'formatOnSaveOptions.enabled';

const toggleFormatOnSave = () => {
  setConfigOption(FORMAT_ON_SAVE, !getConfigOption(FORMAT_ON_SAVE));
};

module.exports = toggleFormatOnSave;
