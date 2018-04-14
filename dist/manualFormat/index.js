'use strict';

const _ = require('lodash/fp');
const { executePrettierOnBufferRange, executePrettierOnEmbeddedScripts } = require('../executePrettier');
const { getBufferRange, isCurrentScopeEmbeddedScope } = require('../editorInterface');
const { clearLinterErrors } = require('../linterInterface');

const hasSelectedText = editor => !!editor.getSelectedText();

const formatSelectedBufferRanges = editor => editor.getSelectedBufferRanges().forEach(bufferRange => executePrettierOnBufferRange(editor, bufferRange));

const executePrettierOnCurrentBufferRange = editor => executePrettierOnBufferRange(editor, getBufferRange(editor));

const format = _.flow(_.tap(clearLinterErrors), _.cond([[hasSelectedText, formatSelectedBufferRanges], [isCurrentScopeEmbeddedScope, executePrettierOnEmbeddedScripts], [_.stubTrue, executePrettierOnCurrentBufferRange]]));

module.exports = format;