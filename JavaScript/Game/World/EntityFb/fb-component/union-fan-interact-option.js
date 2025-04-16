"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionFanInteractOption =
    exports.unionToUnionFanInteractOption =
    exports.UnionFanInteractOption =
      void 0);
const fan_interact_by_fkey_js_1 = require("../fb-component/fan-interact-by-fkey.js"),
  fan_interact_by_hit_js_1 = require("../fb-component/fan-interact-by-hit.js");
var UnionFanInteractOption;
function unionToUnionFanInteractOption(n, t) {
  switch (UnionFanInteractOption[n]) {
    case "NONE":
      return;
    case "FanInteractByFKey":
      return t(new fan_interact_by_fkey_js_1.FanInteractByFKey());
    case "FanInteractByHit":
      return t(new fan_interact_by_hit_js_1.FanInteractByHit());
    default:
      return;
  }
}
function unionListToUnionFanInteractOption(n, t, e) {
  switch (UnionFanInteractOption[n]) {
    case "NONE":
      return;
    case "FanInteractByFKey":
      return t(e, new fan_interact_by_fkey_js_1.FanInteractByFKey());
    case "FanInteractByHit":
      return t(e, new fan_interact_by_hit_js_1.FanInteractByHit());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.FanInteractByFKey = 1)] = "FanInteractByFKey"),
    (n[(n.FanInteractByHit = 2)] = "FanInteractByHit");
})(
  (UnionFanInteractOption =
    exports.UnionFanInteractOption || (exports.UnionFanInteractOption = {})),
),
  (exports.unionToUnionFanInteractOption = unionToUnionFanInteractOption),
  (exports.unionListToUnionFanInteractOption =
    unionListToUnionFanInteractOption);
//# sourceMappingURL=union-fan-interact-option.js.map
