'use strict';

var config = require('./config-schema.json');
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved

var _require = require('atom'),
    CompositeDisposable = _require.CompositeDisposable;

var _require2 = require('./statusTile'),
    createStatusTile = _require2.createStatusTile,
    updateStatusTile = _require2.updateStatusTile;

// local helpers


var format = null;
var formatOnSave = null;
var warnAboutLinterEslintFixOnSave = null;
var displayDebugInfo = null;
var toggleFormatOnSave = null;
var subscriptions = null;
var statusBarTile = null;
var tileElement = null;

// HACK: lazy load most of the code we need for performance
var lazyFormat = function lazyFormat() {
  if (!format) format = require('./format'); // eslint-disable-line global-require

  var editor = atom.workspace.getActiveTextEditor();
  if (editor) format(editor);
};

// HACK: lazy load most of the code we need for performance
var lazyFormatOnSave = function lazyFormatOnSave() {
  if (!formatOnSave) formatOnSave = require('./formatOnSave'); // eslint-disable-line global-require

  var editor = atom.workspace.getActiveTextEditor();
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
    // eslint-disable-next-line global-require
    toggleFormatOnSave = require('./toggleFormatOnSave');
  }
  toggleFormatOnSave();
};

// public API
var activate = function activate() {
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

  // HACK: an Atom bug seems to be causing old configuration settings to linger for some users
  //       https://github.com/jlongster/prettier-atom/issues/72
  atom.config.unset('prettier-atom.singleQuote');
  atom.config.unset('prettier-atom.trailingComma');
};

var deactivate = function deactivate() {
  subscriptions.dispose();
  if (statusBarTile) {
    statusBarTile.destroy();
  }
};

var consumeStatusBar = function consumeStatusBar(statusBar) {
  tileElement = createStatusTile();
  statusBarTile = statusBar.addLeftTile({
    item: tileElement,
    priority: 1000
  });
  updateStatusTile(subscriptions, tileElement);

  subscriptions.add(atom.config.observe('prettier-atom.formatOnSaveOptions.enabled', function () {
    return updateStatusTile(subscriptions, tileElement);
  }));
};

module.exports = {
  activate: activate,
  deactivate: deactivate,
  config: config,
  subscriptions: subscriptions,
  consumeStatusBar: consumeStatusBar
};