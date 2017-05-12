// @flow
const _ = require('lodash/fp');
const { someGlobsMatchFilePath } = require('../helpers');
const { getCurrentFilePath, getCurrentScope } = require('../editorInterface');
const {
  isFormatOnSaveEnabled,
  getScopes,
  getExcludedGlobs,
  getWhitelistedGlobs,
} = require('../atomInterface');
const isFilePathEslintignored = require('./isFilePathEslintIgnored');

const hasFilePath = (editor: TextEditor) => !!getCurrentFilePath(editor);

const isInScope = (editor: TextEditor) => getScopes().includes(getCurrentScope(editor));

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

const shouldFormatOnSave: (editor: TextEditor) => boolean = _.overEvery([
  isFormatOnSaveEnabled,
  hasFilePath,
  isInScope,
  _.overSome([
    isFilePathWhitelisted,
    _.overEvery([noWhitelistGlobsPresent, filePathDoesNotMatchBlacklistGlobs]),
  ]),
  isFilePathNotEslintignored,
]);

module.exports = shouldFormatOnSave;
