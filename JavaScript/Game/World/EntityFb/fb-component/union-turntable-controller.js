"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionTurntableController =
    exports.unionToUnionTurntableController =
    exports.UnionTurntableController =
      void 0);
const fixed_angle_turntable_js_1 = require("../fb-component/fixed-angle-turntable.js"),
  free_angle_turntable_js_1 = require("../fb-component/free-angle-turntable.js");
var UnionTurntableController;
function unionToUnionTurntableController(e, n) {
  switch (UnionTurntableController[e]) {
    case "NONE":
      return;
    case "FixedAngleTurntable":
      return n(new fixed_angle_turntable_js_1.FixedAngleTurntable());
    case "FreeAngleTurntable":
      return n(new free_angle_turntable_js_1.FreeAngleTurntable());
    default:
      return;
  }
}
function unionListToUnionTurntableController(e, n, r) {
  switch (UnionTurntableController[e]) {
    case "NONE":
      return;
    case "FixedAngleTurntable":
      return n(r, new fixed_angle_turntable_js_1.FixedAngleTurntable());
    case "FreeAngleTurntable":
      return n(r, new free_angle_turntable_js_1.FreeAngleTurntable());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.FixedAngleTurntable = 1)] = "FixedAngleTurntable"),
    (e[(e.FreeAngleTurntable = 2)] = "FreeAngleTurntable");
})(
  (UnionTurntableController =
    exports.UnionTurntableController ||
    (exports.UnionTurntableController = {})),
),
  (exports.unionToUnionTurntableController = unionToUnionTurntableController),
  (exports.unionListToUnionTurntableController =
    unionListToUnionTurntableController);
//# sourceMappingURL=union-turntable-controller.js.map
