// @flow
const getPrettierInstance = require('./getPrettierInstance');
const general = require('./general');
const atomRelated = require('./atomRelated');
const isFileFormattable = require('./isFileFormattable');
const isPrettierProperVersion = require('./isPrettierProperVersion');

module.exports = {
  ...general,
  ...atomRelated,
  getPrettierInstance,
  isPrettierProperVersion,
  isFileFormattable,
};
