jest.mock('./getFormatOnSaveStatus');
jest.mock('../atomInterface');

const getFormatOnSaveStatus = require('./getFormatOnSaveStatus');
const { toggleFormatOnSave } = require('../atomInterface');
const createStatusTile = require('./createStatusTile');

beforeEach(() => {
  getFormatOnSaveStatus.mockImplementation(() => 'enabled');
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
});

it('creates a div with "Prettier" and a tooltip indicating formatOnSave status', () => {
  const div = createStatusTile();

  expect(div.dataset.formatOnSave).toBe('enabled');
  expect(div.classList.add).toHaveBeenCalledWith('prettier-atom-status-tile');
  expect(div.appendChild).toHaveBeenCalledWith('Prettier');
  expect(div.addEventListener).toHaveBeenCalledWith('click', toggleFormatOnSave);
});
