"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTargetGearGroupSuccessConditionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbSuccessConditionCountDownState_1 = require("./FbSuccessConditionCountDownState"),
  FbSuccessConditionSameArbitraryState_1 = require("./FbSuccessConditionSameArbitraryState"),
  FbSuccessConditionSameSpecificState_1 = require("./FbSuccessConditionSameSpecificState"),
  FbSuccessConditionSpecificTargetState_1 = require("./FbSuccessConditionSpecificTargetState");
class UnionTargetGearGroupSuccessConditionHelper {
  static GetUnionTargetGearGroupSuccessConditionObject(e) {
    switch (e) {
      case fb_component_1.UnionTargetGearGroupSuccessCondition
        .SuccessConditionCountDownState:
        return new fb_component_1.SuccessConditionCountDownState();
      case fb_component_1.UnionTargetGearGroupSuccessCondition
        .SuccessConditionSameArbitraryState:
        return new fb_component_1.SuccessConditionSameArbitraryState();
      case fb_component_1.UnionTargetGearGroupSuccessCondition
        .SuccessConditionSameSpecificState:
        return new fb_component_1.SuccessConditionSameSpecificState();
      case fb_component_1.UnionTargetGearGroupSuccessCondition
        .SuccessConditionSpecificTargetState:
        return new fb_component_1.SuccessConditionSpecificTargetState();
      default:
        return;
    }
  }
  static ReadUnionTargetGearGroupSuccessCondition(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_component_1.UnionTargetGearGroupSuccessCondition
          .SuccessConditionCountDownState:
          return FbSuccessConditionCountDownState_1.FbSuccessConditionCountDownState.Create(
            t,
          );
        case fb_component_1.UnionTargetGearGroupSuccessCondition
          .SuccessConditionSameArbitraryState:
          return FbSuccessConditionSameArbitraryState_1.FbSuccessConditionSameArbitraryState.Create(
            t,
          );
        case fb_component_1.UnionTargetGearGroupSuccessCondition
          .SuccessConditionSameSpecificState:
          return FbSuccessConditionSameSpecificState_1.FbSuccessConditionSameSpecificState.Create(
            t,
          );
        case fb_component_1.UnionTargetGearGroupSuccessCondition
          .SuccessConditionSpecificTargetState:
          return FbSuccessConditionSpecificTargetState_1.FbSuccessConditionSpecificTargetState.Create(
            t,
          );
        default:
          return;
      }
  }
}
exports.UnionTargetGearGroupSuccessConditionHelper =
  UnionTargetGearGroupSuccessConditionHelper;
//# sourceMappingURL=UnionTargetGearGroupSuccessConditionHelper.js.map
