// @flow
const path = require('path');
const _ = require('lodash/fp');
const getPrettierInstance = require('./getPrettierInstance');
const { shouldIgnoreNodeModules } = require('../atomInterface');
const { getCurrentFilePath, isCurrentFilePathDefined } = require('../editorInterface');
const { findCachedFromFilePath } = require('./general');

const getNearestPrettierignorePath = (filePath: FilePath): ?FilePath =>
  findCachedFromFilePath(filePath, '.prettierignore');

const getCurrentFilePathRelativeToNearestPrettierignoreParentDir = (editor: TextEditor): string => {
  // $FlowIssue: we know filepath is defined at this point
  const filePath: string = getCurrentFilePath(editor);
  const nearestPrettierignorePath = getNearestPrettierignorePath(filePath);

  return nearestPrettierignorePath
    ? path.relative(path.dirname(nearestPrettierignorePath), filePath)
    : filePath;
};

const getPrettierFileInfoForCurrentFilePath = (editor: TextEditor): Prettier$FileInfo =>
  // $FlowFixMe: getFileInfo.sync needs to be addded to flow-typed
  getPrettierInstance(editor).getFileInfo.sync(
    getCurrentFilePathRelativeToNearestPrettierignoreParentDir(editor),
    {
      withNodeModules: !shouldIgnoreNodeModules(),
      // $FlowIssue: we know filepath is defined at this point
      ignorePath: getNearestPrettierignorePath(getCurrentFilePath(editor)),
    },
  );

const doesFileInfoIndicateFormattable = (fileInfo: Prettier$FileInfo): boolean =>
  fileInfo && !fileInfo.ignored && !!fileInfo.inferredParser;

const isFileFormattable: (editor: ?TextEditor) => boolean = _.overEvery([
  _.negate(_.isNil), // make sure editor is defined just in case there are weird edge cases
  isCurrentFilePathDefined, // make sure filepath is defined for same reason
  _.flow(
    getPrettierFileInfoForCurrentFilePath,
    doesFileInfoIndicateFormattable,
  ),
]);

module.exports = isFileFormattable;
