// @flow
let tooltip: ?Atom$Disposable = null;

const disposeTooltip = () => tooltip && tooltip.dispose;

const setTooltip = (nextTooltip: Atom$Disposable) => {
  tooltip = nextTooltip;
};

module.exports = {
  disposeTooltip,
  setTooltip,
};
