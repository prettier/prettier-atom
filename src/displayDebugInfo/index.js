// @flow
const readPkgUp = require('read-pkg-up');
const path = require('path');
const { getAtomVersion, getPrettierAtomConfig, addInfoNotification } = require('../atomInterface');
const { getGlobalPrettierPath } = require('../helpers/getPrettierPath');

const getDepPath = (dep: string) => path.join(__dirname, '..', '..', 'node_modules', dep);

const getPackageInfo = (dir: string) => readPkgUp.sync({ cwd: dir }).package;

const getDebugInfo = () => {
  const globalPrettierPath = getGlobalPrettierPath();
  return `
Atom version: ${getAtomVersion()}
prettier-atom version: ${getPackageInfo(__dirname).version}
prettier: ${globalPrettierPath || 'bundled'}
prettier version: ${getPackageInfo(globalPrettierPath || getDepPath('prettier')).version}
prettier-eslint version: ${getPackageInfo(getDepPath('@lewisl9029/prettier-eslint')).version}
prettier-atom configuration: ${JSON.stringify(getPrettierAtomConfig(), null, 2)}
`.trim();
};

const displayDebugInfo = () =>
  addInfoNotification('prettier-atom: details on current install', {
    detail: getDebugInfo(),
    dismissable: true,
  });

module.exports = displayDebugInfo;
