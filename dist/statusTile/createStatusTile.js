'use strict';

var getFormatOnSaveStatus = require('./getFormatOnSaveStatus');

var _require = require('../atomInterface'),
    toggleFormatOnSave = _require.toggleFormatOnSave;

var createStatusTile = function createStatusTile() {
  var element = document.createElement('div');
  var prettierTextNode = document.createTextNode('Prettier');

  element.appendChild(prettierTextNode);
  element.classList.add('prettier-atom-status-tile');
  element.classList.add('inline-block');
  element.dataset.formatOnSave = getFormatOnSaveStatus();
  element.addEventListener('click', toggleFormatOnSave);

  return element;
};

module.exports = createStatusTile;