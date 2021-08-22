// @flow
const AtomTextBufferPoint = require('atom-text-buffer-point');
const AtomTextBufferRange = require('atom-text-buffer-range');

const createPoint = (row: number, column: number): Point => new AtomTextBufferPoint(row, column);

const createRange = (start: Point | [number, number], end: Point | [number, number]): Range =>
  new AtomTextBufferRange(start, end);

module.exports = {
  createPoint,
  createRange,
};
