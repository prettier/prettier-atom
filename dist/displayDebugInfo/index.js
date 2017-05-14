'use strict';

var readPkg = require('read-pkg');
var path = require('path');

var _require = require('../atomInterface'),
    getAtomVersion = _require.getAtomVersion,
    getPrettierAtomConfig = _require.getPrettierAtomConfig,
    addInfoNotification = _require.addInfoNotification;

var getDepPath = function getDepPath(dep) {
  return path.join(__dirname, '..', '..', 'node_modules', dep);
};

var getDebugInfo = function getDebugInfo() {
  return ('\nAtom version: ' + getAtomVersion() + '\nprettier-atom version: ' + readPkg.sync(path.join(__dirname, '..', '..')).version + '\nprettier version: ' + readPkg.sync(getDepPath('prettier')).version + '\nprettier-eslint version: ' + readPkg.sync(getDepPath('prettier-eslint')).version + '\nprettier-atom configuration: ' + JSON.stringify(getPrettierAtomConfig(), null, 2) + '\n').trim();
};

var displayDebugInfo = function displayDebugInfo() {
  return addInfoNotification('prettier-atom: details on current install', {
    detail: getDebugInfo(),
    dismissable: true
  });
};

module.exports = displayDebugInfo;