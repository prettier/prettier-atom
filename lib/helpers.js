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

// helpers
const getConfigOption = key => atom.config.get(`prettier-atom.${key}`);

const setConfigOption = (obj, key) => Object.assign({}, obj, { [key]: getConfigOption(key) });

const getFormatOptions = () => PRETTIER_CORE_OPTIONS.reduce(setConfigOption, {});

const getCurrentScope = () => atom.workspace.getActiveTextEditor().getGrammar().scopeName;

const executePrettier = (text, formatOptions) => {
  try {
    return prettier.format(text, formatOptions);
  } catch (e) {
    const message = `prettier-atom: ${e.toString()}`;
    const detail = e.stack.toString();
    atom.notifications.addError(message, { detail, dismissable: true });
    console.log('Error executing Prettier:', e);
    return false;
  }
};

// public API
const format = (event, options = { ignoreSelection: false }) => {
  const editor = atom.workspace.getActiveTextEditor();
  if (!editor) {
    return;
  }

  const cursorPositionPriorToFormat = editor.getCursorScreenPosition();
  const selectedText = editor.getSelectedText();
  const isTransformingFile = options.ignoreSelection || !selectedText;

  const currentScope = getCurrentScope();
  const isEmbedded = ['text.html.vue', 'text.html.basic'].includes(currentScope);
  if (isEmbedded) {
    const re = /<script\b[^>]*>([\s\S]*?)(?=<\/script>)/gi
    editor.scan(re, iter => {
      // only transform first match
      iter.stop();

      // Create new range with start row advanced by 1,
      // since we cannot use look-behind on variable-length starting
      // <script ...> tag
      const { start, end } = iter.range;
      const range = new iter.range.constructor(
        [start.row + 1, start.column],
        end
      );

      // Transform range
      const textToTransform = editor.getTextInBufferRange(range);
      const transformed = executePrettier(textToTransform, getFormatOptions());
      if (!transformed) {
        return;
      }
      editor.setTextInBufferRange(range, transformed);
      editor.setCursorScreenPosition(cursorPositionPriorToFormat);
    })
  } else {
    const textToTransform = isTransformingFile ? editor.getText() : selectedText;

    const transformed = executePrettier(textToTransform, getFormatOptions());
    if (!transformed) {
      return;
    }

    if (isTransformingFile) {
      editor.setText(transformed);
    } else {
      editor.setTextInBufferRange(editor.getSelectedBufferRange(), transformed);
    }

    editor.setCursorScreenPosition(cursorPositionPriorToFormat);
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

  format(null, { ignoreSelection: true });
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
