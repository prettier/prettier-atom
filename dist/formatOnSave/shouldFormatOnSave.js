'use strict';

const _ = require('lodash/fp');
const {
  getPrettierInstance,
  someGlobsMatchFilePath,
  isFileFormattable,
  isPrettierProperVersion
} = require('../helpers');
const { getCurrentFilePath } = require('../editorInterface');
const {
  getExcludedGlobs,
  getWhitelistedGlobs,
  isFormatOnSaveEnabled,
  isDisabledIfNotInPackageJson,
  isDisabledIfNoConfigFile,
  shouldRespectEslintignore
} = require('../atomInterface');
const isFilePathEslintIgnored = require('./isFilePathEslintIgnored');
const isPrettierInPackageJson = require('./isPrettierInPackageJson');

const hasFilePath = editor => !!getCurrentFilePath(editor);

const filePathDoesNotMatchBlacklistGlobs = _.flow(getCurrentFilePath, filePath => _.negate(someGlobsMatchFilePath)(getExcludedGlobs(), filePath));

// $FlowFixMe
const noWhitelistGlobsPresent = _.flow(getWhitelistedGlobs, _.isEmpty);

const isFilePathWhitelisted = _.flow(getCurrentFilePath, filePath => someGlobsMatchFilePath(getWhitelistedGlobs(), filePath));

const isEslintIgnored = _.flow(getCurrentFilePath, isFilePathEslintIgnored);

const isPrettierConfigPresent = (editor
// $FlowFixMe
) => _.flow(getCurrentFilePath,
// $FlowFixMe
getPrettierInstance(editor).resolveConfig.sync, _.negate(_.isNil))(editor);

const shouldFormatOnSave = _.overEvery([isFormatOnSaveEnabled, hasFilePath, _.overSome([isFilePathWhitelisted, _.overEvery([noWhitelistGlobsPresent, filePathDoesNotMatchBlacklistGlobs])]), _.overSome([_.negate(shouldRespectEslintignore), _.negate(isEslintIgnored)]), _.overSome([_.negate(isDisabledIfNotInPackageJson), isPrettierInPackageJson]), isPrettierProperVersion, _.overSome([_.negate(isDisabledIfNoConfigFile), isPrettierConfigPresent]), isFileFormattable]);

module.exports = shouldFormatOnSave;