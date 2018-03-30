jest.mock('../atomInterface');
jest.mock('../editorInterface');

const { getCurrentScope } = require('../editorInterface');
const { getScopes } = require('../atomInterface');
const updateStatusTileScope = require('./updateStatusTileScope');

const callUpdateStatusTileScope = editor => {
  const div = { dataset: {} };

  updateStatusTileScope(div, editor);

  return div;
};

beforeEach(() => {
  getScopes.mockImplementation(() => ['source.js']);
});

it('sets the match-scope data attribute to "true" if the editor is in scope', () => {
  getCurrentScope.mockImplementation(() => 'source.js');

  const div = callUpdateStatusTileScope({});

  expect(div.dataset.prettierMatchScope).toBe('true');
});

it('sets the match-scope data attribute to "false" if the editor is out of scope', () => {
  getCurrentScope.mockImplementation(() => 'source.html');

  const div = callUpdateStatusTileScope({});

  expect(div.dataset.prettierMatchScope).toBe('false');
});

it('sets the match-scope data attribute to "false" if there is no active editor', () => {
  getCurrentScope.mockImplementation(() => 'source.js');

  const div = callUpdateStatusTileScope(undefined);

  expect(div.dataset.prettierMatchScope).toBe('false');
});
