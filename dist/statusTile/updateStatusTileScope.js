'use strict';

var _require = require('../editorInterface'),
    getCurrentScope = _require.getCurrentScope;

var _require2 = require('../atomInterface'),
    getAllScopes = _require2.getAllScopes;

var updateStatusTileScope = function updateStatusTileScope(element, editor) {
  if (!element) return;

  // The editor can be undefined if there is no active editor (e.g. closed all tabs).
  // eslint-disable-next-line no-param-reassign
  element.dataset.prettierMatchScope = editor !== undefined && getAllScopes().includes(getCurrentScope(editor)) ? 'true' : 'false';
};

module.exports = updateStatusTileScope;