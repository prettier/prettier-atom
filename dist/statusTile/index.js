'use strict';

const createStatusTile = require('./createStatusTile');
const updateStatusTile = require('./updateStatusTile');
const updateStatusTileScope = require('./updateStatusTileScope');
const { disposeTooltip } = require('./tooltip');

module.exports = {
  createStatusTile,
  updateStatusTile,
  updateStatusTileScope,
  disposeTooltip
};