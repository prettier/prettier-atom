// @flow
const _ = require('lodash/fp');
const editorconfig = require('editorconfig');

type RawOpts = {
  indent_style?: 'tab' | 'space',
  indent_size?: 'tab' | number,
  tab_width?: number,
  max_line_length?: number | 'off',
};

type TranslatedOpts = {
  tabWidth?: number,
  printWidth?: number,
  useTabs?: boolean,
};

const maxLineLengthIsNumber: (opts: RawOpts) => boolean = _.flow(_.get('max_line_length'), _.isNumber);

const indentStyleIsTab: (opts: RawOpts) => boolean = _.conforms({ indent_style: _.isEqual('tab') });

const indentSizeIsTab: (opts: RawOpts) => boolean = _.conforms({ indent_size: _.isEqual('tab') });

const tabWidthIsNumber: (opts: RawOpts) => boolean = _.conforms({ tab_width: _.isNumber });

const shouldUseTabWidth: (opts: RawOpts) => boolean = _.overEvery([
  tabWidthIsNumber,
  _.overSome([indentSizeIsTab, indentStyleIsTab]),
]);

const indentSizeIsNumber: (opts: RawOpts) => boolean = _.conforms({ indent_size: _.isNumber });

const indentStyleIsSpace: (opts: RawOpts) => boolean = _.conforms({ indent_style: _.isEqual('space') });

const getPrintWidth: (opts: RawOpts) => ?{ printWidth: number } = _.cond([
  [maxLineLengthIsNumber, opts => ({ printWidth: opts.max_line_length })],
]);

const getTabWidth: (opts: RawOpts) => ?{ tabWidth: number } = _.cond([
  [shouldUseTabWidth, opts => ({ tabWidth: opts.tab_width })],
  [indentSizeIsNumber, opts => ({ tabWidth: opts.indent_size })],
]);

const getUseTabs: (opts: RawOpts) => ?{ useTabs: boolean } = _.cond([
  [indentStyleIsTab, _.constant({ useTabs: true })],
  [indentStyleIsSpace, _.constant({ useTabs: false })],
]);

const mapEditorConfigOptions = (opts?: RawOpts = {}) => ({
  ...getPrintWidth(opts),
  ...getTabWidth(opts),
  ...getUseTabs(opts),
});

const buildEditorConfigOptions: (file: FilePath) => TranslatedOpts = _.flow(
  editorconfig.parseSync,
  mapEditorConfigOptions,
);

module.exports = buildEditorConfigOptions;
