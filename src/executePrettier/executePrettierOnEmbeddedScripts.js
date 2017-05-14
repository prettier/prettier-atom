// @flow
const executePrettierOnBufferRange = require('./executePrettierOnBufferRange');

const EMBEDDED_JS_REGEX = /<script\b[^>]*>([\s\S]*?)(?=<\/script>)/gi;

const executePrettierOnEmbeddedScripts = (editor: TextEditor) =>
  editor.backwardsScanInBufferRange(EMBEDDED_JS_REGEX, editor.getBuffer().getRange(), (iter) => {
    const { start, end } = iter.range;

    // Skip formatting when <script> and </script> on the same line
    if (start.row === end.row) return;

    // Create new range with start row advanced by 1,
    // since we cannot use look-behind on variable-length starting
    // <script ...> tag
    const startModified = [start.row + 1, start.column];
    const bufferRange = new iter.range.constructor(startModified, end);

    executePrettierOnBufferRange(editor, bufferRange);
  });

module.exports = executePrettierOnEmbeddedScripts;
