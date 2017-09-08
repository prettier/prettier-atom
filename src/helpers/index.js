// @flow
const getPrettierInstance = require('./getPrettierInstance');
const general = require('./general');
const atomRelated = require('./atomRelated');

module.exports = {
  ...general,
  ...atomRelated,
  getPrettierInstance,
};
