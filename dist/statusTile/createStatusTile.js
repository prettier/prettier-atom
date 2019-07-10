"use strict";

const getFormatOnSaveStatus = require('./getFormatOnSaveStatus');

const {
  toggleFormatOnSave
} = require('../atomInterface');

const createStatusTile = () => {
  const element = document.createElement('div');
  const prettierTextNode = document.createTextNode('Prettier');
  element.appendChild(prettierTextNode);
  element.classList.add('prettier-status-tile');
  element.classList.add('inline-block');
  element.dataset.prettierFormatOnSave = getFormatOnSaveStatus();
  element.addEventListener('click', toggleFormatOnSave);
  return element;
};

module.exports = createStatusTile;