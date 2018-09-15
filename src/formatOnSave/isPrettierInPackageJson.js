// @flow
const _ = require('lodash/fp');
const readPgkUp = require('read-pkg-up');

const { getCurrentDir } = require('../editorInterface');
const { shouldUseEslint, shouldUseTslint } = require('../atomInterface');

const hasPackageDependency = (packageName: string): ((packageJson: {}) => boolean) =>
  _.flow(
    _.get('pkg.dependencies'),
    _.has(packageName),
  );

const hasPackageDevDependency = (packageName: string) =>
  _.flow(
    _.get('pkg.devDependencies'),
    _.has(packageName),
  );

const hasPackage = (packageName: string): ((packageJson: {}) => boolean) =>
  _.overSome([hasPackageDependency(packageName), hasPackageDevDependency(packageName)]);

const readContentsOfNearestPackageJson: TextEditor => {} = _.flow(
  getCurrentDir,
  // $FlowIssue: lodashfp placeholders not supported yet
  _.set('cwd', _, {}),
  readPgkUp.sync,
);

const isPrettierInPackageJson: (editor: TextEditor) => boolean = _.flow(
  readContentsOfNearestPackageJson,
  hasPackage('prettier'),
);

const isPrettierEslintInPackageJson: (editor: TextEditor) => boolean = _.flow(
  readContentsOfNearestPackageJson,
  _.overSome([
    hasPackage('prettier-eslint'),
    hasPackage('prettier-eslint-cli'),
    hasPackage('eslint-plugin-prettier'),
  ]),
);

const isPrettierTslintInPackageJson: (editor: TextEditor) => boolean = _.flow(
  readContentsOfNearestPackageJson,
  _.overSome([hasPackage('prettier-tslint')]),
);

module.exports = _.cond([
  [shouldUseEslint, isPrettierEslintInPackageJson],
  [shouldUseTslint, isPrettierTslintInPackageJson],
  [_.stubTrue, isPrettierInPackageJson],
]);
