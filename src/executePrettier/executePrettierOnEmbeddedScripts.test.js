jest.mock('./executePrettierOnBufferRange');

const buildMockTextEditor = require('../../tests/mocks/textEditor');
const executePrettierOnBufferRange = require('./executePrettierOnBufferRange');
const executePrettierOnEmbeddedScripts = require('./executePrettierOnEmbeddedScripts');

test('retrieves buffer ranges for embedded scripts and executes prettier on them', () => {
  const scriptRange = { start: { row: 2, column: 0 }, end: { row: 4, column: 5 } };
  const entireFileRange = {
    constructor: () => scriptRange,
    start: { row: 0, column: 0 },
    end: { row: 4, column: 5 },
  };
  const editor = buildMockTextEditor({
    backwardsScanInBufferRange: (regex, range, iterator) => iterator({ range: entireFileRange }),
  });

  executePrettierOnEmbeddedScripts(editor);

  expect(executePrettierOnBufferRange).toHaveBeenCalledWith(editor, scriptRange);
});
