'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _ = require('lodash/fp');
var prettierEslint = require('prettier-eslint');
var prettierStylelint = require('prettier-stylelint');

var _require = require('loophole'),
    allowUnsafeNewFunction = _require.allowUnsafeNewFunction;

var _require2 = require('../atomInterface'),
    shouldUseEslint = _require2.shouldUseEslint,
    shouldUseStylelint = _require2.shouldUseStylelint,
    runLinter = _require2.runLinter;

var _require3 = require('../editorInterface'),
    isCurrentScopeCssScope = _require3.isCurrentScopeCssScope;

var _require4 = require('../helpers'),
    getPrettierInstance = _require4.getPrettierInstance;

var buildPrettierEslintOptions = require('./buildPrettierEslintOptions');
var buildPrettierStylelintOptions = require('./buildPrettierStylelintOptions');
var buildPrettierOptions = require('./buildPrettierOptions');
var handleError = require('./handleError');

var executePrettierWithCursor = function executePrettierWithCursor(editor, text, cursorOffset) {
  return getPrettierInstance(editor).formatWithCursor(text, (0, _extends3.default)({}, buildPrettierOptions(editor), {
    cursorOffset: cursorOffset
  }));
};

var executePrettierEslint = function executePrettierEslint(editor, text) {
  return allowUnsafeNewFunction(function () {
    return prettierEslint(buildPrettierEslintOptions(editor, text));
  });
};

var executePrettierStylelint = function executePrettierStylelint(editor, text) {
  return prettierStylelint.format(buildPrettierStylelintOptions(editor, text));
};

var executePrettierOrIntegration = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(editor, text, cursorOffset) {
    var formatted, _formatted;

    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(shouldUseStylelint() && isCurrentScopeCssScope(editor))) {
              _context.next = 5;
              break;
            }

            _context.next = 3;
            return executePrettierStylelint(editor, text);

          case 3:
            formatted = _context.sent;
            return _context.abrupt('return', { formatted: formatted, cursorOffset: cursorOffset });

          case 5:
            if (!shouldUseEslint()) {
              _context.next = 8;
              break;
            }

            // TODO: add support for cursor position - https://github.com/prettier/prettier-eslint/issues/164
            _formatted = executePrettierEslint(editor, text);
            return _context.abrupt('return', { formatted: _formatted, cursorOffset: cursorOffset });

          case 8:
            return _context.abrupt('return', executePrettierWithCursor(editor, text, cursorOffset));

          case 9:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function executePrettierOrIntegration(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

var executePrettierOnBufferRange = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(editor, bufferRange, options) {
    var currentBuffer, cursorPosition, textToTransform, cursorOffset, results, isTextUnchanged, nextCursorPosition;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            // grab cursor position and file contents
            currentBuffer = editor.getBuffer();
            cursorPosition = editor.getCursorBufferPosition();
            textToTransform = editor.getTextInBufferRange(bufferRange);
            cursorOffset = currentBuffer.characterIndexForPosition(cursorPosition);
            results = {
              cursorOffset: cursorOffset,
              formatted: textToTransform
            };

            if (!_.isEmpty(textToTransform)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt('return');

          case 7:
            _context2.prev = 7;
            _context2.next = 10;
            return executePrettierOrIntegration(editor, textToTransform, cursorOffset);

          case 10:
            results = _context2.sent;
            _context2.next = 17;
            break;

          case 13:
            _context2.prev = 13;
            _context2.t0 = _context2['catch'](7);

            handleError({ editor: editor, bufferRange: bufferRange, error: _context2.t0 });
            return _context2.abrupt('return');

          case 17:
            isTextUnchanged = results.formatted === textToTransform;

            if (!isTextUnchanged) {
              _context2.next = 20;
              break;
            }

            return _context2.abrupt('return');

          case 20:

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
            nextCursorPosition = currentBuffer.positionForCharacterIndex(results.cursorOffset);


            editor.setCursorBufferPosition(nextCursorPosition);
            runLinter(editor);

          case 24:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined, [[7, 13]]);
  }));

  return function executePrettierOnBufferRange(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = executePrettierOnBufferRange;