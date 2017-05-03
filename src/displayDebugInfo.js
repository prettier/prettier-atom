// @flow
const { getDebugInfo } = require('./helpers');

const displayDebugInfo = () => {
  const info = getDebugInfo();
  const details = [
    `Atom version: ${info.atomVersion}`,
    `prettier-atom version: ${info.prettierAtomVersion}`,
    `prettier version: ${info.prettierVersion}`,
    `prettier-eslint version: ${info.prettierESLintVersion}`,
    `prettier-atom configuration: ${JSON.stringify(info.prettierAtomConfig, null, 2)}`,
  ].join('\n');
  atom.notifications.addInfo('prettier-atom: details on current install', {
    detail: details,
    dismissable: true,
  });
};

module.exports = displayDebugInfo;
