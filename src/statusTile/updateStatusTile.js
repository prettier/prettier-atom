// @flow
const { disposeTooltip, setTooltip } = require('./tooltip');
const getFormatOnSaveStatus = require('./getFormatOnSaveStatus');
const { addTooltip } = require('../atomInterface');

const updateStatusTile = (disposable: Atom$Disposable, element: HTMLElement) => {
  disposeTooltip();

  element.dataset.formatOnSave = getFormatOnSaveStatus(); // eslint-disable-line no-param-reassign

  const newTooltip = addTooltip(element, { title: `Format on Save: ${getFormatOnSaveStatus()}` });

  setTooltip(newTooltip);
  disposable.add(newTooltip);

  return newTooltip;
};

module.exports = updateStatusTile;
