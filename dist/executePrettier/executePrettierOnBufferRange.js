'use strict';

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _ = require('lodash/fp');
const prettierEslint = require('prettier-eslint');
const prettierStylelint = require('prettier-stylelint');
const { allowUnsafeNewFunction } = require('loophole');

const {
  getPrettierEslintOptions,
  shouldUseEslint,
  shouldUseStylelint,
  runLinter
} = require('../atomInterface');
const { getCurrentFilePath, isCurrentScopeStyleLintScope } = require('../editorInterface');
const { getPrettierInstance } = require('../helpers');
const handleError = require('./handleError');

const executePrettier = (editor, text
// $FlowFixMe
) => getPrettierInstance(editor).format(text, { filepath: getCurrentFilePath(editor) });

const executePrettierWithCursor = (editor, text, cursorOffset
// $FlowFixMe
) => getPrettierInstance(editor).formatWithCursor(text, {
  cursorOffset,
  filepath: getCurrentFilePath(editor)
});

const buildPrettierEslintOptions = (editor, text) => (0, _extends3.default)({
  text
}, getPrettierEslintOptions(), {
  filePath: getCurrentFilePath(editor)
});

const executePrettierEslint = (editor, text) => allowUnsafeNewFunction(() => prettierEslint(buildPrettierEslintOptions(editor, text)));

const buildPrettierStylelintOptions = (editor, text) => ({
  text,
  filePath: getCurrentFilePath(editor)
});

const executePrettierStylelint = (editor, text) => prettierStylelint.format(buildPrettierStylelintOptions(editor, text));

const executePrettierOrIntegration = (() => {
  var _ref = (0, _asyncToGenerator3.default)(function* (editor, text, cursorOffset) {
    if (shouldUseStylelint() && isCurrentScopeStyleLintScope(editor)) {
      // TODO: add support for cursor position - https://github.com/hugomrdias/prettier-stylelint/issues/13
      const formatted = yield executePrettierStylelint(editor, text);

      return { formatted, cursorOffset };
    }

    if (shouldUseEslint()) {
      // TODO: add support for cursor position - https://github.com/prettier/prettier-eslint/issues/164
      const formatted = executePrettierEslint(editor, text);

      return { formatted, cursorOffset };
    }

    let formatted;

    // TODO: remove this try/catch once Prettier.formatWithCursor stabilizes
    try {
      formatted = executePrettierWithCursor(editor, text, cursorOffset).formatted;
    } catch (error) {
      formatted = executePrettier(editor, text);
    }

    return { formatted, cursorOffset };
  });

  return function executePrettierOrIntegration(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
})();

const executePrettierOnBufferRange = (() => {
  var _ref2 = (0, _asyncToGenerator3.default)(function* (editor, bufferRange, options) {
    // grab cursor position and file contents
    const currentBuffer = editor.getBuffer();
    const cursorPosition = editor.getCursorBufferPosition();
    const textToTransform = editor.getTextInBufferRange(bufferRange);
    const cursorOffset = currentBuffer.characterIndexForPosition(cursorPosition);
    let results = {
      cursorOffset,
      formatted: textToTransform
    };

    if (_.isEmpty(textToTransform)) return;

    try {
      results = yield executePrettierOrIntegration(editor, textToTransform, cursorOffset);
    } catch (error) {
      handleError({ editor, bufferRange, error });
      return;
    }

    const isTextUnchanged = results.formatted === textToTransform;
    if (isTextUnchanged) return;

    if (options && options.setTextViaDiff) {
      // we use setTextViaDiff when formatting the entire buffer to improve performance,
      // maintain metadata (bookmarks, folds, etc) and eliminate syntax highlight flickering
      // however, we can't always use it because it replaces all text in the file and sometimes
      // we're only editing a sub-selection of the text in a file
      currentBuffer.setTextViaDiff(results.formatted);
    } else {
      editor.setTextInBufferRange(bufferRange, results.formatted);
    }

    // calculate next cursor position after buffer has been updated with new text
    const nextCursorPosition = currentBuffer.positionForCharacterIndex(results.cursorOffset);

    editor.setCursorBufferPosition(nextCursorPosition);
    runLinter(editor);
  });

  return function executePrettierOnBufferRange(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
})();

module.exports = executePrettierOnBufferRange;