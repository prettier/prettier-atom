'use strict';

var _require = require('./helpers'),
    getConfigOption = _require.getConfigOption;

var tooltip = null;

var getFormatOnSaveStatus = function getFormatOnSaveStatus() {
  return getConfigOption('formatOnSaveOptions.enabled') ? 'enabled' : 'disabled';
};

var createStatusTile = function createStatusTile() {
  var element = document.createElement('div');
  element.classList.add('prettier-atom-status-tile');
  element.classList.add('inline-block');
  element.dataset.formatOnSave = getFormatOnSaveStatus();

  element.appendChild(document.createTextNode('Prettier'));

  return element;
};

var updateStatusTile = function updateStatusTile(disposable, element) {
  // eslint-disable-next-line no-param-reassign
  element.dataset.formatOnSave = getFormatOnSaveStatus();

  if (tooltip) {
    tooltip.dispose();
  }
  tooltip = atom.tooltips.add(element, { title: 'Format on Save: ' + getFormatOnSaveStatus() });
  disposable.add(tooltip);
};

module.exports = {
  createStatusTile: createStatusTile,
  updateStatusTile: updateStatusTile
};