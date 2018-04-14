'use strict';

const _ = require('lodash/fp');
const readPgkUp = require('read-pkg-up');

const { getCurrentDir } = require('../editorInterface');
const { shouldUseEslint } = require('../atomInterface');

const hasPackageDependency = packageName => _.flow(_.get('pkg.dependencies'), _.has(packageName));

const hasPackageDevDependency = packageName => _.flow(_.get('pkg.devDependencies'), _.has(packageName));

const hasPackage = packageName => _.overSome([hasPackageDependency(packageName), hasPackageDevDependency(packageName)]);

const readContentsOfNearestPackageJson = _.flow(getCurrentDir,
// $FlowIssue: lodashfp placeholders not supported yet
_.set('cwd', _, {}), readPgkUp.sync);

const isPrettierInPackageJson = _.flow(readContentsOfNearestPackageJson, hasPackage('prettier'));

const isPrettierEslintInPackageJson = _.flow(readContentsOfNearestPackageJson, _.overSome([hasPackage('prettier-eslint'), hasPackage('prettier-eslint-cli'), hasPackage('eslint-plugin-prettier')]));

module.exports = _.cond([[shouldUseEslint, isPrettierEslintInPackageJson], [_.stubTrue, isPrettierInPackageJson]]);