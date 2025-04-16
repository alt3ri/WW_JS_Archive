"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionPortalViewDistanceConfig =
    exports.unionToUnionPortalViewDistanceConfig =
    exports.UnionPortalViewDistanceConfig =
      void 0);
const custom_view_distance_js_1 = require("../fb-component/custom-view-distance.js"),
  high_view_distance_js_1 = require("../fb-component/high-view-distance.js"),
  low_view_distance_js_1 = require("../fb-component/low-view-distance.js"),
  mid_view_distance_js_1 = require("../fb-component/mid-view-distance.js");
var UnionPortalViewDistanceConfig;
function unionToUnionPortalViewDistanceConfig(e, i) {
  switch (UnionPortalViewDistanceConfig[e]) {
    case "NONE":
      return;
    case "CustomViewDistance":
      return i(new custom_view_distance_js_1.CustomViewDistance());
    case "HighViewDistance":
      return i(new high_view_distance_js_1.HighViewDistance());
    case "LowViewDistance":
      return i(new low_view_distance_js_1.LowViewDistance());
    case "MidViewDistance":
      return i(new mid_view_distance_js_1.MidViewDistance());
    default:
      return;
  }
}
function unionListToUnionPortalViewDistanceConfig(e, i, n) {
  switch (UnionPortalViewDistanceConfig[e]) {
    case "NONE":
      return;
    case "CustomViewDistance":
      return i(n, new custom_view_distance_js_1.CustomViewDistance());
    case "HighViewDistance":
      return i(n, new high_view_distance_js_1.HighViewDistance());
    case "LowViewDistance":
      return i(n, new low_view_distance_js_1.LowViewDistance());
    case "MidViewDistance":
      return i(n, new mid_view_distance_js_1.MidViewDistance());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.CustomViewDistance = 1)] = "CustomViewDistance"),
    (e[(e.HighViewDistance = 2)] = "HighViewDistance"),
    (e[(e.LowViewDistance = 3)] = "LowViewDistance"),
    (e[(e.MidViewDistance = 4)] = "MidViewDistance");
})(
  (UnionPortalViewDistanceConfig =
    exports.UnionPortalViewDistanceConfig ||
    (exports.UnionPortalViewDistanceConfig = {})),
),
  (exports.unionToUnionPortalViewDistanceConfig =
    unionToUnionPortalViewDistanceConfig),
  (exports.unionListToUnionPortalViewDistanceConfig =
    unionListToUnionPortalViewDistanceConfig);
//# sourceMappingURL=union-portal-view-distance-config.js.map
