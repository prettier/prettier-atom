const buildMockTextEditor = require('../../tests/mocks/textEditor');
const {
  getBufferRange,
  getCurrentScope,
  isCurrentScopeEmbeddedScope,
  getCurrentFilePath,
} = require('./index');

describe('getBufferRange()', () => {
  it('gets the buffer range from the editor', () => {
    const editor = buildMockTextEditor();

    const actual = getBufferRange(editor);

    expect(actual).toEqual('FAKE BUFFER RANGE');
  });
});

describe('getCurrentScope()', () => {
  it('gets the current scope from the editor', () => {
    const editor = buildMockTextEditor();

    const actual = getCurrentScope(editor);

    expect(actual).toEqual('FAKE SCOPE NAME');
  });
});

describe('isCurrentScopeEmbeddedScope', () => {
  it('returns true if the current scope is an embedded scope type', () => {
    const scopeName = 'text.html.basic';
    const editor = buildMockTextEditor({ getGrammar: () => ({ scopeName }) });

    const actual = isCurrentScopeEmbeddedScope(editor);

    expect(actual).toBe(true);
  });

  it('returns false if the current scope is not an embedded scope type', () => {
    const scopeName = 'source.js.jsx';
    const editor = buildMockTextEditor({ getGrammar: () => ({ scopeName }) });

    const actual = isCurrentScopeEmbeddedScope(editor);

    expect(actual).toBe(false);
  });
});

describe('getCurrentFilePath()', () => {
  it('returns the current file path if there is one', () => {
    const file = { path: 'xyz.js' };
    const editor = buildMockTextEditor({ buffer: { file } });

    const actual = getCurrentFilePath(editor);

    expect(actual).toEqual('xyz.js');
  });

  it('returns undefined if there is no current file', () => {
    const file = null;
    const editor = buildMockTextEditor({ buffer: { file } });

    const actual = getCurrentFilePath(editor);

    expect(actual).toBeUndefined();
  });
});
