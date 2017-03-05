const config = require('./config-schema.json');
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
const { CompositeDisposable } = require('atom');

// local helpers
let commands = null;
let editorObserver = null;
let format = null;
let formatOnSave = null;
let warnAboutLinterEslintFixOnSave = null;

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

// HACK: lazy load most of the code we need for performance
const lazyWarnAboutLinterEslintFixOnSave = () => {
  if (!warnAboutLinterEslintFixOnSave) {
    // eslint-disable-next-line global-require
    warnAboutLinterEslintFixOnSave = require('./warnAboutLinterEslintFixOnSave');
  }
  warnAboutLinterEslintFixOnSave();
};

const setEventHandlers = editor => editor.getBuffer().onWillSave(() => lazyFormatOnSave(editor));

const subscriptions = new CompositeDisposable();

// public API
const activate = () => {
  commands = atom.commands.add('atom-workspace', 'prettier:format', lazyFormat);
  editorObserver = atom.workspace.observeTextEditors(setEventHandlers);
  subscriptions.add(
    atom.config.observe('linter-eslint.fixOnSave', () => lazyWarnAboutLinterEslintFixOnSave()),
  );
  subscriptions.add(
    atom.config.observe('prettier-atom.useEslint', () => lazyWarnAboutLinterEslintFixOnSave()),
  );
};

const deactivate = () => {
  if (commands) commands.dispose();
  if (editorObserver) editorObserver.dispose();
  subscriptions.dispose();
};

module.exports = {
  activate,
  deactivate,
  config,
  subscriptions,
};
