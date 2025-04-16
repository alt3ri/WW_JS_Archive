"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTargetGearGroupFailureConditionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbFailureConditionArbitraryState_1 = require("./FbFailureConditionArbitraryState"),
  FbFailureConditionHitTargetEntity_1 = require("./FbFailureConditionHitTargetEntity"),
  FbFailureConditionSequentialState_1 = require("./FbFailureConditionSequentialState");
class UnionTargetGearGroupFailureConditionHelper {
  static GetUnionTargetGearGroupFailureConditionObject(e) {
    switch (e) {
      case fb_component_1.UnionTargetGearGroupFailureCondition
        .FailureConditionArbitraryState:
        return new fb_component_1.FailureConditionArbitraryState();
      case fb_component_1.UnionTargetGearGroupFailureCondition
        .FailureConditionHitTargetEntity:
        return new fb_component_1.FailureConditionHitTargetEntity();
      case fb_component_1.UnionTargetGearGroupFailureCondition
        .FailureConditionSequentialState:
        return new fb_component_1.FailureConditionSequentialState();
      default:
        return;
    }
  }
  static ReadUnionTargetGearGroupFailureCondition(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_component_1.UnionTargetGearGroupFailureCondition
          .FailureConditionArbitraryState:
          return FbFailureConditionArbitraryState_1.FbFailureConditionArbitraryState.Create(
            t,
          );
        case fb_component_1.UnionTargetGearGroupFailureCondition
          .FailureConditionHitTargetEntity:
          return FbFailureConditionHitTargetEntity_1.FbFailureConditionHitTargetEntity.Create(
            t,
          );
        case fb_component_1.UnionTargetGearGroupFailureCondition
          .FailureConditionSequentialState:
          return FbFailureConditionSequentialState_1.FbFailureConditionSequentialState.Create(
            t,
          );
        default:
          return;
      }
  }
}
exports.UnionTargetGearGroupFailureConditionHelper =
  UnionTargetGearGroupFailureConditionHelper;
//# sourceMappingURL=UnionTargetGearGroupFailureConditionHelper.js.map
