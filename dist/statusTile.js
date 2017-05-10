'use strict';

var _require = require('./helpers'),
    getConfigOption = _require.getConfigOption;

var toggleFormatOnSave = require('./toggleFormatOnSave');

var tooltip = null;

var getFormatOnSaveStatus = function getFormatOnSaveStatus() {
  return getConfigOption('formatOnSaveOptions.enabled') ? 'enabled' : 'disabled';
};

var createStatusTile = function createStatusTile() {
  var element = document.createElement('div');
  element.classList.add('prettier-atom-status-tile');
  element.classList.add('inline-block');
  element.dataset.formatOnSave = getFormatOnSaveStatus();
  element.addEventListener('click', toggleFormatOnSave);

  element.appendChild(document.createTextNode('Prettier'));

  return element;
};

var disposeTooltip = function disposeTooltip() {
  if (tooltip) {
    tooltip.dispose();
  }
};

var updateStatusTile = function updateStatusTile(disposable, element) {
  // eslint-disable-next-line no-param-reassign
  element.dataset.formatOnSave = getFormatOnSaveStatus();

  disposeTooltip();

  tooltip = atom.tooltips.add(element, { title: 'Format on Save: ' + getFormatOnSaveStatus() });
  disposable.add(tooltip);

  return tooltip;
};

module.exports = {
  createStatusTile: createStatusTile,
  updateStatusTile: updateStatusTile,
  disposeTooltip: disposeTooltip
};