// @flow
const _ = require('lodash/fp');
const { someGlobsMatchFilePath } = require('../helpers');
const { getCurrentFilePath, getCurrentScope } = require('../editorInterface');
const {
  isFormatOnSaveEnabled,
  getAllScopes,
  getExcludedGlobs,
  getWhitelistedGlobs,
  isDisabledIfNotInPackageJson,
} = require('../atomInterface');
const isFilePathEslintignored = require('./isFilePathEslintIgnored');
const isFilePathPrettierIgnored = require('./isFilePathPrettierIgnored');
const isPrettierInPackageJson = require('./isPrettierInPackageJson');

const hasFilePath = (editor: TextEditor) => !!getCurrentFilePath(editor);

const isInScope = (editor: TextEditor) => getAllScopes().includes(getCurrentScope(editor));

const filePathDoesNotMatchBlacklistGlobs: (
  editor: TextEditor,
) => boolean = _.flow(getCurrentFilePath, (filePath: FilePath) =>
  _.negate(someGlobsMatchFilePath)(getExcludedGlobs(), filePath),
);

const noWhitelistGlobsPresent: () => boolean = _.flow(getWhitelistedGlobs, _.isEmpty);

const isFilePathWhitelisted: (
  editor: TextEditor,
) => boolean = _.flow(getCurrentFilePath, (filePath: FilePath) =>
  someGlobsMatchFilePath(getWhitelistedGlobs(), filePath),
);

const isFilePathNotEslintignored: (editor: TextEditor) => boolean = _.flow(
  getCurrentFilePath,
  _.negate(isFilePathEslintignored),
);

const isFilePathNotPrettierIgnored: (editor: TextEditor) => boolean = _.flow(
  getCurrentFilePath,
  _.negate(isFilePathPrettierIgnored),
);

const shouldFormatOnSave: (editor: TextEditor) => boolean = _.overEvery([
  isFormatOnSaveEnabled,
  hasFilePath,
  isInScope,
  _.overSome([
    isFilePathWhitelisted,
    _.overEvery([noWhitelistGlobsPresent, filePathDoesNotMatchBlacklistGlobs]),
  ]),
  isFilePathNotEslintignored,
  isFilePathNotPrettierIgnored,
  _.overSome([_.negate(isDisabledIfNotInPackageJson), isPrettierInPackageJson]),
]);

module.exports = shouldFormatOnSave;
