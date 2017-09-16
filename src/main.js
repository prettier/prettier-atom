const config = require('./config-schema.json');
// eslint-disable-next-line import/no-extraneous-dependencies, import/no-unresolved
const { CompositeDisposable } = require('atom');
const { createStatusTile, updateStatusTile, updateStatusTileScope, disposeTooltip } = require('./statusTile');
const linterInterface = require('./linterInterface');

// local helpers
let format = null;
let formatOnSave = null;
let warnAboutLinterEslintFixOnSave = null;
let displayDebugInfo = null;
let toggleFormatOnSave = null;
let subscriptions = null;
let statusBarHandler = null;
let statusBarTile = null;
let tileElement = null;

// HACK: lazy load most of the code we need for performance
const lazyFormat = () => {
  if (!format) format = require('./manualFormat'); // eslint-disable-line global-require

  const editor = atom.workspace.getActiveTextEditor();
  if (editor) format(editor);
};

// HACK: lazy load most of the code we need for performance
const lazyFormatOnSave = editor => {
  if (!formatOnSave) formatOnSave = require('./formatOnSave'); // eslint-disable-line global-require
  if (editor) formatOnSave(editor);
};

// HACK: lazy load most of the code we need for performance
const lazyWarnAboutLinterEslintFixOnSave = () => {
  if (!warnAboutLinterEslintFixOnSave) {
    // eslint-disable-next-line global-require
    warnAboutLinterEslintFixOnSave = require('./warnAboutLinterEslintFixOnSave');
  }
  warnAboutLinterEslintFixOnSave();
};

// HACK: lazy load most of the code we need for performance
const lazyDisplayDebugInfo = () => {
  if (!displayDebugInfo) {
    // eslint-disable-next-line global-require
    displayDebugInfo = require('./displayDebugInfo');
  }
  displayDebugInfo();
};

const lazyToggleFormatOnSave = () => {
  if (!toggleFormatOnSave) {
    // eslint-disable-next-line global-require prefer-destructuring
    toggleFormatOnSave = require('./atomInterface').toggleFormatOnSave;
  }
  toggleFormatOnSave();
};

const attachStatusTile = () => {
  if (statusBarHandler) {
    tileElement = createStatusTile();
    statusBarTile = statusBarHandler.addLeftTile({
      item: tileElement,
      priority: 1000,
    });
    updateStatusTile(subscriptions, tileElement);

    subscriptions.add(
      atom.config.observe('prettier-atom.formatOnSaveOptions.enabled', () =>
        updateStatusTile(subscriptions, tileElement),
      ),
    );
    subscriptions.add(
      // onDidChangeActiveTextEditor is only available in Atom 1.18.0+.
      atom.workspace.onDidChangeActiveTextEditor
        ? atom.workspace.onDidChangeActiveTextEditor(editor => updateStatusTileScope(tileElement, editor))
        : atom.workspace.onDidChangeActivePaneItem(() =>
            updateStatusTileScope(tileElement, atom.workspace.getActiveTextEditor()),
          ),
    );
  }
};

const detachStatusTile = () => {
  disposeTooltip();
  if (statusBarTile) {
    statusBarTile.destroy();
  }
};

const loadPackageDeps = () =>
  // eslint-disable-next-line global-require
  require('atom-package-deps')
    .install('prettier-atom')
    // eslint-disable-next-line no-console
    .then(() => console.log('All dependencies installed, good to go'));

// public API
const activate = () => {
  loadPackageDeps();

  subscriptions = new CompositeDisposable();

  subscriptions.add(atom.commands.add('atom-workspace', 'prettier:format', lazyFormat));
  subscriptions.add(atom.commands.add('atom-workspace', 'prettier:debug', lazyDisplayDebugInfo));
  subscriptions.add(
    atom.commands.add('atom-workspace', 'prettier:toggle-format-on-save', lazyToggleFormatOnSave),
  );

  subscriptions.add(
    atom.workspace.observeTextEditors(editor =>
      subscriptions.add(editor.getBuffer().onWillSave(() => lazyFormatOnSave(editor))),
    ),
  );
  subscriptions.add(
    atom.config.observe('linter-eslint.fixOnSave', () => lazyWarnAboutLinterEslintFixOnSave()),
  );
  subscriptions.add(
    atom.config.observe('prettier-atom.useEslint', () => lazyWarnAboutLinterEslintFixOnSave()),
  );
  subscriptions.add(
    atom.config.observe(
      'prettier-atom.formatOnSaveOptions.showInStatusBar',
      show => (show ? attachStatusTile() : detachStatusTile()),
    ),
  );

  // HACK: an Atom bug seems to be causing old configuration settings to linger for some users
  //       https://github.com/prettier/prettier-atom/issues/72
  atom.config.unset('prettier-atom.singleQuote');
  atom.config.unset('prettier-atom.trailingComma');
};

const deactivate = () => {
  subscriptions.dispose();
  detachStatusTile();
};

const consumeStatusBar = statusBar => {
  statusBarHandler = statusBar;

  const showInStatusBar = atom.config.get('prettier-atom.formatOnSaveOptions.showInStatusBar');
  if (showInStatusBar) {
    attachStatusTile();
  }
};

const consumeIndie = registerIndie => {
  const linter = registerIndie({ name: 'Prettier' });
  subscriptions.add(linter);
  linterInterface.set(linter);

  // Setting and clearing messages per filePath
  subscriptions.add(
    atom.workspace.observeTextEditors(textEditor => {
      const editorPath = textEditor.getPath();
      if (!editorPath) {
        return;
      }

      const subscription = textEditor.onDidDestroy(() => {
        subscriptions.remove(subscription);
        linter.setMessages(editorPath, []);
        linterInterface.set(null);
      });
      subscriptions.add(subscription);
    }),
  );
};

module.exports = {
  activate,
  deactivate,
  config,
  subscriptions,
  consumeStatusBar,
  consumeIndie,
};
