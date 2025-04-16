"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionControlTrackingType =
    exports.unionToUnionControlTrackingType =
    exports.UnionControlTrackingType =
      void 0);
const control_tracking_other_js_1 = require("../fb-action/control-tracking-other.js"),
  control_tracking_self_js_1 = require("../fb-action/control-tracking-self.js");
var UnionControlTrackingType;
function unionToUnionControlTrackingType(n, r) {
  switch (UnionControlTrackingType[n]) {
    case "NONE":
      return;
    case "ControlTrackingOther":
      return r(new control_tracking_other_js_1.ControlTrackingOther());
    case "ControlTrackingSelf":
      return r(new control_tracking_self_js_1.ControlTrackingSelf());
    default:
      return;
  }
}
function unionListToUnionControlTrackingType(n, r, o) {
  switch (UnionControlTrackingType[n]) {
    case "NONE":
      return;
    case "ControlTrackingOther":
      return r(o, new control_tracking_other_js_1.ControlTrackingOther());
    case "ControlTrackingSelf":
      return r(o, new control_tracking_self_js_1.ControlTrackingSelf());
    default:
      return;
  }
}
!(function (n) {
  (n[(n.NONE = 0)] = "NONE"),
    (n[(n.ControlTrackingOther = 1)] = "ControlTrackingOther"),
    (n[(n.ControlTrackingSelf = 2)] = "ControlTrackingSelf");
})(
  (UnionControlTrackingType =
    exports.UnionControlTrackingType ||
    (exports.UnionControlTrackingType = {})),
),
  (exports.unionToUnionControlTrackingType = unionToUnionControlTrackingType),
  (exports.unionListToUnionControlTrackingType =
    unionListToUnionControlTrackingType);
//# sourceMappingURL=union-control-tracking-type.js.map
