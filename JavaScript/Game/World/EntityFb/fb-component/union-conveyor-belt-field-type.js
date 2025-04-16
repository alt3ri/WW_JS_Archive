"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionConveyorBeltFieldType =
    exports.unionToUnionConveyorBeltFieldType =
    exports.UnionConveyorBeltFieldType =
      void 0);
const directional_field_js_1 = require("../fb-component/directional-field.js"),
  point_field_js_1 = require("../fb-component/point-field.js");
var UnionConveyorBeltFieldType;
function unionToUnionConveyorBeltFieldType(e, n) {
  switch (UnionConveyorBeltFieldType[e]) {
    case "NONE":
      return;
    case "DirectionalField":
      return n(new directional_field_js_1.DirectionalField());
    case "PointField":
      return n(new point_field_js_1.PointField());
    default:
      return;
  }
}
function unionListToUnionConveyorBeltFieldType(e, n, i) {
  switch (UnionConveyorBeltFieldType[e]) {
    case "NONE":
      return;
    case "DirectionalField":
      return n(i, new directional_field_js_1.DirectionalField());
    case "PointField":
      return n(i, new point_field_js_1.PointField());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.DirectionalField = 1)] = "DirectionalField"),
    (e[(e.PointField = 2)] = "PointField");
})(
  (UnionConveyorBeltFieldType =
    exports.UnionConveyorBeltFieldType ||
    (exports.UnionConveyorBeltFieldType = {})),
),
  (exports.unionToUnionConveyorBeltFieldType =
    unionToUnionConveyorBeltFieldType),
  (exports.unionListToUnionConveyorBeltFieldType =
    unionListToUnionConveyorBeltFieldType);
//# sourceMappingURL=union-conveyor-belt-field-type.js.map
