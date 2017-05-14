'use strict';

var executePrettierOnBufferRange = require('./executePrettierOnBufferRange');
var executePrettierOnEmbeddedScripts = require('./executePrettierOnEmbeddedScripts.js');

module.exports = {
  executePrettierOnBufferRange: executePrettierOnBufferRange,
  executePrettierOnEmbeddedScripts: executePrettierOnEmbeddedScripts
};