'use strict';

const _ = require('lodash/fp');
const { clearLinterErrors } = require('../linterInterface');
const { getBufferRange } = require('../editorInterface');
const { executePrettierOnBufferRange } = require('../executePrettier');
const { attemptWithErrorNotification } = require('../atomInterface');
const shouldFormatOnSave = require('./shouldFormatOnSave');

const executePrettier = editor => executePrettierOnBufferRange(editor, getBufferRange(editor), { setTextViaDiff: true });

const formatOnSaveIfAppropriate = _.flow(_.tap(clearLinterErrors), _.cond([[shouldFormatOnSave, executePrettier]]));

const safeFormatOnSaveIfAppropriate = editor => attemptWithErrorNotification(() => formatOnSaveIfAppropriate(editor));

module.exports = safeFormatOnSaveIfAppropriate;