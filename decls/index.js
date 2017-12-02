// @flow

// types for working with Atom stuff
declare type FilePath = string;
declare type Point = {
  row: number,
  column: number,
};
declare type Range = {
  isEqual: (range: Range) => boolean,
  start: Point,
  end: Point,
};
declare type Ranges = Array<Range>;
// eslint-disable-next-line no-undef
declare type Globs = Array<string>;
declare type Atom$Iterator = ({
  match: string,
  matchText: string,
  range: Range,
  stop: Function,
  replace: (replacement: string) => void,
}) => void;
// eslint-disable-next-line no-undef
declare type TextEditor = {
  getGrammar: () => { scopeName: string },
  getBuffer: () => { getRange: () => Range, setTextViaDiff: (text: string) => Range },
  getCursorScreenPosition: () => Point,
  getLastCursor: () => { getScopeDescriptor: () => Atom$ScopeDescriptor },
  getSelectedText: () => string,
  getSelectedBufferRanges: () => Ranges,
  getTextInBufferRange: (bufferRange: Range) => string,
  setCursorScreenPosition: (point: Point) => Point,
  setTextInBufferRange: (bufferRange: Range, text: string) => Range,
  buffer: { file: ?{ path: ?FilePath } },
  backwardsScanInBufferRange: (regex: RegExp, Range: Range, iterator: Atom$Iterator) => void,
};
declare type Atom$Disposable = any;
declare type Atom$View = any;
declare type Atom$Workspace = any;
declare type Atom$Command = { name: string, displayName: string };
declare type Atom$Notifications$Options = { detail?: ?string, dismissable?: ?boolean };
declare type Atom$Tooltips$Options = { title?: string };
declare type Atom$ScopeDescriptor = Object;
declare var atom: {
  commands: {
    dispatch: (view: Atom$View, commandName: string) => void,
    findCommands: ({ target: Atom$View }) => Array<Atom$Command>,
  },
  config: {
    get: (
      key: string,
      options?: {
        sources?: Array<string>,
        excludeSources?: Array<string>,
        scope?: Atom$ScopeDescriptor,
      },
    ) => any,
    set: (key: string, value: any) => any,
  },
  notifications: {
    addError: (message: string, options?: Atom$Notifications$Options) => void,
    addInfo: (message: string, options?: Atom$Notifications$Options) => void,
    addWarning: (message: string, options?: Atom$Notifications$Options) => void,
  },
  packages: {
    isPackageActive: (name: string) => boolean,
  },
  tooltips: {
    add: (target: HTMLElement, options?: Atom$Tooltips$Options) => Atom$Disposable,
  },
  views: {
    getView: Atom$Workspace => Atom$View,
  },
  workspace: Atom$Workspace,
  getVersion: () => string,
};
declare type Linter$Message$ReplaceWithSolution = {
  title?: string,
  position: Range,
  priority?: number,
  currentText?: string,
  replaceWith: string,
};
declare type Linter$Message$ApplySolution = {
  title?: string,
  position: Range,
  priority?: number,
  apply: () => any,
};
// eslint-disable-next-line no-undef
declare type Prettier$SyntaxError = {
  loc: { start: { line: number, column: number } } | {| line: number, column: number |},
  message: string,
  stack: string,
};
declare type Linter$Message = {
  // NOTE: These are given by providers
  location: {
    file: string,
    // ^ MUST be an absolute path (relative paths are not supported)
    position: Range,
  },
  // ^ Location of the issue (aka where to highlight)
  reference?: {
    file: string,
    // ^ MUST be an absolute path (relative paths are not supported)
    position?: Point,
  },
  // ^ Reference to a different location in the editor, useful for jumping to classes etc.
  url?: string, // external HTTP link
  // ^ HTTP link to a resource explaining the issue. Default is a google search
  icon?: string,
  // ^ Name of octicon to show in gutter
  excerpt: string,
  // ^ Error message
  severity: 'error' | 'warning' | 'info',
  // ^ Severity of error
  solutions?: Array<Linter$Message$ReplaceWithSolution | Linter$Message$ApplySolution>,
  // ^ Possible solutions to the error (user can invoke them at will)
  description?: string | (() => Promise<string> | string),
  // ^ Markdown long description of the error, accepts callback so you can do
  // http requests etc.
  linterName?: string,
  // ^ Optionally override the displayed linter name. Defaults to provider name.

  // NOTE: DO NOT SPECIFY THESE IN PROVIDER
  // Automatically added by base linter for UI consumers
  // key: string,
  // version: 2,
};
// eslint-disable-next-line no-undef
declare type Linter$IndieDelegate = {
  getName: string,
  getMessages: Array<Linter$Message>,
  clearMessages: void,
  setMessages: (filePath: string, messages: Array<Linter$Message>) => void,
  setAllMessages: (messages: Array<Linter$Message>) => void,
  onDidUpdate: (callback: Function) => Atom$Disposable,
  onDidDestroy: (callback: Function) => Atom$Disposable,
};
