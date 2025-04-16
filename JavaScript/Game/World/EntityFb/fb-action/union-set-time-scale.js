"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionSetTimeScale =
    exports.unionToUnionSetTimeScale =
    exports.UnionSetTimeScale =
      void 0);
const set_global_time_scale_js_1 = require("../fb-action/set-global-time-scale.js");
var UnionSetTimeScale;
function unionToUnionSetTimeScale(e, t) {
  switch (UnionSetTimeScale[e]) {
    case "NONE":
      return;
    case "SetGlobalTimeScale":
      return t(new set_global_time_scale_js_1.SetGlobalTimeScale());
    default:
      return;
  }
}
function unionListToUnionSetTimeScale(e, t, n) {
  switch (UnionSetTimeScale[e]) {
    case "NONE":
      return;
    case "SetGlobalTimeScale":
      return t(n, new set_global_time_scale_js_1.SetGlobalTimeScale());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.SetGlobalTimeScale = 1)] = "SetGlobalTimeScale");
})(
  (UnionSetTimeScale =
    exports.UnionSetTimeScale || (exports.UnionSetTimeScale = {})),
),
  (exports.unionToUnionSetTimeScale = unionToUnionSetTimeScale),
  (exports.unionListToUnionSetTimeScale = unionListToUnionSetTimeScale);
//# sourceMappingURL=union-set-time-scale.js.map
