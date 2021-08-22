// @flow
const { disposeTooltip, setTooltip } = require('./tooltip');
const getFormatOnSaveStatus = require('./getFormatOnSaveStatus');
const { addTooltip } = require('../atomInterface');

const updateStatusTile = (disposable: Atom$Disposable, element: HTMLElement): Atom$Disposable => {
  disposeTooltip();

  const formatStatus = getFormatOnSaveStatus();

  if (formatStatus === 'enabled') {
    element.classList.add('text-success');
  } else {
    element.classList.remove('text-success');
  }

  element.dataset.prettierFormatOnSave = formatStatus; // eslint-disable-line no-param-reassign

  const newTooltip = addTooltip(element, {
    title: `Format on Save: ${getFormatOnSaveStatus()}<br>Click to toggle`,
  });

  setTooltip(newTooltip);
  disposable.add(newTooltip);

  return newTooltip;
};

module.exports = updateStatusTile;
