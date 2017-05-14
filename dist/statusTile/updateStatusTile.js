'use strict';

var _require = require('./tooltip'),
    disposeTooltip = _require.disposeTooltip,
    setTooltip = _require.setTooltip;

var getFormatOnSaveStatus = require('./getFormatOnSaveStatus');

var _require2 = require('../atomInterface'),
    addTooltip = _require2.addTooltip;

var updateStatusTile = function updateStatusTile(disposable, element) {
  disposeTooltip();

  element.dataset.formatOnSave = getFormatOnSaveStatus(); // eslint-disable-line no-param-reassign

  var newTooltip = addTooltip(element, { title: 'Format on Save: ' + getFormatOnSaveStatus() });

  setTooltip(newTooltip);
  disposable.add(newTooltip);

  return newTooltip;
};

module.exports = updateStatusTile;