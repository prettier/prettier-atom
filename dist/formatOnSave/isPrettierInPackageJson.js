'use strict';

var _ = require('lodash/fp');
var readPgkUp = require('read-pkg-up');

var _require = require('../editorInterface'),
    getCurrentDir = _require.getCurrentDir;

var _require2 = require('../atomInterface'),
    shouldUseEslint = _require2.shouldUseEslint;

var hasPackageDependency = function hasPackageDependency(packageName) {
  return _.flow(_.get('pkg.dependencies'), _.has(packageName));
};

var hasPackageDevDependency = function hasPackageDevDependency(packageName) {
  return _.flow(_.get('pkg.devDependencies'), _.has(packageName));
};

var hasPackage = function hasPackage(packageName) {
  return _.overSome([hasPackageDependency(packageName), hasPackageDevDependency(packageName)]);
};

var readContentsOfNearestPackageJson = _.flow(getCurrentDir, _.set('cwd', _, {}), readPgkUp.sync);

var isPrettierInPackageJson = _.flow(readContentsOfNearestPackageJson, hasPackage('prettier'));

var isPrettierEslintInPackageJson = _.flow(readContentsOfNearestPackageJson, _.overSome([hasPackage('prettier-eslint'), hasPackage('prettier-eslint-cli'), hasPackage('eslint-plugin-prettier')]));

module.exports = _.cond([[shouldUseEslint, isPrettierEslintInPackageJson], [_.stubTrue, isPrettierInPackageJson]]);