'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPrettierInstance = require('./getPrettierInstance');
var general = require('./general');
var atomRelated = require('./atomRelated');

module.exports = (0, _extends3.default)({}, general, atomRelated, {
  getPrettierInstance: getPrettierInstance
});