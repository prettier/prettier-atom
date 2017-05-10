// @flow
const { createStatusTile, updateStatusTile } = require('./statusTile');

beforeEach(() => {
  atom = {
    config: { get: jest.fn(() => true) },
    tooltips: { add: jest.fn(() => ({ dispose: jest.fn() })) },
  };
});

describe('createStatusTile()', () => {
  it('creates a div with "Prettier" and a tooltip indicating formatOnSave status', () => {
    global.document = {
      createElement: jest.fn(() => ({
        classList: {
          add: jest.fn(),
        },
        dataset: {},
        appendChild: jest.fn(),
        addEventListener: jest.fn(),
      })),
      createTextNode: jest.fn(arg => arg),
    };

    const div = createStatusTile();

    expect(div.dataset.formatOnSave).toBe('enabled');
    expect(div.classList.add).toHaveBeenCalledWith('prettier-atom-status-tile');
    expect(div.appendChild).toHaveBeenCalledWith('Prettier');
  });
});

describe('updateStatusTile()', () => {
  it('disposes any existing tooltip and adds a new one with the current formatOnSave status', () => {
    const div = { dataset: {} };
    const disposable = { add: jest.fn() };

    // $FlowFixMe
    const tooltip = updateStatusTile(disposable, div);
    expect(atom.tooltips.add).toHaveBeenCalledWith(div, { title: 'Format on Save: enabled' });

    // $FlowFixMe
    updateStatusTile(disposable, div);
    expect(tooltip.dispose).toHaveBeenCalled();
  });
});
