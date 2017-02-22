const prettier = require('prettier');
const { getConfigOption } = require('./helpers');

const EMBEDDED_JS_REGEX = /<script\b[^>]*>([\s\S]*?)(?=<\/script>)/gi;

const useAtomTabLengthIfAuto = (editor, tabLength) =>
  tabLength === 'auto'
    ? atom.config.get('editor.tabLength', { scope: editor.getLastCursor().getScopeDescriptor() })
    : Number(tabLength);

const getPrettierOptions = editor => ({
  printWidth: getConfigOption('printWidth'),
  tabWidth: useAtomTabLengthIfAuto(editor, getConfigOption('tabWidth')),
  parser: getConfigOption('parser'),
  singleQuote: getConfigOption('singleQuote'),
  trailingComma: getConfigOption('trailingComma'),
  bracketSpacing: getConfigOption('bracketSpacing'),
  jsxBracketSameLine: getConfigOption('jsxBracketSameLine'),
});

const handleError = (error) => {
  console.log('Error executing Prettier:', error);

  if (!getConfigOption('ignoreErrors')) {
    const message = `prettier-atom: ${error.toString()}`;
    const detail = error.stack.toString();

    atom.notifications.addError(message, { detail, dismissable: true });
  }

  return false;
};

const executePrettier = (editor, text) => {
  try {
    return prettier.format(text, getPrettierOptions(editor));
  } catch (error) {
    return handleError(error);
  }
};

const executePrettierOnBufferRange = (editor, bufferRange) => {
  const cursorPositionPriorToFormat = editor.getCursorScreenPosition();
  const textToTransform = editor.getTextInBufferRange(bufferRange);
  const transformed = executePrettier(editor, textToTransform);

  if (!transformed) return;

  editor.setTextInBufferRange(bufferRange, transformed);
  editor.setCursorScreenPosition(cursorPositionPriorToFormat);
};

const executePrettierOnEmbeddedScripts = editor =>
  editor.backwardsScanInBufferRange(EMBEDDED_JS_REGEX, editor.getBuffer().getRange(), (iter) => {
    // Create new range with start row advanced by 1,
    // since we cannot use look-behind on variable-length starting
    // <script ...> tag
    const { start, end } = iter.range;
    const startModified = [ start.row + 1, start.column ];
    const bufferRange = new iter.range.constructor(startModified, end);

    executePrettierOnBufferRange(editor, bufferRange);
  });

module.exports = {
  executePrettierOnBufferRange,
  executePrettierOnEmbeddedScripts,
};
