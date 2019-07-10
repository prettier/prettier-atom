"use strict";

const _ = require('lodash/fp');

const {
  executePrettierOnBufferRange
} = require('../executePrettier');

const {
  getBufferRange
} = require('../editorInterface');

const {
  clearLinterErrors
} = require('../linterInterface');

const {
  isPrettierProperVersion
} = require('../helpers');

const hasSelectedText = editor => !!editor.getSelectedText();

const formatSelectedBufferRanges = editor => editor.getSelectedBufferRanges().forEach(bufferRange => executePrettierOnBufferRange(editor, bufferRange));

const executePrettierOnCurrentBufferRange = editor => executePrettierOnBufferRange(editor, getBufferRange(editor));

const format = _.cond([[isPrettierProperVersion, _.flow(_.tap(clearLinterErrors), _.cond([[hasSelectedText, formatSelectedBufferRanges], [_.stubTrue, executePrettierOnCurrentBufferRange]]))]]);

module.exports = format;