'use strict';

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const readPkgUp = require('read-pkg-up');
const path = require('path');
const { getAtomVersion, getPrettierAtomConfig, addInfoNotification } = require('../atomInterface');
const { getGlobalPrettierPath } = require('../helpers/getPrettierPath');

const getDepPath = dep => path.join(__dirname, '..', '..', 'node_modules', dep);

const getPackageInfo = dir => readPkgUp.sync({ cwd: dir }).pkg;

const getDebugInfo = () => {
  const globalPrettierPath = getGlobalPrettierPath();
  return `
Atom version: ${getAtomVersion()}
prettier-atom version: ${getPackageInfo(__dirname).version}
prettier: ${globalPrettierPath || 'bundled'}
prettier version: ${getPackageInfo(globalPrettierPath || getDepPath('prettier')).version}
prettier-eslint version: ${getPackageInfo(getDepPath('prettier-eslint')).version}
prettier-tslint version: ${getPackageInfo(getDepPath('prettier-tslint')).version}
prettier-atom configuration: ${(0, _stringify2.default)(getPrettierAtomConfig(), null, 2)}
`.trim();
};

const displayDebugInfo = () => addInfoNotification('prettier-atom: details on current install', {
  detail: getDebugInfo(),
  dismissable: true
});

module.exports = displayDebugInfo;