// @flow
const readPkg = require('read-pkg');
const path = require('path');
const { getAtomVersion, getPrettierAtomConfig, addInfoNotification } = require('../atomInterface');

const getDepPath = (dep: string) => path.join(__dirname, '..', '..', 'node_modules', dep);

const getDebugInfo = () =>
  `
Atom version: ${getAtomVersion()}
prettier-atom version: ${readPkg.sync().version}
prettier version: ${readPkg.sync(getDepPath('prettier')).version}
prettier-eslint version: ${readPkg.sync(getDepPath('prettier-eslint')).version}
prettier-atom configuration: ${JSON.stringify(getPrettierAtomConfig(), null, 2)}
`.trim();

const displayDebugInfo = () =>
  addInfoNotification('prettier-atom: details on current install', {
    detail: getDebugInfo(),
    dismissable: true,
  });

module.exports = displayDebugInfo;
