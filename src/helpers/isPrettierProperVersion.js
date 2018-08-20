// @flow
const _ = require('lodash/fp');
const { addErrorNotification } = require('../atomInterface');
const getPrettierInstance = require('./getPrettierInstance');

const MINIMUM_PRETTIER_VERSION_FOR_ATOM_PRETTIER_ATOM_TO_WORK = '1.13.4';

const displayImproperPrettierVersionError = _.once(() =>
  addErrorNotification(
    `Your Prettier version is not compatible with prettier-atom. Prettier must be >= ${MINIMUM_PRETTIER_VERSION_FOR_ATOM_PRETTIER_ATOM_TO_WORK}`,
    {
      dismissable: true,
      detail:
        'Please run `npm install prettier` (or `yarn add prettier`) in your local repo or ' +
        '`npm install --global prettier` (`yarn global add prettier`) to' +
        ' update to a compatible version of Prettier. Note that you will need to reload Atom for ' +
        'the change to be picked up.',
    },
  ),
);

// NOTE: We are using the presence of getFileInfo.sync to determine whether prettier is new enough.
//       This may change over time so feel free to update this to use something else when necessary.
const isGetFileInfoDefined = prettier => !!_.get('getFileInfo.sync', prettier);

const isPrettierProperVersion: (editor: TextEditor) => boolean = _.flow(
  getPrettierInstance,
  isGetFileInfoDefined,
  _.tap(_.cond([[_.negate(_.identity), displayImproperPrettierVersionError]])),
);

module.exports = isPrettierProperVersion;
