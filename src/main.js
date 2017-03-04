// local helpers
let commands = null;
let editorObserver = null;
let format = null;
let formatOnSave = null;

// HACK: lazy load most of the code we need for performance
const lazyFormat = () => {
  if (!format) format = require('./format'); // eslint-disable-line global-require

  const editor = atom.workspace.getActiveTextEditor();
  if (editor) format(editor);
};

// HACK: lazy load most of the code we need for performance
const lazyFormatOnSave = () => {
  if (!formatOnSave) formatOnSave = require('./formatOnSave'); // eslint-disable-line global-require

  const editor = atom.workspace.getActiveTextEditor();
  if (editor) formatOnSave(editor);
};

const setEventHandlers = editor => editor.getBuffer().onWillSave(() => lazyFormatOnSave(editor));

// public API
export const activate = () => {
  commands = atom.commands.add('atom-workspace', 'prettier:format', lazyFormat);
  editorObserver = atom.workspace.observeTextEditors(setEventHandlers);
};

export const deactivate = () => {
  if (commands) commands.dispose();
  if (editorObserver) editorObserver.dispose();
};
