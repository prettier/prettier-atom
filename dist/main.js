'use strict';

var config = require('./config-schema.json');
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved

var _require = require('atom'),
    CompositeDisposable = _require.CompositeDisposable;

// local helpers


var format = null;
var formatOnSave = null;
var warnAboutLinterEslintFixOnSave = null;
var subscriptions = null;

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

// public API
var activate = function activate() {
  subscriptions = new CompositeDisposable();

  subscriptions.add(atom.commands.add('atom-workspace', 'prettier:format', lazyFormat));
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
};

module.exports = {
  activate: activate,
  deactivate: deactivate,
  config: config,
  subscriptions: subscriptions
};