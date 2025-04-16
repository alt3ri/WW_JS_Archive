"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionExploreState =
    exports.unionToUnionExploreState =
    exports.UnionExploreState =
      void 0);
const tele_control_config_js_1 = require("../fb-action/tele-control-config.js");
var UnionExploreState;
function unionToUnionExploreState(o, e) {
  switch (UnionExploreState[o]) {
    case "NONE":
      return;
    case "TeleControlConfig":
      return e(new tele_control_config_js_1.TeleControlConfig());
    default:
      return;
  }
}
function unionListToUnionExploreState(o, e, t) {
  switch (UnionExploreState[o]) {
    case "NONE":
      return;
    case "TeleControlConfig":
      return e(t, new tele_control_config_js_1.TeleControlConfig());
    default:
      return;
  }
}
!(function (o) {
  (o[(o.NONE = 0)] = "NONE"),
    (o[(o.TeleControlConfig = 1)] = "TeleControlConfig");
})(
  (UnionExploreState =
    exports.UnionExploreState || (exports.UnionExploreState = {})),
),
  (exports.unionToUnionExploreState = unionToUnionExploreState),
  (exports.unionListToUnionExploreState = unionListToUnionExploreState);
//# sourceMappingURL=union-explore-state.js.map
