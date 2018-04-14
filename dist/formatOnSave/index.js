'use strict';

const _ = require('lodash/fp');
const { clearLinterErrors } = require('../linterInterface');
const { isCurrentScopeEmbeddedScope, getBufferRange } = require('../editorInterface');
const { executePrettierOnBufferRange, executePrettierOnEmbeddedScripts } = require('../executePrettier');
const { attemptWithErrorNotification } = require('../atomInterface');
const shouldFormatOnSave = require('./shouldFormatOnSave');

const callAppropriatePrettierExecutor = editor => isCurrentScopeEmbeddedScope(editor) ? executePrettierOnEmbeddedScripts(editor) : executePrettierOnBufferRange(editor, getBufferRange(editor), { setTextViaDiff: true });

const formatOnSaveIfAppropriate = _.flow(_.tap(clearLinterErrors), _.cond([[shouldFormatOnSave, callAppropriatePrettierExecutor]]));

const safeFormatOnSaveIfAppropriate = editor => attemptWithErrorNotification(() => formatOnSaveIfAppropriate(editor));

module.exports = safeFormatOnSaveIfAppropriate;