'use strict';

var executePrettierOnBufferRange = require('./executePrettierOnBufferRange');

var _require = require('../editorInterface'),
    getBufferRange = _require.getBufferRange;

var _require2 = require('../helpers'),
    createRange = _require2.createRange,
    createPoint = _require2.createPoint;

var EMBEDDED_JS_REGEX = /<script\b[^>]*>([\s\S]*?)(?=<\/script>)/gi;

var backwardsScanIterator = function backwardsScanIterator(editor) {
  return function (_ref) {
    var matchingRange = _ref.range;

    // Skip formatting when <script> and </script> on the same line
    if (matchingRange.start.row === matchingRange.end.row) return;

    // Create new range with start row advanced by 1,
    // since we cannot use look-behind on variable-length starting
    // <script ...> tag
    var nextStartPoint = createPoint(matchingRange.start.row + 1, matchingRange.start.column);
    var bufferRange = createRange(nextStartPoint, matchingRange.end);

    executePrettierOnBufferRange(editor, bufferRange);
  };
};

var executePrettierOnEmbeddedScripts = function executePrettierOnEmbeddedScripts(editor) {
  return editor.backwardsScanInBufferRange(EMBEDDED_JS_REGEX, getBufferRange(editor), backwardsScanIterator(editor));
};

module.exports = executePrettierOnEmbeddedScripts;