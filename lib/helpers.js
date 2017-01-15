const prettier = require('prettier');

// constants
const SUPPORTED_FILE_TYPES = [ '.js', '.jsx' ];
const PRETTIER_CORE_OPTIONS = [
  'printWidth',
  'tabWidth',
  'useFlowParser',
  'singleQuote',
  'trailingComma',
  'bracketSpacing',
];

// helpers
const isFileTypeSupported = path => SUPPORTED_FILE_TYPES.some(ext => path.endsWith(ext));

const getConfigOption = key => atom.config.get(`prettier-atom.${key}`);

const setConfigOption = (obj, key) => Object.assign({}, obj, { [key]: getConfigOption(key) });

const getFormatOptions = () => PRETTIER_CORE_OPTIONS.reduce(setConfigOption, {});

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
  if (!editor) return;

  const selectedText = editor.getSelectedText();
  const isTransformingFile = options.ignoreSelection || !selectedText;

  if (isTransformingFile && !isFileTypeSupported(editor.getPath())) {
    return;
  }

  const cursorPositionPriorToFormat = editor.getCursorScreenPosition();
  const textToTransform = isTransformingFile ? editor.getText() : selectedText;

  const transformed = executePrettier(textToTransform, getFormatOptions());
  if (!transformed) return;

  if (isTransformingFile) {
    editor.setText(transformed);
  } else {
    editor.setTextInBufferRange(editor.getSelectedBufferRange(), transformed);
  }

  editor.setCursorScreenPosition(cursorPositionPriorToFormat);
};

const formatOnSaveIfEnabled = () => {
  const shouldFormatOnSave = getConfigOption('formatOnSave');
  if (!shouldFormatOnSave) return;

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
