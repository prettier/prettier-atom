'use strict';

var Point = require('atom-text-buffer-point');
var Range = require('atom-text-buffer-range');

var createPoint = function createPoint(row, column) {
  return new Point(row, column);
};

var createRange = function createRange(start, end) {
  return new Range(start, end);
};

module.exports = {
  createPoint: createPoint,
  createRange: createRange
};