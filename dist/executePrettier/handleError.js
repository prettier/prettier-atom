'use strict';

var _ = require('lodash/fp');

var _require = require('../atomInterface'),
    shouldDisplayErrors = _require.shouldDisplayErrors,
    addErrorNotification = _require.addErrorNotification;

var displayError = function displayError(error) {
  return addErrorNotification('prettier-atom failed!', {
    detail: error.toString(),
    stack: error.stack,
    dismissable: true
  });
};

var handleError = _.flow(_.cond([[shouldDisplayErrors, displayError]]), _.stubFalse);

module.exports = handleError;