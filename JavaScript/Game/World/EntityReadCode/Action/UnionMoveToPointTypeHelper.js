"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionMoveToPointTypeHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbUniformMotion_1 = require("./FbUniformMotion"),
  FbVariableMotion_1 = require("./FbVariableMotion");
class UnionMoveToPointTypeHelper {
  static GetUnionMoveToPointTypeObject(e) {
    switch (e) {
      case fb_action_1.UnionMoveToPointType.UniformMotion:
        return new fb_action_1.UniformMotion();
      case fb_action_1.UnionMoveToPointType.VariableMotion:
        return new fb_action_1.VariableMotion();
      default:
        return;
    }
  }
  static ReadUnionMoveToPointType(e, o) {
    if (void 0 !== o)
      switch (e) {
        case fb_action_1.UnionMoveToPointType.UniformMotion:
          return FbUniformMotion_1.FbUniformMotion.Create(o);
        case fb_action_1.UnionMoveToPointType.VariableMotion:
          return FbVariableMotion_1.FbVariableMotion.Create(o);
        default:
          return;
      }
  }
}
exports.UnionMoveToPointTypeHelper = UnionMoveToPointTypeHelper;
//# sourceMappingURL=UnionMoveToPointTypeHelper.js.map
