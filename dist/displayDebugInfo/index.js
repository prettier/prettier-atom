'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var readPkgUp = require('read-pkg-up');
var path = require('path');

var _require = require('../atomInterface'),
    getAtomVersion = _require.getAtomVersion,
    getPrettierAtomConfig = _require.getPrettierAtomConfig,
    addInfoNotification = _require.addInfoNotification;

var _require2 = require('../helpers/getPrettierPath'),
    getGlobalPrettierPath = _require2.getGlobalPrettierPath;

var getDepPath = function getDepPath(dep) {
  return path.join(__dirname, '..', '..', 'node_modules', dep);
};

var getPackageInfo = function getPackageInfo(dir) {
  return readPkgUp.sync({ cwd: dir }).pkg;
};

var getDebugInfo = function getDebugInfo() {
  var globalPrettierPath = getGlobalPrettierPath();
  return ('\nAtom version: ' + getAtomVersion() + '\nprettier-atom version: ' + getPackageInfo(__dirname).version + '\nprettier: ' + (globalPrettierPath || 'bundled') + '\nprettier version: ' + getPackageInfo(globalPrettierPath || getDepPath('prettier')).version + '\nprettier-eslint version: ' + getPackageInfo(getDepPath('prettier-eslint')).version + '\nprettier-atom configuration: ' + (0, _stringify2.default)(getPrettierAtomConfig(), null, 2) + '\n').trim();
};

var displayDebugInfo = function displayDebugInfo() {
  return addInfoNotification('prettier-atom: details on current install', {
    detail: getDebugInfo(),
    dismissable: true
  });
};

module.exports = displayDebugInfo;