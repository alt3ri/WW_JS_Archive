"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionConveyorBeltMoveTypeHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbFixSpeed_1 = require("./FbFixSpeed");
class UnionConveyorBeltMoveTypeHelper {
  static GetUnionConveyorBeltMoveTypeObject(e) {
    if (e === fb_component_1.UnionConveyorBeltMoveType.FixSpeed)
      return new fb_component_1.FixSpeed();
  }
  static ReadUnionConveyorBeltMoveType(e, o) {
    return void 0 !== o &&
      e === fb_component_1.UnionConveyorBeltMoveType.FixSpeed
      ? FbFixSpeed_1.FbFixSpeed.Create(o)
      : void 0;
  }
}
exports.UnionConveyorBeltMoveTypeHelper = UnionConveyorBeltMoveTypeHelper;
//# sourceMappingURL=UnionConveyorBeltMoveTypeHelper.js.map
