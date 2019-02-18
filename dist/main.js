'use strict';

// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
const { CompositeDisposable } = require('atom');
const config = require('./config-schema.json');
const { createStatusTile, updateStatusTile, updateStatusTileScope, disposeTooltip } = require('./statusTile');
const linterInterface = require('./linterInterface');
const format = require('./manualFormat'); // eslint-disable-line global-require
const formatOnSave = require('./formatOnSave'); // eslint-disable-line global-require
// eslint-disable-next-line global-require
const warnAboutLinterEslintFixOnSave = require('./warnAboutLinterEslintFixOnSave');
// eslint-disable-next-line global-require
const displayDebugInfo = require('./displayDebugInfo');
// eslint-disable-next-line global-require,prefer-destructuring
const toggleFormatOnSave = require('./atomInterface').toggleFormatOnSave;

// local helpers
let subscriptions = null;
let statusBarHandler = null;
let statusBarTile = null;
let tileElement = null;

const attachStatusTile = () => {
  if (statusBarHandler) {
    tileElement = createStatusTile();
    statusBarTile = statusBarHandler.addLeftTile({
      item: tileElement,
      priority: 1000
    });
    updateStatusTile(subscriptions, tileElement);

    subscriptions.add(atom.config.observe('prettier-atom.formatOnSaveOptions.enabled', () => updateStatusTile(subscriptions, tileElement)));
    subscriptions.add(
    // onDidChangeActiveTextEditor is only available in Atom 1.18.0+.
    atom.workspace.onDidChangeActiveTextEditor ? atom.workspace.onDidChangeActiveTextEditor(editor => updateStatusTileScope(tileElement, editor)) : atom.workspace.onDidChangeActivePaneItem(() => updateStatusTileScope(tileElement, atom.workspace.getActiveTextEditor())));
  }
};

const detachStatusTile = () => {
  disposeTooltip();
  if (statusBarTile) {
    statusBarTile.destroy();
  }
};

const loadPackageDeps = () =>
// eslint-disable-next-line global-require
require('atom-package-deps').install('prettier-atom')
// eslint-disable-next-line no-console
.then(() => console.log('All dependencies installed, good to go'));

// public API
const activate = () => {
  loadPackageDeps();

  subscriptions = new CompositeDisposable();

  subscriptions.add(atom.commands.add('atom-workspace', 'prettier:format', () => {
    const editor = atom.workspace.getActiveTextEditor();
    if (editor) format(editor);
  }), atom.commands.add('atom-workspace', 'prettier:debug', displayDebugInfo), atom.commands.add('atom-workspace', 'prettier:toggle-format-on-save', toggleFormatOnSave), atom.workspace.observeTextEditors(editor => subscriptions.add(editor.getBuffer().onWillSave(() => editor && formatOnSave(editor)))), atom.config.observe('linter-eslint.fixOnSave', warnAboutLinterEslintFixOnSave), atom.config.observe('prettier-atom.useEslint', warnAboutLinterEslintFixOnSave), atom.config.observe('prettier-atom.formatOnSaveOptions.showInStatusBar', show => show ? attachStatusTile() : detachStatusTile()));

  // HACK: an Atom bug seems to be causing old configuration settings to linger for some users
  //       https://github.com/prettier/prettier-atom/issues/72
  atom.config.unset('prettier-atom.singleQuote');
  atom.config.unset('prettier-atom.trailingComma');
};

const deactivate = () => {
  subscriptions.dispose();
  detachStatusTile();
};

const consumeStatusBar = statusBar => {
  statusBarHandler = statusBar;

  const showInStatusBar = atom.config.get('prettier-atom.formatOnSaveOptions.showInStatusBar');
  if (showInStatusBar) {
    attachStatusTile();
  }
};

const consumeIndie = registerIndie => {
  const linter = registerIndie({ name: 'Prettier' });
  linterInterface.set(linter);
  subscriptions.add(linter);

  // Setting and clearing messages per filePath
  subscriptions.add(atom.workspace.observeTextEditors(textEditor => {
    const editorPath = textEditor.getPath();
    if (!editorPath) {
      return;
    }

    const subscription = textEditor.onDidDestroy(() => {
      subscriptions.remove(subscription);
      linter.setMessages(editorPath, []);
    });
    subscriptions.add(subscription);
  }));
};

module.exports = {
  activate,
  deactivate,
  config,
  subscriptions,
  consumeStatusBar,
  consumeIndie
};