'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
// local helpers
var commands = null;
var editorObserver = null;
var format = null;
var formatOnSave = null;

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

var setEventHandlers = function setEventHandlers(editor) {
  return editor.getBuffer().onWillSave(function () {
    return lazyFormatOnSave(editor);
  });
};

// public API
var activate = exports.activate = function activate() {
  commands = atom.commands.add('atom-workspace', 'prettier:format', lazyFormat);
  editorObserver = atom.workspace.observeTextEditors(setEventHandlers);
};

var deactivate = exports.deactivate = function deactivate() {
  if (commands) commands.dispose();
  if (editorObserver) editorObserver.dispose();
};