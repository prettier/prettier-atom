// @flow
const _ = require('lodash/fp');
const prettierEslint = require('prettier-eslint');
const prettierStylelint = require('prettier-stylelint');
const { allowUnsafeNewFunction } = require('loophole');

const {
  getPrettierEslintOptions,
  shouldUseEslint,
  shouldUseStylelint,
  runLinter,
} = require('../atomInterface');
const { getCurrentFilePath, isCurrentScopeCssScope } = require('../editorInterface');
const { getPrettierInstance } = require('../helpers');
const buildPrettierOptions = require('./buildPrettierOptions');
const handleError = require('./handleError');

const executePrettier = (editor: TextEditor, text: string) =>
  // $FlowFixMe
  getPrettierInstance(editor).format(text, buildPrettierOptions(editor));

const executePrettierWithCursor = (
  editor: TextEditor,
  text: string,
  cursorOffset: number,
): Prettier$CursorResult =>
  // $FlowFixMe
  getPrettierInstance(editor).formatWithCursor(text, {
    ...buildPrettierOptions(editor),
    cursorOffset,
  });

const buildPrettierEslintOptions = (editor: TextEditor, text: string) => ({
  text,
  ...getPrettierEslintOptions(),
  fallbackPrettierOptions: buildPrettierOptions(editor),
  filePath: getCurrentFilePath(editor),
});

const executePrettierEslint = (editor: TextEditor, text: string): string =>
  allowUnsafeNewFunction(() => prettierEslint(buildPrettierEslintOptions(editor, text)));

const buildPrettierStylelintOptions = (editor: TextEditor, text: string) => ({
  text,
  prettierOptions: buildPrettierOptions(editor),
  filePath: getCurrentFilePath(editor),
});

const executePrettierStylelint = (editor: TextEditor, text: string): Promise<string> =>
  prettierStylelint.format(buildPrettierStylelintOptions(editor, text));

const executePrettierOrIntegration = async (
  editor: TextEditor,
  text: string,
  cursorOffset: number,
): Promise<{ formatted: string, cursorOffset: number }> => {
  if (shouldUseStylelint() && isCurrentScopeCssScope(editor)) {
    // TODO: add support for cursor position - https://github.com/hugomrdias/prettier-stylelint/issues/13
    const formatted = await executePrettierStylelint(editor, text);

    return { formatted, cursorOffset };
  }

  if (shouldUseEslint()) {
    // TODO: add support for cursor position - https://github.com/prettier/prettier-eslint/issues/164
    const formatted = executePrettierEslint(editor, text);

    return { formatted, cursorOffset };
  }

  let formatted: string;

  // TODO: remove this try/catch once Prettier.formatWithCursor stabilizes
  try {
    formatted = executePrettierWithCursor(editor, text, cursorOffset).formatted;
  } catch (error) {
    formatted = executePrettier(editor, text);
  }

  return { formatted, cursorOffset };
};

const executePrettierOnBufferRange = async (
  editor: TextEditor,
  bufferRange: Range,
  options?: { setTextViaDiff?: boolean },
) => {
  // grab cursor position and file contents
  const currentBuffer = editor.getBuffer();
  const cursorPosition: Point = editor.getCursorBufferPosition();
  const textToTransform: string = editor.getTextInBufferRange(bufferRange);
  const cursorOffset: number = currentBuffer.characterIndexForPosition(cursorPosition);
  let results: Prettier$CursorResult = {
    cursorOffset,
    formatted: textToTransform,
  };

  if (_.isEmpty(textToTransform)) return;

  try {
    results = await executePrettierOrIntegration(editor, textToTransform, cursorOffset);
  } catch (error) {
    handleError({ editor, bufferRange, error });
    return;
  }

  const isTextUnchanged = results.formatted === textToTransform;
  if (isTextUnchanged) return;

  if (options && options.setTextViaDiff) {
    // we use setTextViaDiff when formatting the entire buffer to improve performance,
    // maintain metadata (bookmarks, folds, etc) and eliminate syntax highlight flickering
    // however, we can't always use it because it replaces all text in the file and sometimes
    // we're only editing a sub-selection of the text in a file
    currentBuffer.setTextViaDiff(results.formatted);
  } else {
    editor.setTextInBufferRange(bufferRange, results.formatted);
  }

  // calculate next cursor position after buffer has been updated with new text
  const nextCursorPosition = currentBuffer.positionForCharacterIndex(results.cursorOffset);

  editor.setCursorBufferPosition(nextCursorPosition);
  runLinter(editor);
};

module.exports = executePrettierOnBufferRange;
