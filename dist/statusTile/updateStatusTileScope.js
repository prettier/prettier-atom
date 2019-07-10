"use strict";

const {
  isFileFormattable,
  isPrettierProperVersion
} = require('../helpers');

const updateStatusTileScope = (element, editor) => {
  // The editor can be undefined if there is no active editor (e.g. closed all tabs).
  // eslint-disable-next-line no-param-reassign
  element.dataset.prettierCanFormatFile = editor && isPrettierProperVersion(editor) && isFileFormattable(editor) ? 'true' : 'false';
};

module.exports = updateStatusTileScope;