"use strict";

jest.mock('../atomInterface');

const {
  isFormatOnSaveEnabled
} = require('../atomInterface');

const getFormatOnSaveStatus = require('./getFormatOnSaveStatus');

it('returns "disabled" if formatOnSave is disabled', () => {
  isFormatOnSaveEnabled.mockImplementation(() => false);
  const actual = getFormatOnSaveStatus();
  expect(actual).toEqual('disabled');
});
it('returns "enabled" if formatOnSave is enabled', () => {
  isFormatOnSaveEnabled.mockImplementation(() => true);
  const actual = getFormatOnSaveStatus();
  expect(actual).toEqual('enabled');
});