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
const CORE_OPTIONS_ATOM_MAP = {
  printWidth: 'editor.preferredLineLength',
  tabWidth: 'editor.tabLength',
};

// helpers
const isFileTypeSupported = path => SUPPORTED_FILE_TYPES.some(ext => path.endsWith(ext));

const getAtomConfigDefaultValue = key => {
  const editor = atom.workspace.getActiveTextEditor();
  return atom.config.get(CORE_OPTIONS_ATOM_MAP[key], editor.getRootScopeDescriptor());
}

const getConfigOption = key => {
  const configKeyValue = atom.config.get(`prettier-atom.${key}`);

  if (typeof configKeyValue === "object") {
    return configKeyValue.useDefault ? getAtomConfigDefaultValue(key) : configKeyValue.value;
  }

  return configKeyValue;
}

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
