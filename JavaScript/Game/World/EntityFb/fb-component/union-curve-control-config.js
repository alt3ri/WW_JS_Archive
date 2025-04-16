"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionCurveControlConfig =
    exports.unionToUnionCurveControlConfig =
    exports.UnionCurveControlConfig =
      void 0);
const charge_slash_control_js_1 = require("../fb-component/charge-slash-control.js");
var UnionCurveControlConfig;
function unionToUnionCurveControlConfig(o, n) {
  switch (UnionCurveControlConfig[o]) {
    case "NONE":
      return;
    case "ChargeSlashControl":
      return n(new charge_slash_control_js_1.ChargeSlashControl());
    default:
      return;
  }
}
function unionListToUnionCurveControlConfig(o, n, r) {
  switch (UnionCurveControlConfig[o]) {
    case "NONE":
      return;
    case "ChargeSlashControl":
      return n(r, new charge_slash_control_js_1.ChargeSlashControl());
    default:
      return;
  }
}
!(function (o) {
  (o[(o.NONE = 0)] = "NONE"),
    (o[(o.ChargeSlashControl = 1)] = "ChargeSlashControl");
})(
  (UnionCurveControlConfig =
    exports.UnionCurveControlConfig || (exports.UnionCurveControlConfig = {})),
),
  (exports.unionToUnionCurveControlConfig = unionToUnionCurveControlConfig),
  (exports.unionListToUnionCurveControlConfig =
    unionListToUnionCurveControlConfig);
//# sourceMappingURL=union-curve-control-config.js.map
