// @flow
const { getCurrentFilePath } = require('../editorInterface');

// Holds a reference to an IndieDelegate from the linter package. Used for displaying syntax errors
// See: http://steelbrain.me/linter/types/indie-linter-v2.html
let indieDelegate: ?Linter$IndieDelegate = null;

const set = (newIndieDelegate: ?Linter$IndieDelegate) => {
  indieDelegate = newIndieDelegate;
};

const get = (): ?Linter$IndieDelegate => indieDelegate;

const setMessages = (editor: TextEditor, messages: Array<Linter$Message>) => {
  const filePath = getCurrentFilePath(editor);

  if (!indieDelegate || !filePath) {
    // eslint-disable-next-line
    console.error(
      `prettier-atom attempted to set messages with linter package, but was unable. Messages: ${JSON.stringify(
        messages,
      )}`,
    );
    return;
  }

  indieDelegate.setMessages(filePath, messages);
};

const clearLinterErrors = (editor: TextEditor): void => setMessages(editor, []);

module.exports = {
  set,
  get,
  clearLinterErrors,
  setMessages,
};
