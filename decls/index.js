// types for working with Atom stuff
declare type FilePath = string;
declare type Point = { row: number, column: number };
declare type Range = { start: Point, end: Point };
declare type Ranges = Array<Range>;
// eslint-disable-next-line no-undef
declare type Globs = Array<string>;
// eslint-disable-next-line no-undef
declare type TextEditor = {
  getGrammar: () => { scopeName: string },
  getBuffer: () => { getRange: () => Range },
  getCursorScreenPosition: () => Point,
  getLastCursor: () => { getScopeDescriptor: () => string },
  getSelectedText: () => string,
  getSelectedBufferRanges: () => Ranges,
  // getTextInRange: () => string,
  getTextInBufferRange: () => string,
  setCursorScreenPosition: (point: Point) => Point,
  setTextInBufferRange: (bufferRange: Range, text: string) => Range,
  buffer: { file: ?{ path: ?FilePath } },
  backwardsScanInBufferRange: (
    regex: RegExp,
    Range: Range,
    iter: (
      {
        match: string,
        matchText: string,
        range: Range,
        stop: Function,
        replace: (replacement: string) => void,
      },
    ) => void,
  ) => void,
};
declare var atom: {
  config: {
    get: (key: string) => any,
  },
  notifications: {
    addError: (message: string, options?: { detail?: string, dismissable?: boolean }) => void,
  },
};
