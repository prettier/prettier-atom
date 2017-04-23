const { getConfigOption, setConfigOption } = require('./helpers');

const toggleFormatOnSave = () => {
  const key = 'formatOnSaveOptions.enabled';
  setConfigOption(key, !getConfigOption(key));
};

module.exports = toggleFormatOnSave;
