"use strict";

var tooltip = null;

var disposeTooltip = function disposeTooltip() {
  return tooltip && tooltip.dispose;
};

var setTooltip = function setTooltip(nextTooltip) {
  tooltip = nextTooltip;
};

module.exports = {
  disposeTooltip: disposeTooltip,
  setTooltip: setTooltip
};