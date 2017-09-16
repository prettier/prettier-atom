'use strict';

var config = require('./config-schema.json');
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved

var _require = require('atom'),
    CompositeDisposable = _require.CompositeDisposable;

var _require2 = require('./statusTile'),
    createStatusTile = _require2.createStatusTile,
    updateStatusTile = _require2.updateStatusTile,
    updateStatusTileScope = _require2.updateStatusTileScope,
    disposeTooltip = _require2.disposeTooltip;

var linterInterface = require('./linterInterface');

// local helpers
var format = null;
var formatOnSave = null;
var warnAboutLinterEslintFixOnSave = null;
var displayDebugInfo = null;
var toggleFormatOnSave = null;
var subscriptions = null;
var statusBarHandler = null;
var statusBarTile = null;
var tileElement = null;

// HACK: lazy load most of the code we need for performance
var lazyFormat = function lazyFormat() {
  if (!format) format = require('./manualFormat'); // eslint-disable-line global-require

  var editor = atom.workspace.getActiveTextEditor();
  if (editor) format(editor);
};

// HACK: lazy load most of the code we need for performance
var lazyFormatOnSave = function lazyFormatOnSave(editor) {
  if (!formatOnSave) formatOnSave = require('./formatOnSave'); // eslint-disable-line global-require
  if (editor) formatOnSave(editor);
};

// HACK: lazy load most of the code we need for performance
var lazyWarnAboutLinterEslintFixOnSave = function lazyWarnAboutLinterEslintFixOnSave() {
  if (!warnAboutLinterEslintFixOnSave) {
    // eslint-disable-next-line global-require
    warnAboutLinterEslintFixOnSave = require('./warnAboutLinterEslintFixOnSave');
  }
  warnAboutLinterEslintFixOnSave();
};

// HACK: lazy load most of the code we need for performance
var lazyDisplayDebugInfo = function lazyDisplayDebugInfo() {
  if (!displayDebugInfo) {
    // eslint-disable-next-line global-require
    displayDebugInfo = require('./displayDebugInfo');
  }
  displayDebugInfo();
};

var lazyToggleFormatOnSave = function lazyToggleFormatOnSave() {
  if (!toggleFormatOnSave) {
    // eslint-disable-next-line global-require prefer-destructuring
    toggleFormatOnSave = require('./atomInterface').toggleFormatOnSave;
  }
  toggleFormatOnSave();
};

var attachStatusTile = function attachStatusTile() {
  if (statusBarHandler) {
    tileElement = createStatusTile();
    statusBarTile = statusBarHandler.addLeftTile({
      item: tileElement,
      priority: 1000
    });
    updateStatusTile(subscriptions, tileElement);

    subscriptions.add(atom.config.observe('prettier-atom.formatOnSaveOptions.enabled', function () {
      return updateStatusTile(subscriptions, tileElement);
    }));
    subscriptions.add(
    // onDidChangeActiveTextEditor is only available in Atom 1.18.0+.
    atom.workspace.onDidChangeActiveTextEditor ? atom.workspace.onDidChangeActiveTextEditor(function (editor) {
      return updateStatusTileScope(tileElement, editor);
    }) : atom.workspace.onDidChangeActivePaneItem(function () {
      return updateStatusTileScope(tileElement, atom.workspace.getActiveTextEditor());
    }));
  }
};

var detachStatusTile = function detachStatusTile() {
  disposeTooltip();
  if (statusBarTile) {
    statusBarTile.destroy();
  }
};

var loadPackageDeps = function loadPackageDeps() {
  return (
    // eslint-disable-next-line global-require
    require('atom-package-deps').install('prettier-atom')
    // eslint-disable-next-line no-console
    .then(function () {
      return console.log('All dependencies installed, good to go');
    })
  );
};

// public API
var activate = function activate() {
  loadPackageDeps();

  subscriptions = new CompositeDisposable();

  subscriptions.add(atom.commands.add('atom-workspace', 'prettier:format', lazyFormat));
  subscriptions.add(atom.commands.add('atom-workspace', 'prettier:debug', lazyDisplayDebugInfo));
  subscriptions.add(atom.commands.add('atom-workspace', 'prettier:toggle-format-on-save', lazyToggleFormatOnSave));

  subscriptions.add(atom.workspace.observeTextEditors(function (editor) {
    return subscriptions.add(editor.getBuffer().onWillSave(function () {
      return lazyFormatOnSave(editor);
    }));
  }));
  subscriptions.add(atom.config.observe('linter-eslint.fixOnSave', function () {
    return lazyWarnAboutLinterEslintFixOnSave();
  }));
  subscriptions.add(atom.config.observe('prettier-atom.useEslint', function () {
    return lazyWarnAboutLinterEslintFixOnSave();
  }));
  subscriptions.add(atom.config.observe('prettier-atom.formatOnSaveOptions.showInStatusBar', function (show) {
    return show ? attachStatusTile() : detachStatusTile();
  }));

  // HACK: an Atom bug seems to be causing old configuration settings to linger for some users
  //       https://github.com/prettier/prettier-atom/issues/72
  atom.config.unset('prettier-atom.singleQuote');
  atom.config.unset('prettier-atom.trailingComma');
};

var deactivate = function deactivate() {
  subscriptions.dispose();
  detachStatusTile();
};

var consumeStatusBar = function consumeStatusBar(statusBar) {
  statusBarHandler = statusBar;

  var showInStatusBar = atom.config.get('prettier-atom.formatOnSaveOptions.showInStatusBar');
  if (showInStatusBar) {
    attachStatusTile();
  }
};

var consumeIndie = function consumeIndie(registerIndie) {
  var linter = registerIndie({ name: 'Prettier' });
  subscriptions.add(linter);
  linterInterface.set(linter);

  // Setting and clearing messages per filePath
  subscriptions.add(atom.workspace.observeTextEditors(function (textEditor) {
    var editorPath = textEditor.getPath();
    if (!editorPath) {
      return;
    }

    var subscription = textEditor.onDidDestroy(function () {
      subscriptions.remove(subscription);
      linter.setMessages(editorPath, []);
      linterInterface.set(null);
    });
    subscriptions.add(subscription);
  }));
};

module.exports = {
  activate: activate,
  deactivate: deactivate,
  config: config,
  subscriptions: subscriptions,
  consumeStatusBar: consumeStatusBar,
  consumeIndie: consumeIndie
};