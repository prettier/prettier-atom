const buildMockTextEditor = require('../../tests/mocks/textEditor');
const {
  getBufferRange,
  getCurrentScope,
  isCurrentScopeEmbeddedScope,
  isCurrentScopeStyleLintScope,
  getCurrentFilePath,
} = require('./index');

describe('getBufferRange()', () => {
  it('gets the buffer range from the editor', () => {
    const fakeBufferRange = {
      start: { row: 0, column: 0 },
      end: { row: 0, column: 1 },
    };
    const editor = buildMockTextEditor({
      getBuffer: () => ({ getRange: () => fakeBufferRange }),
    });

    const actual = getBufferRange(editor);

    expect(actual).toEqual(fakeBufferRange);
  });
});

describe('getCurrentScope()', () => {
  it('gets the current scope from the editor', () => {
    const editor = buildMockTextEditor();

    const actual = getCurrentScope(editor);

    expect(actual).toEqual('FAKE SCOPE NAME');
  });
});

describe('isCurrentScopeEmbeddedScope()', () => {
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

describe('isCurrentScopeStyleLintScope()', () => {
  it('returns true if the current scope is a CSS scope type', () => {
    const editor = buildMockTextEditor({ getGrammar: () => ({ scopeName: 'source.css' }) });

    const actual = isCurrentScopeStyleLintScope(editor);

    expect(actual).toBe(true);
  });

  it('returns false if the current scope is not a CSS scope type', () => {
    const editor = buildMockTextEditor({ getGrammar: () => ({ scopeName: 'source.python' }) });

    const actual = isCurrentScopeStyleLintScope(editor);

    expect(actual).toBe(false);
  });
});

describe('getCurrentFilePath()', () => {
  it('returns the current file path if there is one', () => {
    const file = { path: 'xyz.js', getPath: () => 'xyz.js' };
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

  it('uses the getPath method over reading the path directly from the buffer', () => {
    const file = { path: 'wrongPath.js', getPath: () => 'rightPath.js' };
    const editor = buildMockTextEditor({ buffer: { file } });

    const actual = getCurrentFilePath(editor);

    expect(actual).toEqual('rightPath.js');
  });
});
