"use strict";

let tooltip = null;

const disposeTooltip = () => tooltip && tooltip.dispose;

const setTooltip = nextTooltip => {
  tooltip = nextTooltip;
};

module.exports = {
  disposeTooltip,
  setTooltip
};