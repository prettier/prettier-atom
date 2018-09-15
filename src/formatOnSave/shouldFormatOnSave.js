// @flow
const _ = require('lodash/fp');
const {
  getPrettierInstance,
  someGlobsMatchFilePath,
  isFileFormattable,
  isPrettierProperVersion,
} = require('../helpers');
const { getCurrentFilePath } = require('../editorInterface');
const {
  getExcludedGlobs,
  getWhitelistedGlobs,
  isFormatOnSaveEnabled,
  isDisabledIfNotInPackageJson,
  isDisabledIfNoConfigFile,
  shouldRespectEslintignore,
  shouldRespectTslintignore,
} = require('../atomInterface');
const isFilePathEslintIgnored = require('./isFilePathEslintIgnored');
const isFilePathTslintIgnored = require('./isFilePathTslintIgnored');
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

const isTslintIgnored: (editor: TextEditor) => boolean = _.flow(
  getCurrentFilePath,
  isFilePathTslintIgnored,
);

const isPrettierConfigPresent = (editor: TextEditor): boolean =>
  // $FlowFixMe
  _.flow(
    getCurrentFilePath,
    // $FlowFixMe
    getPrettierInstance(editor).resolveConfig.sync,
    _.negate(_.isNil),
  )(editor);

const shouldFormatOnSave: (editor: TextEditor) => boolean = _.overEvery([
  isFormatOnSaveEnabled,
  hasFilePath,
  _.overSome([
    isFilePathWhitelisted,
    _.overEvery([noWhitelistGlobsPresent, filePathDoesNotMatchBlacklistGlobs]),
  ]),
  _.overSome([_.negate(shouldRespectEslintignore), _.negate(isEslintIgnored)]),
  _.overSome([_.negate(shouldRespectTslintignore), _.negate(isTslintIgnored)]),
  _.overSome([_.negate(isDisabledIfNotInPackageJson), isPrettierInPackageJson]),
  isPrettierProperVersion,
  _.overSome([_.negate(isDisabledIfNoConfigFile), isPrettierConfigPresent]),
  isFileFormattable,
]);

module.exports = shouldFormatOnSave;
