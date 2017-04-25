// @flow
const { createStatusTile, updateStatusTile } = require('./statusTile');

test('it creates a div with a proper class name, a "Prettier" text node and a tooltip', () => {
  atom = {
    config: { get: jest.fn(() => true) },
    tooltips: { add: () => ({ prop: '...' }) },
  };

  const classes = [];
  global.document = {
    createElement: jest.fn(() => ({
      classList: {
        add: jest.fn(arg => classes.push(arg)),
      },
      dataset: {},
      appendChild: jest.fn(),
    })),
    createTextNode: jest.fn(arg => arg),
  };

  const div = createStatusTile();
  expect(div).toBeDefined();
  expect(div.dataset.formatOnSave).toBe('enabled');
  expect(classes.includes('prettier-atom-status-tile')).toBe(true);
  expect(document.createTextNode).toHaveBeenCalledWith('Prettier');

  const disposable = { add: jest.fn() };
  const tooltip = updateStatusTile(disposable, div);
  expect(tooltip.prop).toBe('...');
  expect(disposable.add).toHaveBeenCalled();

  tooltip.dispose = jest.fn();
  updateStatusTile(disposable, div);
  expect(tooltip.dispose).toHaveBeenCalled();
});
