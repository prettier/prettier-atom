// @flow
jest.mock('../atomInterface');
jest.mock('./getPrettierInstance');

const buildMockEditor = require('../../tests/mocks/textEditor');
const { addErrorNotification } = require('../atomInterface');
const getPrettierInstance = require('./getPrettierInstance');
const isPrettierProperVersion = require('./isPrettierProperVersion');

const editor = buildMockEditor();

beforeEach(() => {
  // $FlowFixMe
  getPrettierInstance.mockImplementation(() => ({ getFileInfo: { sync: jest.fn() } }));
});

it('returns true if prettier has getFileInfo.sync defined', () => {
  const actual = isPrettierProperVersion(editor);

  expect(actual).toEqual(true);
});

it('displays an error once and returns false if prettier does not have getFileInfo.sync defined', () => {
  // $FlowFixMe
  getPrettierInstance.mockImplementation(() => ({}));

  const actual = isPrettierProperVersion(editor);
  isPrettierProperVersion(editor); // second call to ensure we only invoke error notification once

  expect(actual).toEqual(false);
  expect(addErrorNotification).toHaveBeenCalledTimes(1);
});
