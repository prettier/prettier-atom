'use babel';

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
const isFileTypeSupported = filepath => SUPPORTED_FILE_TYPES.some(ext => filepath.endsWith(ext));

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

const format = () => {
  const editor = atom.workspace.getActiveTextEditor();
  if (!editor) return;

  const selectedText = editor.getSelectedText();

  if (!selectedText && !isFileTypeSupported(editor.getPath())) {
    atom.notifications.addWarning('prettier-atom: File type not supported');
    return;
  }

  const cursorPositionPriorToFormat = editor.getCursorScreenPosition();

  const transformed = executePrettier(selectedText || editor.getText(), getFormatOptions());
  if (!transformed) return;

  if (selectedText) {
    editor.setTextInBufferRange(editor.getSelectedBufferRange(), transformed);
  } else {
    editor.setText(transformed);
  }

  editor.setCursorScreenPosition(cursorPositionPriorToFormat);
};

const handleEvents = (editor) => {
  editor.getBuffer().onWillSave(() => {
    const shouldFormatOnSave = getConfigOption('formatOnSave');
    const isBufferModified = editor.getBuffer().isModified();
    if (!(shouldFormatOnSave && isBufferModified)) return;

    format(null, { useSelectedText: false });
  });
};

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

// public API
module.exports = {
  config: {
    formatOnSave: {
      title: 'Format on Save',
      description: 'Format Javascript files when saving',
      type: 'boolean',
      default: false,
      order: 1,
    },
    printWidth: {
      title: 'Print Width',
      description: 'Fit code within this line limit',
      type: 'integer',
      default: 80,
      order: 2,
    },
    tabWidth: {
      title: 'Tab Width',
      description: 'Number of spaces it should use per tab',
      type: 'integer',
      default: 2,
      order: 3,
    },
    singleQuote: {
      title: 'Single Quote',
      description: 'If true, will use single instead of double quotes',
      type: 'boolean',
      default: false,
      order: 4,
    },
    trailingComma: {
      title: 'Trailing Comma',
      description: 'Controls the printing of trailing commas wherever possible',
      type: 'boolean',
      default: false,
      order: 5,
    },
    bracketSpacing: {
      title: 'Bracket Spacing',
      description: 'Controls the printing of spaces inside array and objects',
      type: 'boolean',
      default: true,
      order: 6,
    },
    useFlowParser: {
      title: 'Use Flow Parser',
      description: 'Use the [flow](https://github.com/facebook/flow) parser instead of ' +
        '[babylon](https://github.com/babel/babylon).',
      type: 'boolean',
      default: false,
      order: 7,
    },
  },
  activate() {
    this.commands = atom.commands.add('atom-workspace', 'prettier:format', format);
    this.editorObserver = atom.workspace.observeTextEditors(handleEvents);
  },
  deactivate() {
    this.commands.dispose();
    this.editorObserver.dispose();
  },
};
