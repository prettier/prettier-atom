// @flow
const { getConfigOption } = require('./helpers');

let tooltip: Atom$Disposable = null;

const getFormatOnSaveStatus = () => getConfigOption('formatOnSaveOptions.enabled') ? 'enabled' : 'disabled';

const createStatusTile = () => {
  const element = document.createElement('div');
  element.classList.add('prettier-atom-status-tile');
  element.classList.add('inline-block');
  element.dataset.formatOnSave = getFormatOnSaveStatus();

  element.appendChild(document.createTextNode('Prettier'));

  return element;
};

const disposeTooltip = () => {
  if (tooltip) {
    tooltip.dispose();
  }
};

const updateStatusTile = (disposable: Atom$Disposable, element: HTMLElement) => {
  // eslint-disable-next-line no-param-reassign
  element.dataset.formatOnSave = getFormatOnSaveStatus();

  disposeTooltip();

  tooltip = atom.tooltips.add(element, { title: `Format on Save: ${getFormatOnSaveStatus()}` });
  disposable.add(tooltip);

  return tooltip;
};

module.exports = {
  createStatusTile,
  updateStatusTile,
  disposeTooltip,
};
