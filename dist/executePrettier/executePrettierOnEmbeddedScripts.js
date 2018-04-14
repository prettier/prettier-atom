'use strict';

const executePrettierOnBufferRange = require('./executePrettierOnBufferRange');
const { getBufferRange } = require('../editorInterface');
const { createRange, createPoint } = require('../helpers');

const EMBEDDED_JS_REGEX = /<script\b[^>]*>([\s\S]*?)(?=<\/script>)/gi;

const backwardsScanIterator = editor => ({ range: matchingRange }) => {
  // Skip formatting when <script> and </script> on the same line
  if (matchingRange.start.row === matchingRange.end.row) return;

  // Create new range with start row advanced by 1,
  // since we cannot use look-behind on variable-length starting
  // <script ...> tag
  const nextStartPoint = createPoint(matchingRange.start.row + 1, matchingRange.start.column);
  const bufferRange = createRange(nextStartPoint, matchingRange.end);

  executePrettierOnBufferRange(editor, bufferRange);
};

const executePrettierOnEmbeddedScripts = editor => editor.backwardsScanInBufferRange(EMBEDDED_JS_REGEX, getBufferRange(editor), backwardsScanIterator(editor));

module.exports = executePrettierOnEmbeddedScripts;