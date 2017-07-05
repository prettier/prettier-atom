'use strict';

var _require = require('../editorInterface'),
    getCurrentFilePath = _require.getCurrentFilePath;

// Holds a reference to an IndieDelegate from the linter package. Used for displaying syntax errors
// See: http://steelbrain.me/linter/types/indie-linter-v2.html


var indieDelegate = null;

var set = function set(newIndieDelegate) {
  indieDelegate = newIndieDelegate;
};

var get = function get() {
  return indieDelegate;
};

var setMessages = function setMessages(editor, messages) {
  var filePath = getCurrentFilePath(editor);
  if (!indieDelegate || !filePath) return;

  indieDelegate.setMessages(filePath, messages);
};

var clearLinterErrors = function clearLinterErrors(editor) {
  return setMessages(editor, []);
};

module.exports = {
  set: set,
  get: get,
  clearLinterErrors: clearLinterErrors,
  setMessages: setMessages
};