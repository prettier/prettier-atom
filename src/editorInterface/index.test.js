jest.mock('../atomInterface');

const buildMockTextEditor = require('../../tests/mocks/textEditor');
const { getCssScopes, getTypescriptScopes, getJsonScopes, getGraphQlScopes } = require('../atomInterface');
const {
  getBufferRange,
  getCurrentScope,
  isCurrentScopeEmbeddedScope,
  isCurrentScopeCssScope,
  isCurrentScopeTypescriptScope,
  isCurrentScopeJsonScope,
  isCurrentScopeGraphQlScope,
  getCurrentFilePath,
} = require('./index');

describe('getBufferRange()', () => {
  it('gets the buffer range from the editor', () => {
    const fakeBufferRange = { start: { row: 0, column: 0 }, end: { row: 0, column: 1 } };
    const editor = buildMockTextEditor({ getBuffer: () => ({ getRange: () => fakeBufferRange }) });

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

describe('isCurrentScopeCssScope()', () => {
  it('returns true if the current scope is a CSS scope type', () => {
    const scopeName = 'src.typescript';
    const editor = buildMockTextEditor({ getGrammar: () => ({ scopeName }) });
    getCssScopes.mockImplementation(() => ['src.typescript']);

    const actual = isCurrentScopeCssScope(editor);

    expect(actual).toBe(true);
  });

  it('returns false if the current scope is not a CSS scope type', () => {
    const scopeName = 'src.python';
    const editor = buildMockTextEditor({ getGrammar: () => ({ scopeName }) });
    getCssScopes.mockImplementation(() => ['src.typescript']);

    const actual = isCurrentScopeCssScope(editor);

    expect(actual).toBe(false);
  });
});

describe('isCurrentScopeTypescriptScope()', () => {
  it('returns true if the current scope is a typescript scope type', () => {
    const scopeName = 'src.typescript';
    const editor = buildMockTextEditor({ getGrammar: () => ({ scopeName }) });
    getTypescriptScopes.mockImplementation(() => ['src.typescript']);

    const actual = isCurrentScopeTypescriptScope(editor);

    expect(actual).toBe(true);
  });

  it('returns false if the current scope is not a typescript scope type', () => {
    const scopeName = 'src.python';
    const editor = buildMockTextEditor({ getGrammar: () => ({ scopeName }) });
    getTypescriptScopes.mockImplementation(() => ['src.typescript']);

    const actual = isCurrentScopeTypescriptScope(editor);

    expect(actual).toBe(false);
  });
});

describe('isCurrentScopeJsonScope()', () => {
  it('returns true if the current scope is a JSON scope type', () => {
    const scopeName = 'src.json';
    const editor = buildMockTextEditor({ getGrammar: () => ({ scopeName }) });
    getJsonScopes.mockImplementation(() => ['src.json']);

    const actual = isCurrentScopeJsonScope(editor);

    expect(actual).toBe(true);
  });

  it('returns false if the current scope is not a JSON scope type', () => {
    const scopeName = 'src.css';
    const editor = buildMockTextEditor({ getGrammar: () => ({ scopeName }) });
    getJsonScopes.mockImplementation(() => ['src.json']);

    const actual = isCurrentScopeJsonScope(editor);

    expect(actual).toBe(false);
  });
});

describe('isCurrentScopeGraphQlScope()', () => {
  it('returns true if the current scope is a GraphQl scope type', () => {
    const scopeName = 'meta.type.interface.graphql';
    const editor = buildMockTextEditor({ getGrammar: () => ({ scopeName }) });
    getGraphQlScopes.mockImplementation(() => ['meta.type.interface.graphql']);

    const actual = isCurrentScopeGraphQlScope(editor);

    expect(actual).toBe(true);
  });

  it('returns false if the current scope is not a GraphQl scope type', () => {
    const scopeName = 'src.css';
    const editor = buildMockTextEditor({ getGrammar: () => ({ scopeName }) });
    getGraphQlScopes.mockImplementation(() => ['meta.type.interface.graphql']);

    const actual = isCurrentScopeGraphQlScope(editor);

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
