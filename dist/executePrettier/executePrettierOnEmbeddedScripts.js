'use strict';

var executePrettierOnBufferRange = require('./executePrettierOnBufferRange');

var EMBEDDED_JS_REGEX = /<script\b[^>]*>([\s\S]*?)(?=<\/script>)/gi;

var executePrettierOnEmbeddedScripts = function executePrettierOnEmbeddedScripts(editor) {
  return editor.backwardsScanInBufferRange(EMBEDDED_JS_REGEX, editor.getBuffer().getRange(), function (iter) {
    var _iter$range = iter.range,
        start = _iter$range.start,
        end = _iter$range.end;

    // Skip formatting when <script> and </script> on the same line

    if (start.row === end.row) return;

    // Create new range with start row advanced by 1,
    // since we cannot use look-behind on variable-length starting
    // <script ...> tag
    var startModified = [start.row + 1, start.column];
    var bufferRange = new iter.range.constructor(startModified, end);

    executePrettierOnBufferRange(editor, bufferRange);
  });
};

module.exports = executePrettierOnEmbeddedScripts;