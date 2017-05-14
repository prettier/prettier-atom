'use strict';

var createStatusTile = require('./createStatusTile');
var updateStatusTile = require('./updateStatusTile');

var _require = require('./tooltip'),
    disposeTooltip = _require.disposeTooltip;

module.exports = {
  createStatusTile: createStatusTile,
  updateStatusTile: updateStatusTile,
  disposeTooltip: disposeTooltip
};