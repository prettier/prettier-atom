const EMBEDDED_SCOPES = [ 'text.html.vue', 'text.html.basic' ];

const getCurrentScope = editor => editor.getGrammar().scopeName;

const getConfigOption = key => atom.config.get(`prettier-atom.${key}`);

const isInScope = editor => getConfigOption('formatOnSaveScopes').includes(getCurrentScope(editor));

const isCurrentScopeEmbeddedScope = editor => EMBEDDED_SCOPES.includes(getCurrentScope(editor));

module.exports = {
  getConfigOption,
  isInScope,
  isCurrentScopeEmbeddedScope,
};
