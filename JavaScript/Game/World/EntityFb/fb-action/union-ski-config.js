"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSkiConfig =
    exports.unionToUnionSkiConfig =
    exports.UnionSkiConfig =
      void 0);
const accelerate_ski_config_js_1 = require("../fb-action/accelerate-ski-config.js"),
  close_ski_config_js_1 = require("../fb-action/close-ski-config.js"),
  open_ski_config_js_1 = require("../fb-action/open-ski-config.js");
var UnionSkiConfig;
function unionToUnionSkiConfig(n, i) {
  switch (UnionSkiConfig[n]) {
    case "NONE":
      return;
    case "AccelerateSkiConfig":
      return i(new accelerate_ski_config_js_1.AccelerateSkiConfig());
    case "CloseSkiConfig":
      return i(new close_ski_config_js_1.CloseSkiConfig());
    case "OpenSkiConfig":
      return i(new open_ski_config_js_1.OpenSkiConfig());
    default:
      return;
  }
}
function unionListToUnionSkiConfig(n, i, e) {
  switch (UnionSkiConfig[n]) {
    case "NONE":
      return;
    case "AccelerateSkiConfig":
      return i(e, new accelerate_ski_config_js_1.AccelerateSkiConfig());
    case "CloseSkiConfig":
      return i(e, new close_ski_config_js_1.CloseSkiConfig());
    case "OpenSkiConfig":
      return i(e, new open_ski_config_js_1.OpenSkiConfig());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.AccelerateSkiConfig = 1)] = "AccelerateSkiConfig"),
    (n[(n.CloseSkiConfig = 2)] = "CloseSkiConfig"),
    (n[(n.OpenSkiConfig = 3)] = "OpenSkiConfig");
})((UnionSkiConfig = exports.UnionSkiConfig || (exports.UnionSkiConfig = {}))),
  (exports.unionToUnionSkiConfig = unionToUnionSkiConfig),
  (exports.unionListToUnionSkiConfig = unionListToUnionSkiConfig);
//# sourceMappingURL=union-ski-config.js.map
