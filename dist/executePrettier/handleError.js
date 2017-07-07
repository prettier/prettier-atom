'use strict';

var _ = require('lodash/fp');

var _require = require('../editorInterface'),
    getCurrentFilePath = _require.getCurrentFilePath;

var linter = require('../linterInterface');

var _require2 = require('../helpers'),
    createPoint = _require2.createPoint,
    createRange = _require2.createRange;

var errorLine = function errorLine(error) {
  return error.loc.start ? error.loc.start.line : error.loc.line;
};

var errorColumn = function errorColumn(error) {
  return error.loc.start ? error.loc.start.column : error.loc.column;
};

// NOTE: Prettier error locations are not zero-based (i.e., they start at 1)
var buildPointArrayFromPrettierErrorAndRange = function buildPointArrayFromPrettierErrorAndRange(error, bufferRange) {
  return createPoint(errorLine(error) + bufferRange.start.row - 1, errorLine(error) === 0 ? errorColumn(error) + bufferRange.start.column - 1 : errorColumn(error) - 1);
};

var buildExcerpt = function buildExcerpt(error) {
  return (/(.*)\s\(\d+:\d+\).*/.exec(error.message)[1]
  );
};

var setErrorMessageInLinter = function setErrorMessageInLinter(_ref) {
  var editor = _ref.editor,
      bufferRange = _ref.bufferRange,
      error = _ref.error;
  return linter.setMessages(editor, [{
    location: {
      // $$FlowFixMe
      file: getCurrentFilePath(editor),
      position: createRange(buildPointArrayFromPrettierErrorAndRange(error, bufferRange), buildPointArrayFromPrettierErrorAndRange(error, bufferRange))
    },
    excerpt: buildExcerpt(error),
    severity: 'error'
  }]);
};

var handleError = _.flow(setErrorMessageInLinter, _.stubFalse);

module.exports = handleError;