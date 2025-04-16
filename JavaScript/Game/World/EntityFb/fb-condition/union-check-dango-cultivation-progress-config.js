"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionCheckDangoCultivationProgressConfig =
    exports.unionToUnionCheckDangoCultivationProgressConfig =
    exports.UnionCheckDangoCultivationProgressConfig =
      void 0);
const count_dango_over_target_level_js_1 = require("../fb-condition/count-dango-over-target-level.js");
var UnionCheckDangoCultivationProgressConfig;
function unionToUnionCheckDangoCultivationProgressConfig(o, n) {
  switch (UnionCheckDangoCultivationProgressConfig[o]) {
    case "NONE":
      return;
    case "CountDangoOverTargetLevel":
      return n(
        new count_dango_over_target_level_js_1.CountDangoOverTargetLevel(),
      );
    default:
      return;
  }
}
function unionListToUnionCheckDangoCultivationProgressConfig(o, n, e) {
  switch (UnionCheckDangoCultivationProgressConfig[o]) {
    case "NONE":
      return;
    case "CountDangoOverTargetLevel":
      return n(
        e,
        new count_dango_over_target_level_js_1.CountDangoOverTargetLevel(),
      );
    default:
      return;
  }
}
!(function (o) {
  (o[(o.NONE = 0)] = "NONE"),
    (o[(o.CountDangoOverTargetLevel = 1)] = "CountDangoOverTargetLevel");
})(
  (UnionCheckDangoCultivationProgressConfig =
    exports.UnionCheckDangoCultivationProgressConfig ||
    (exports.UnionCheckDangoCultivationProgressConfig = {})),
),
  (exports.unionToUnionCheckDangoCultivationProgressConfig =
    unionToUnionCheckDangoCultivationProgressConfig),
  (exports.unionListToUnionCheckDangoCultivationProgressConfig =
    unionListToUnionCheckDangoCultivationProgressConfig);
//# sourceMappingURL=union-check-dango-cultivation-progress-config.js.map
