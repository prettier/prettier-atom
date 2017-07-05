// @flow
const _ = require('lodash/fp');
const path = require('path');
const ignore = require('ignore');
const { findCached } = require('atom-linter');
const Point = require('atom-text-buffer-point');
const Range = require('atom-text-buffer-range');

const isPresent = (target: any): boolean =>
  !!target && (typeof target.length === 'undefined' || target.length > 0);

const safePathParse = (filePath: FilePath) =>
  typeof filePath === 'string' && filePath.length > 0 ? path.parse(filePath) : undefined;

const getDirFromFilePath: (filePath: ?FilePath) => ?FilePath = _.flow(safePathParse, _.get('dir'));

const someGlobsMatchFilePath = (globs: Globs, filePath: ?FilePath) =>
  isPresent(filePath) && ignore().add(globs).ignores(filePath);

const findCachedFromFilePath = (filePath: ?FilePath, name: string | Array<string>): ?FilePath =>
  _.flow(
    getDirFromFilePath,
    (dirPath: FilePath): ?FilePath => (isPresent(dirPath) ? findCached(dirPath, name) : undefined),
  )(filePath);

const createPoint = (row: number, column: number): Point => new Point(row, column);

const createRange = (start: Point | [number, number], end: Point | [number, number]): Range =>
  new Range(start, end);

module.exports = {
  isPresent,
  getDirFromFilePath,
  someGlobsMatchFilePath,
  findCachedFromFilePath,
  createRange,
  createPoint,
};
