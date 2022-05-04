"use strict";

const AtomTextBufferPoint = require('atom-text-buffer-point');

const AtomTextBufferRange = require('atom-text-buffer-range');

const createPoint = (row, column) => new AtomTextBufferPoint(row, column);

const createRange = (start, end) => new AtomTextBufferRange(start, end);

module.exports = {
  createPoint,
  createRange
};