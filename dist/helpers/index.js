'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var getPrettierInstance = require('./getPrettierInstance');
var general = require('./general');
var atomRelated = require('./atomRelated');

module.exports = _extends({}, general, atomRelated, {
  getPrettierInstance: getPrettierInstance
});