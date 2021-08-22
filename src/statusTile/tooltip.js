// @flow
let tooltip: ?Atom$Disposable = null;

const disposeTooltip = (): ?any => tooltip && tooltip.dispose;

const setTooltip = (nextTooltip: Atom$Disposable) => {
  tooltip = nextTooltip;
};

module.exports = {
  disposeTooltip,
  setTooltip,
};
