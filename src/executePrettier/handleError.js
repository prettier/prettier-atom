// @flow
const _ = require('lodash/fp');
const { getCurrentFilePath } = require('../editorInterface');
const linter = require('../linterInterface');
const { addErrorNotification } = require('../atomInterface');
const { createPoint, createRange } = require('../helpers');

type HandleErrorArgs = {
  editor: TextEditor,
  error: Prettier$SyntaxError,
  bufferRange: Range,
};

const errorLine = (error: Prettier$SyntaxError) => (error.loc.start ? error.loc.start.line : error.loc.line);

const errorColumn = (error: Prettier$SyntaxError) =>
  error.loc.start ? error.loc.start.column : error.loc.column;

// NOTE: Prettier error locations are not zero-based (i.e., they start at 1)
const buildPointArrayFromPrettierErrorAndRange = (error: Prettier$SyntaxError, bufferRange: Range): Point =>
  createPoint(
    errorLine(error) + bufferRange.start.row - 1,
    errorLine(error) === 0 ? errorColumn(error) + bufferRange.start.column - 1 : errorColumn(error) - 1,
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

const isSyntaxError: HandleErrorArgs => boolean = _.overSome([
  _.flow(_.get('error.loc.start.line'), _.isInteger),
  _.flow(_.get('error.loc.line'), _.isInteger),
]);

const isFilePathPresent: HandleErrorArgs => boolean = _.flow(
  _.get('editor'),
  getCurrentFilePath,
  _.negate(_.isNil),
);

const displayErrorInPopup = (args: HandleErrorArgs) =>
  addErrorNotification(`prettier-atom failed: ${args.error.message}`, {
    stack: args.error.stack,
    dismissable: true,
  });

const handleError: HandleErrorArgs => void = _.flow(
  _.cond([
    [_.overEvery([isSyntaxError, isFilePathPresent]), setErrorMessageInLinter],
    [_.stubTrue, displayErrorInPopup],
  ]),
);

module.exports = handleError;
