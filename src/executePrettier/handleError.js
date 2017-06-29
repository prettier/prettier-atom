// @flow
const _ = require('lodash/fp');
const { getCurrentFilePath } = require('../editorInterface');
const linter = require('../linterInterface');
const { createPoint, createRange } = require('../helpers');

type HandleErrorArgs = {
  editor: TextEditor,
  error: Prettier$SyntaxError,
  bufferRange: Range,
};

// NOTE: Prettier error locations are not zero-based (i.e., they start at 1)
const buildPointArrayFromPrettierErrorAndRange = (error: Prettier$SyntaxError, bufferRange: Range): Point =>
  createPoint(
    error.loc.start.line + bufferRange.start.row - 1,
    error.loc.start.line === 0
      ? error.loc.start.column + bufferRange.start.column - 1
      : error.loc.start.column - 1,
  );

const buildExcerpt = (error: Prettier$SyntaxError) => /(.*)\s\(\d+:\d+\).*/.exec(error.message)[1];

const setErrorMessageInLinter = ({ editor, bufferRange, error }: HandleErrorArgs): void =>
  linter.setMessages(editor, [
    {
      location: {
        // $$FlowFixMe
        file: getCurrentFilePath(editor),
        position: createRange(
          buildPointArrayFromPrettierErrorAndRange(error, bufferRange),
          buildPointArrayFromPrettierErrorAndRange(error, bufferRange),
        ),
      },
      excerpt: buildExcerpt(error),
      severity: 'error',
    },
  ]);

const handleError: HandleErrorArgs => false = _.flow(setErrorMessageInLinter, _.stubFalse);

module.exports = handleError;
