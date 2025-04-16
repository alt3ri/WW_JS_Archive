"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionConveyorBeltMoveType =
    exports.unionToUnionConveyorBeltMoveType =
    exports.UnionConveyorBeltMoveType =
      void 0);
const fix_speed_js_1 = require("../fb-component/fix-speed.js");
var UnionConveyorBeltMoveType;
function unionToUnionConveyorBeltMoveType(e, o) {
  switch (UnionConveyorBeltMoveType[e]) {
    case "NONE":
      return;
    case "FixSpeed":
      return o(new fix_speed_js_1.FixSpeed());
    default:
      return;
  }
}
function unionListToUnionConveyorBeltMoveType(e, o, n) {
  switch (UnionConveyorBeltMoveType[e]) {
    case "NONE":
      return;
    case "FixSpeed":
      return o(n, new fix_speed_js_1.FixSpeed());
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"), (e[(e.FixSpeed = 1)] = "FixSpeed");
})(
  (UnionConveyorBeltMoveType =
    exports.UnionConveyorBeltMoveType ||
    (exports.UnionConveyorBeltMoveType = {})),
),
  (exports.unionToUnionConveyorBeltMoveType = unionToUnionConveyorBeltMoveType),
  (exports.unionListToUnionConveyorBeltMoveType =
    unionListToUnionConveyorBeltMoveType);
//# sourceMappingURL=union-conveyor-belt-move-type.js.map
