'use strict';

const { getCurrentScope } = require('../editorInterface');
const { getAllScopes } = require('../atomInterface');

const updateStatusTileScope = (element, editor) => {
  // The editor can be undefined if there is no active editor (e.g. closed all tabs).
  // eslint-disable-next-line no-param-reassign
  element.dataset.prettierMatchScope = editor && getAllScopes().includes(getCurrentScope(editor)) ? 'true' : 'false';
};

module.exports = updateStatusTileScope;