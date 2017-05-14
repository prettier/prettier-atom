jest.mock('../atomInterface');

const { addErrorNotification, shouldDisplayErrors } = require('../atomInterface');
const handleError = require('./handleError');

it('displays an error notification is shouldDisplayErrors is true', () => {
  const error = new Error('fake error');
  shouldDisplayErrors.mockImplementation(() => true);

  handleError(error);

  const message = addErrorNotification.mock.calls[0][0];
  const options = addErrorNotification.mock.calls[0][1];

  expect(message).toMatch('prettier-atom');
  expect(options.dismissable).toBe(true);
  expect(options.detail).toEqual(error.toString());
});

it('does not notify if shouldDisplayErrors is false', () => {
  const error = new Error('fake error');
  shouldDisplayErrors.mockImplementation(() => false);

  handleError(error);

  expect(addErrorNotification).not.toHaveBeenCalled();
});
