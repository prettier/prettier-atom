// @flow
const { getDebugInfo } = require('./helpers');

const buildDetailFromDebugInfo = debugInfo =>
  `Atom version: ${debugInfo.atomVersion}
prettier-atom version: ${debugInfo.prettierAtomVersion}
prettier version: ${debugInfo.prettierVersion}
prettier-eslint version: ${debugInfo.prettierESLintVersion}
prettier-atom configuration: ${JSON.stringify(debugInfo.prettierAtomConfig, null, 2)}
`;

const displayDebugInfo = () =>
  atom.notifications.addInfo('prettier-atom: details on current install', {
    detail: buildDetailFromDebugInfo(getDebugInfo()),
    dismissable: true,
  });

module.exports = displayDebugInfo;
