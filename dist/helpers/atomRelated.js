"use strict";

const Point = require('atom-text-buffer-point');

const Range = require('atom-text-buffer-range');

const createPoint = (row, column) => new Point(row, column);

const createRange = (start, end) => new Range(start, end);

module.exports = {
  createPoint,
  createRange
};