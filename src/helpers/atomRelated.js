// @flow
const Point = require('atom-text-buffer-point');
const Range = require('atom-text-buffer-range');

const createPoint = (row: number, column: number): Point => new Point(row, column);

const createRange = (start: Point | [number, number], end: Point | [number, number]): Range =>
  new Range(start, end);

module.exports = {
  createPoint,
  createRange,
};
