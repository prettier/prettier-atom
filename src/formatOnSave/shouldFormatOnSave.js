// @flow
const _ = require('lodash/fp');
const { getPrettierInstance, someGlobsMatchFilePath } = require('../helpers');
const { getCurrentFilePath, isInScope } = require('../editorInterface');
const {
  getExcludedGlobs,
  getWhitelistedGlobs,
  isFormatOnSaveEnabled,
  isDisabledIfNotInPackageJson,
  isDisabledIfNoConfigFile,
  shouldRespectEslintignore,
} = require('../atomInterface');
const isFilePathEslintIgnored = require('./isFilePathEslintIgnored');
const isFilePathPrettierIgnored = require('./isFilePathPrettierIgnored');
const isPrettierInPackageJson = require('./isPrettierInPackageJson');

const hasFilePath = (editor: TextEditor) => !!getCurrentFilePath(editor);

const filePathDoesNotMatchBlacklistGlobs: (editor: TextEditor) => boolean = _.flow(
  getCurrentFilePath,
  (filePath: ?FilePath) => _.negate(someGlobsMatchFilePath)(getExcludedGlobs(), filePath),
);

// $FlowFixMe
const noWhitelistGlobsPresent: () => boolean = _.flow(
  getWhitelistedGlobs,
  _.isEmpty,
);

const isFilePathWhitelisted: (editor: TextEditor) => boolean = _.flow(
  getCurrentFilePath,
  (filePath: ?FilePath) => someGlobsMatchFilePath(getWhitelistedGlobs(), filePath),
);

const isEslintIgnored: (editor: TextEditor) => boolean = _.flow(
  getCurrentFilePath,
  isFilePathEslintIgnored,
);

const isFilePathNotPrettierIgnored: (editor: TextEditor) => boolean = _.flow(
  getCurrentFilePath,
  _.negate(isFilePathPrettierIgnored),
);

const isResolveConfigDefined = (editor: TextEditor): boolean =>
  // $FlowFixMe
  !!getPrettierInstance(editor).resolveConfig.sync;

const isResolveConfigSuccessful = (editor: TextEditor): boolean =>
  // $FlowFixMe
  _.flow(
    getCurrentFilePath,
    // $FlowFixMe
    getPrettierInstance(editor).resolveConfig.sync,
    _.negate(_.isNil),
  )(editor);

const isPrettierConfigPresent: TextEditor => boolean = _.overEvery([
  isResolveConfigDefined,
  isResolveConfigSuccessful,
]);

const shouldFormatOnSave: (editor: TextEditor) => boolean = _.overEvery([
  isFormatOnSaveEnabled,
  hasFilePath,
  isInScope,
  _.overSome([
    isFilePathWhitelisted,
    _.overEvery([noWhitelistGlobsPresent, filePathDoesNotMatchBlacklistGlobs]),
  ]),
  _.overSome([_.negate(shouldRespectEslintignore), _.negate(isEslintIgnored)]),
  isFilePathNotPrettierIgnored,
  _.overSome([_.negate(isDisabledIfNotInPackageJson), isPrettierInPackageJson]),
  _.overSome([_.negate(isDisabledIfNoConfigFile), isPrettierConfigPresent]),
]);

module.exports = shouldFormatOnSave;
