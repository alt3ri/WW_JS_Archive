"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionBulletCreateConditionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbOnCollisionCondition_1 = require("./FbOnCollisionCondition"),
  FbOnHitCondition_1 = require("./FbOnHitCondition"),
  FbOnMatchingCondition_1 = require("./FbOnMatchingCondition"),
  FbOnOpenGravityCollisionCondition_1 = require("./FbOnOpenGravityCollisionCondition"),
  FbOnThrowTriggerTimeCondition_1 = require("./FbOnThrowTriggerTimeCondition");
class UnionBulletCreateConditionHelper {
  static GetUnionBulletCreateConditionObject(n) {
    switch (n) {
      case fb_component_1.UnionBulletCreateCondition.OnCollisionCondition:
        return new fb_component_1.OnCollisionCondition();
      case fb_component_1.UnionBulletCreateCondition.OnHitCondition:
        return new fb_component_1.OnHitCondition();
      case fb_component_1.UnionBulletCreateCondition.OnMatchingCondition:
        return new fb_component_1.OnMatchingCondition();
      case fb_component_1.UnionBulletCreateCondition
        .OnOpenGravityCollisionCondition:
        return new fb_component_1.OnOpenGravityCollisionCondition();
      case fb_component_1.UnionBulletCreateCondition
        .OnThrowTriggerTimeCondition:
        return new fb_component_1.OnThrowTriggerTimeCondition();
      default:
        return;
    }
  }
  static ReadUnionBulletCreateCondition(n, o) {
    if (void 0 !== o)
      switch (n) {
        case fb_component_1.UnionBulletCreateCondition.OnCollisionCondition:
          return FbOnCollisionCondition_1.FbOnCollisionCondition.Create(o);
        case fb_component_1.UnionBulletCreateCondition.OnHitCondition:
          return FbOnHitCondition_1.FbOnHitCondition.Create(o);
        case fb_component_1.UnionBulletCreateCondition.OnMatchingCondition:
          return FbOnMatchingCondition_1.FbOnMatchingCondition.Create(o);
        case fb_component_1.UnionBulletCreateCondition
          .OnOpenGravityCollisionCondition:
          return FbOnOpenGravityCollisionCondition_1.FbOnOpenGravityCollisionCondition.Create(
            o,
          );
        case fb_component_1.UnionBulletCreateCondition
          .OnThrowTriggerTimeCondition:
          return FbOnThrowTriggerTimeCondition_1.FbOnThrowTriggerTimeCondition.Create(
            o,
          );
        default:
          return;
      }
  }
}
exports.UnionBulletCreateConditionHelper = UnionBulletCreateConditionHelper;
//# sourceMappingURL=UnionBulletCreateConditionHelper.js.map
