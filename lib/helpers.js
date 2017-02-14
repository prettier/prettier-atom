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

const EMBEDDED_SCOPE = [
  'text.html.vue',
  'text.html.basic',
];

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

const transformRange = (editor, range) => {
  const cursorPositionPriorToFormat = editor.getCursorScreenPosition();
  const textToTransform = editor.getTextInBufferRange(range);
  const transformed = executePrettier(textToTransform, getFormatOptions());
  if (!transformed) {
    return;
  }
  editor.setTextInBufferRange(range, transformed);
  editor.setCursorScreenPosition(cursorPositionPriorToFormat);
};

// public API
const format = (event, options = { ignoreSelection: false }) => {
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
      editor.backwardsScanInBufferRange(re, bufferRange, iter => {
        // Create new range with start row advanced by 1,
        // since we cannot use look-behind on variable-length starting
        // <script ...> tag
        const { start, end } = iter.range;
        const startModified = [start.row + 1, start.column];
        const range = new iter.range.constructor(startModified, end);
        transformRange(editor, range);
      });
    } else {
      transformRange(editor, bufferRange);
    }
  } else {
    // transform selected ranges
    editor.getSelectedBufferRanges().forEach(range => {
      transformRange(editor, range);
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
