'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

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

var executePrettier = function executePrettier(editor, text) {
  return getPrettierInstance(editor).format(text, buildPrettierOptions(editor));
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
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(editor, text) {
    var formatted;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            formatted = void 0;

            if (!(shouldUseStylelint() && isCurrentScopeCssScope(editor))) {
              _context.next = 8;
              break;
            }

            _context.next = 5;
            return executePrettierStylelint(editor, text);

          case 5:
            formatted = _context.sent;
            _context.next = 9;
            break;

          case 8:
            if (shouldUseEslint()) {
              formatted = executePrettierEslint(editor, text);
            } else {
              formatted = executePrettier(editor, text);
            }

          case 9:
            return _context.abrupt('return', formatted);

          case 12:
            _context.prev = 12;
            _context.t0 = _context['catch'](0);
            return _context.abrupt('return', _context.t0);

          case 15:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 12]]);
  }));

  return function executePrettierOrIntegration(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var executePrettierOnBufferRange = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(editor, bufferRange, options) {
    var cursorPositionPriorToFormat, textToTransform, transformed, isTextUnchanged;
    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            cursorPositionPriorToFormat = editor.getCursorScreenPosition();
            textToTransform = editor.getTextInBufferRange(bufferRange);
            _context2.next = 4;
            return executePrettierOrIntegration(editor, textToTransform);

          case 4:
            transformed = _context2.sent;
            isTextUnchanged = transformed === textToTransform;

            if (!(!transformed || isTextUnchanged)) {
              _context2.next = 8;
              break;
            }

            return _context2.abrupt('return');

          case 8:
            if (!_.isError(transformed)) {
              _context2.next = 11;
              break;
            }

            handleError({ bufferRange: bufferRange, editor: editor, error: transformed });
            return _context2.abrupt('return');

          case 11:

            if (options.setTextViaDiff) {
              // we use setTextViaDiff when formatting the entire buffer to improve performance,
              // maintain metadata (bookmarks, folds, etc) and eliminate syntax highlight flickering
              // however, we can't always use it because it replaces all text in the file and sometimes
              // we're only editing a sub-selection of the text in a file
              editor.getBuffer().setTextViaDiff(transformed);
            } else {
              editor.setTextInBufferRange(bufferRange, transformed);
            }

            editor.setCursorScreenPosition(cursorPositionPriorToFormat);
            runLinter(editor);

          case 14:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function executePrettierOnBufferRange(_x3, _x4, _x5) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = executePrettierOnBufferRange;