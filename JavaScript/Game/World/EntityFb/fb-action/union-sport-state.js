"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSportState =
    exports.unionToUnionSportState =
    exports.UnionSportState =
      void 0);
const ski_config_js_1 = require("../fb-action/ski-config.js"),
  slide_config_js_1 = require("../fb-action/slide-config.js");
var UnionSportState;
function unionToUnionSportState(n, t) {
  switch (UnionSportState[n]) {
    case "NONE":
      return;
    case "SkiConfig":
      return t(new ski_config_js_1.SkiConfig());
    case "SlideConfig":
      return t(new slide_config_js_1.SlideConfig());
    default:
      return;
  }
}
function unionListToUnionSportState(n, t, o) {
  switch (UnionSportState[n]) {
    case "NONE":
      return;
    case "SkiConfig":
      return t(o, new ski_config_js_1.SkiConfig());
    case "SlideConfig":
      return t(o, new slide_config_js_1.SlideConfig());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.SkiConfig = 1)] = "SkiConfig"),
    (n[(n.SlideConfig = 2)] = "SlideConfig");
})(
  (UnionSportState = exports.UnionSportState || (exports.UnionSportState = {})),
),
  (exports.unionToUnionSportState = unionToUnionSportState),
  (exports.unionListToUnionSportState = unionListToUnionSportState);
//# sourceMappingURL=union-sport-state.js.map
