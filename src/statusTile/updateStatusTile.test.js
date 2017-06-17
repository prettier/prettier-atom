jest.mock('./tooltip');
jest.mock('./getFormatOnSaveStatus');

const { setTooltip, disposeTooltip } = require('./tooltip');
const updateStatusTile = require('./updateStatusTile');
const getFormatOnSaveStatus = require('./getFormatOnSaveStatus');

const callUpdateStatusTile = () => {
  const div = { dataset: {} };
  const disposable = { add: jest.fn() };

  updateStatusTile(disposable, div);

  return { div, disposable };
};

beforeEach(() => {
  atom = { tooltips: { add: jest.fn(x => x) } };
});

it('disposes existing tooltip', () => {
  disposeTooltip.mockImplementation(require.requireActual('./tooltip').disposeTooltip);

  callUpdateStatusTile();

  expect(disposeTooltip).toHaveBeenCalled();
});

it('adds the new tooltip with the updated formatOnSave status to atom', () => {
  getFormatOnSaveStatus.mockImplementation(() => 'enabled');

  const { div } = callUpdateStatusTile();

  expect(atom.tooltips.add).toHaveBeenCalledWith(div, {
    title: 'Format on Save: enabled<br>Click to toggle',
  });
  expect(div.dataset.prettierFormatOnSave).toEqual('enabled');
});

it('updates our reference to the new tooltip so that we may dispose it manually', () => {
  setTooltip.mockImplementation(require.requireActual('./tooltip').setTooltip);

  const { div } = callUpdateStatusTile();

  expect(setTooltip).toHaveBeenCalledWith(div);
});

it("registers the new tooltip with given disposable so it's disposed when package is deactivated", () => {
  const { disposable, div } = callUpdateStatusTile();

  expect(disposable.add).toHaveBeenCalledWith(div);
});
