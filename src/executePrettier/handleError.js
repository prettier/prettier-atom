// @flow
const _ = require('lodash/fp');
const { shouldDisplayErrors, addErrorNotification } = require('../atomInterface');

const displayError = (error: Error) =>
  addErrorNotification('prettier-atom failed!', {
    detail: error.toString(),
    stack: error.stack,
    dismissable: true,
  });

const handleError: (error: Error) => false = _.flow(
  _.cond([[shouldDisplayErrors, displayError]]),
  _.stubFalse,
);

module.exports = handleError;
