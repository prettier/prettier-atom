'use strict';

const _ = require('lodash/fp');
const { someGlobsMatchFilePath, getPrettierInstance } = require('../helpers');
const { getCurrentFilePath, getCurrentScope } = require('../editorInterface');
const {
  isFormatOnSaveEnabled,
  getAllScopes,
  getExcludedGlobs,
  getWhitelistedGlobs,
  isDisabledIfNotInPackageJson,
  isDisabledIfNoConfigFile,
  shouldRespectEslintignore
} = require('../atomInterface');
const isFilePathEslintIgnored = require('./isFilePathEslintIgnored');
const isFilePathPrettierIgnored = require('./isFilePathPrettierIgnored');
const isPrettierInPackageJson = require('./isPrettierInPackageJson');

const hasFilePath = editor => !!getCurrentFilePath(editor);

const isInScope = editor => getAllScopes().includes(getCurrentScope(editor));

const filePathDoesNotMatchBlacklistGlobs = _.flow(getCurrentFilePath, filePath => _.negate(someGlobsMatchFilePath)(getExcludedGlobs(), filePath));

// $FlowFixMe
const noWhitelistGlobsPresent = _.flow(getWhitelistedGlobs, _.isEmpty);

const isFilePathWhitelisted = _.flow(getCurrentFilePath, filePath => someGlobsMatchFilePath(getWhitelistedGlobs(), filePath));
const isEslintIgnored = _.flow(getCurrentFilePath, isFilePathEslintIgnored);

const isFilePathNotPrettierIgnored = _.flow(getCurrentFilePath, _.negate(isFilePathPrettierIgnored));

const isPrettierConfigPresent = (editor
// $FlowFixMe
) => !!getPrettierInstance(editor).resolveConfig.sync &&
// $FlowFixMe
_.flow(getCurrentFilePath, getPrettierInstance(editor).resolveConfig.sync, _.negate(_.isNil))(editor);

const shouldFormatOnSave = _.overEvery([isFormatOnSaveEnabled, hasFilePath, isInScope, _.overSome([isFilePathWhitelisted, _.overEvery([noWhitelistGlobsPresent, filePathDoesNotMatchBlacklistGlobs])]), _.overSome([_.negate(shouldRespectEslintignore), _.negate(isEslintIgnored)]), isFilePathNotPrettierIgnored, _.overSome([_.negate(isDisabledIfNotInPackageJson), isPrettierInPackageJson]), _.overSome([_.negate(isDisabledIfNoConfigFile), isPrettierConfigPresent])]);

module.exports = shouldFormatOnSave;