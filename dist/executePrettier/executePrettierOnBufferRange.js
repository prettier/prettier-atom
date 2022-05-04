"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2.default)(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

const _ = require('lodash/fp');

const prettierEslint = require('prettier-eslint');

const prettierStylelint = require('prettier-stylelint');

const {
  allowUnsafeNewFunction
} = require('loophole');

const {
  getPrettierEslintOptions,
  shouldUseEslint,
  shouldUseStylelint,
  shouldUseEditorConfig,
  runLinter
} = require('../atomInterface');

const {
  getCurrentFilePath,
  isCurrentScopeStyleLintScope
} = require('../editorInterface');

const {
  getPrettierInstance
} = require('../helpers');

const handleError = require('./handleError');

const getPrettierOptions = editor => // $FlowFixMe
getPrettierInstance(editor).resolveConfig.sync(getCurrentFilePath(editor), {
  editorconfig: shouldUseEditorConfig()
});

const executePrettier = (editor, text) => // $FlowFixMe
getPrettierInstance(editor).format(text, _objectSpread({
  filepath: getCurrentFilePath(editor)
}, getPrettierOptions(editor)));

const executePrettierWithCursor = (editor, text, cursorOffset) => // $FlowFixMe
getPrettierInstance(editor).formatWithCursor(text, _objectSpread({
  cursorOffset,
  filepath: getCurrentFilePath(editor)
}, getPrettierOptions(editor)));

const buildPrettierEslintOptions = (editor, text) => _objectSpread(_objectSpread({
  text
}, getPrettierEslintOptions()), {}, {
  filePath: getCurrentFilePath(editor)
});

const executePrettierEslint = (editor, text) => allowUnsafeNewFunction(() => prettierEslint(buildPrettierEslintOptions(editor, text)));

const buildPrettierStylelintOptions = (editor, text) => ({
  text,
  filePath: getCurrentFilePath(editor)
});

const executePrettierStylelint = (editor, text) => prettierStylelint.format(buildPrettierStylelintOptions(editor, text));

const executePrettierOrIntegration = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2.default)(function* (editor, text, cursorOffset) {
    if (shouldUseStylelint() && isCurrentScopeStyleLintScope(editor)) {
      // TODO: add support for cursor position - https://github.com/hugomrdias/prettier-stylelint/issues/13
      const formatted = yield executePrettierStylelint(editor, text);
      return {
        formatted,
        cursorOffset
      };
    }

    if (shouldUseEslint()) {
      // TODO: add support for cursor position - https://github.com/prettier/prettier-eslint/issues/164
      const formatted = yield executePrettierEslint(editor, text);
      return {
        formatted,
        cursorOffset
      };
    }

    let formatted; // TODO: remove this try/catch once Prettier.formatWithCursor stabilizes

    try {
      formatted = executePrettierWithCursor(editor, text, cursorOffset).formatted;
    } catch (error) {
      formatted = executePrettier(editor, text);
    }

    return {
      formatted,
      cursorOffset
    };
  });

  return function executePrettierOrIntegration(_x, _x2, _x3) {
    return _ref.apply(this, arguments);
  };
}();

const executePrettierOnBufferRange = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2.default)(function* (editor, bufferRange, options) {
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
      handleError({
        editor,
        bufferRange,
        error
      });
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
    } // calculate next cursor position after buffer has been updated with new text


    const nextCursorPosition = currentBuffer.positionForCharacterIndex(results.cursorOffset);
    editor.setCursorBufferPosition(nextCursorPosition);
    runLinter(editor);
  });

  return function executePrettierOnBufferRange(_x4, _x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}();

module.exports = executePrettierOnBufferRange;