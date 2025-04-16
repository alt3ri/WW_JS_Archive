"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionCombinationTriggerShape =
    exports.unionToUnionCombinationTriggerShape =
    exports.UnionCombinationTriggerShape =
      void 0);
const box_trigger_shape_js_1 = require("../fb-shape/box-trigger-shape.js"),
  sphere_trigger_shape_js_1 = require("../fb-shape/sphere-trigger-shape.js");
var UnionCombinationTriggerShape;
function unionToUnionCombinationTriggerShape(e, r) {
  switch (UnionCombinationTriggerShape[e]) {
    case "NONE":
      return;
    case "BoxTriggerShape":
      return r(new box_trigger_shape_js_1.BoxTriggerShape());
    case "SphereTriggerShape":
      return r(new sphere_trigger_shape_js_1.SphereTriggerShape());
    default:
      return;
  }
}
function unionListToUnionCombinationTriggerShape(e, r, i) {
  switch (UnionCombinationTriggerShape[e]) {
    case "NONE":
      return;
    case "BoxTriggerShape":
      return r(i, new box_trigger_shape_js_1.BoxTriggerShape());
    case "SphereTriggerShape":
      return r(i, new sphere_trigger_shape_js_1.SphereTriggerShape());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.BoxTriggerShape = 1)] = "BoxTriggerShape"),
    (e[(e.SphereTriggerShape = 2)] = "SphereTriggerShape");
})(
  (UnionCombinationTriggerShape =
    exports.UnionCombinationTriggerShape ||
    (exports.UnionCombinationTriggerShape = {})),
),
  (exports.unionToUnionCombinationTriggerShape =
    unionToUnionCombinationTriggerShape),
  (exports.unionListToUnionCombinationTriggerShape =
    unionListToUnionCombinationTriggerShape);
//# sourceMappingURL=union-combination-trigger-shape.js.map
