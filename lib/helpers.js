const prettier = require('prettier');

// constants
const PRETTIER_CORE_OPTIONS = [
  'printWidth',
  'tabWidth',
  'useFlowParser',
  'singleQuote',
  'trailingComma',
  'bracketSpacing',
];

const EMBEDDED_SCOPE = [ 'text.html.vue', 'text.html.basic' ];

// helpers
const getConfigOption = key => atom.config.get(`prettier-atom.${key}`);

const setConfigOption = (obj, key) => Object.assign({}, obj, { [key]: getConfigOption(key) });

const getFormatOptions = () => PRETTIER_CORE_OPTIONS.reduce(setConfigOption, {});

const getCurrentScope = () => atom.workspace.getActiveTextEditor().getGrammar().scopeName;

const executePrettier = (text, formatOptions, options = { ignoreErrors: false }) => {
  try {
    return prettier.format(text, formatOptions);
  } catch (e) {
    console.log('Error executing Prettier:', e);

    if (!options.ignoreErrors) {
      const message = `prettier-atom: ${e.toString()}`;
      const detail = e.stack.toString();
      atom.notifications.addError(message, { detail, dismissable: true });
    }

    return false;
  }
};

const transformRange = (editor, range, options = { ignoreErrors: false }) => {
  const cursorPositionPriorToFormat = editor.getCursorScreenPosition();
  const textToTransform = editor.getTextInBufferRange(range);
  const transformed = executePrettier(textToTransform, getFormatOptions(), options);
  if (!transformed) {
    return;
  }
  editor.setTextInBufferRange(range, transformed);
  editor.setCursorScreenPosition(cursorPositionPriorToFormat);
};

// public API
const format = (event, options = { ignoreSelection: false, ignoreErrors: false }) => {
  const editor = atom.workspace.getActiveTextEditor();
  if (!editor) {
    return;
  }

  const selectedText = editor.getSelectedText();
  const bufferRange = editor.getBuffer().getRange();
  const isEmbedded = EMBEDDED_SCOPE.includes(getCurrentScope());

  if (options.ignoreSelection || !selectedText) {
    // transform entire file
    if (isEmbedded) {
      const re = /<script\b[^>]*>([\s\S]*?)(?=<\/script>)/gi;
      editor.backwardsScanInBufferRange(re, bufferRange, (iter) => {
        // Create new range with start row advanced by 1,
        // since we cannot use look-behind on variable-length starting
        // <script ...> tag
        const { start, end } = iter.range;
        const startModified = [ start.row + 1, start.column ];
        const range = new iter.range.constructor(startModified, end);
        transformRange(editor, range, { ignoreErrors: options.ignoreErrors });
      });
    } else {
      transformRange(editor, bufferRange, { ignoreErrors: options.ignoreErrors });
    }
  } else {
    // transform selected ranges
    editor.getSelectedBufferRanges().forEach((range) => {
      transformRange(editor, range, { ignoreErrors: options.ignoreErrors });
    });
  }
};

const formatOnSaveIfEnabled = () => {
  const shouldFormatOnSave = getConfigOption('formatOnSave');
  if (!shouldFormatOnSave) {
    return;
  }

  const currentScope = getCurrentScope();
  const isInScope = getConfigOption('formatOnSaveScopes').includes(currentScope);
  if (!isInScope) {
    return;
  }

  format(null, {
    ignoreSelection: true,
    ignoreErrors: !getConfigOption('formatOnSaveSilentError'),
  });
};

module.exports.format = format;
module.exports.formatOnSaveIfEnabled = formatOnSaveIfEnabled;
// Uncomment this to format on resize. Not ready yet. :)
//
// if (editor.editorElement) {
//   window.addEventListener('resize', e => {
//     const { width } = window.document.body.getBoundingClientRect();
//     const columns = width /
//       editor.editorElement.getDefaultCharacterWidth() |
//       0;
//     console.log(width, columns);
//     this.format({ selection: false, printWidth: columns });
//   });
// }
