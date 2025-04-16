"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionMoveToPointType =
    exports.unionToUnionMoveToPointType =
    exports.UnionMoveToPointType =
      void 0);
const uniform_motion_js_1 = require("../fb-action/uniform-motion.js"),
  variable_motion_js_1 = require("../fb-action/variable-motion.js");
var UnionMoveToPointType;
function unionToUnionMoveToPointType(o, n) {
  switch (UnionMoveToPointType[o]) {
    case "NONE":
      return;
    case "UniformMotion":
      return n(new uniform_motion_js_1.UniformMotion());
    case "VariableMotion":
      return n(new variable_motion_js_1.VariableMotion());
    default:
      return;
  }
}
function unionListToUnionMoveToPointType(o, n, i) {
  switch (UnionMoveToPointType[o]) {
    case "NONE":
      return;
    case "UniformMotion":
      return n(i, new uniform_motion_js_1.UniformMotion());
    case "VariableMotion":
      return n(i, new variable_motion_js_1.VariableMotion());
    default:
      return;
  }
}
!(function (o) {
  (o[(o.NONE = 0)] = "NONE"),
    (o[(o.UniformMotion = 1)] = "UniformMotion"),
    (o[(o.VariableMotion = 2)] = "VariableMotion");
})(
  (UnionMoveToPointType =
    exports.UnionMoveToPointType || (exports.UnionMoveToPointType = {})),
),
  (exports.unionToUnionMoveToPointType = unionToUnionMoveToPointType),
  (exports.unionListToUnionMoveToPointType = unionListToUnionMoveToPointType);
//# sourceMappingURL=union-move-to-point-type.js.map
