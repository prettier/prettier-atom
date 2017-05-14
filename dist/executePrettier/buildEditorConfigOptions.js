'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ = require('lodash/fp');
var editorconfig = require('editorconfig');

var maxLineLengthIsNumber = _.flow(_.get('max_line_length'), _.isNumber);

var indentStyleIsTab = _.conforms({ indent_style: _.isEqual('tab') });

var indentSizeIsTab = _.conforms({ indent_size: _.isEqual('tab') });

var tabWidthIsNumber = _.conforms({ tab_width: _.isNumber });

var shouldUseTabWidth = _.overEvery([tabWidthIsNumber, _.overSome([indentSizeIsTab, indentStyleIsTab])]);

var indentSizeIsNumber = _.conforms({ indent_size: _.isNumber });

var indentStyleIsSpace = _.conforms({ indent_style: _.isEqual('space') });

var getPrintWidth = _.cond([[maxLineLengthIsNumber, function (opts) {
  return { printWidth: opts.max_line_length };
}]]);

var getTabWidth = _.cond([[shouldUseTabWidth, function (opts) {
  return { tabWidth: opts.tab_width };
}], [indentSizeIsNumber, function (opts) {
  return { tabWidth: opts.indent_size };
}]]);

var getUseTabs = _.cond([[indentStyleIsTab, _.constant({ useTabs: true })], [indentStyleIsSpace, _.constant({ useTabs: false })]]);

var mapEditorConfigOptions = function mapEditorConfigOptions() {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return _extends({}, getPrintWidth(opts), getTabWidth(opts), getUseTabs(opts));
};

var buildEditorConfigOptions = _.flow(editorconfig.parseSync, mapEditorConfigOptions);

module.exports = buildEditorConfigOptions;