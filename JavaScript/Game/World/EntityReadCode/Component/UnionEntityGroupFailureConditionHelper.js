"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionEntityGroupFailureConditionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbEntityGroupFailureArbitraryState_1 = require("./FbEntityGroupFailureArbitraryState"),
  FbEntityGroupFailureSequentialState_1 = require("./FbEntityGroupFailureSequentialState");
class UnionEntityGroupFailureConditionHelper {
  static GetUnionEntityGroupFailureConditionObject(t) {
    switch (t) {
      case fb_component_1.UnionEntityGroupFailureCondition
        .EntityGroupFailureArbitraryState:
        return new fb_component_1.EntityGroupFailureArbitraryState();
      case fb_component_1.UnionEntityGroupFailureCondition
        .EntityGroupFailureSequentialState:
        return new fb_component_1.EntityGroupFailureSequentialState();
      default:
        return;
    }
  }
  static ReadUnionEntityGroupFailureCondition(t, e) {
    if (void 0 !== e)
      switch (t) {
        case fb_component_1.UnionEntityGroupFailureCondition
          .EntityGroupFailureArbitraryState:
          return FbEntityGroupFailureArbitraryState_1.FbEntityGroupFailureArbitraryState.Create(
            e,
          );
        case fb_component_1.UnionEntityGroupFailureCondition
          .EntityGroupFailureSequentialState:
          return FbEntityGroupFailureSequentialState_1.FbEntityGroupFailureSequentialState.Create(
            e,
          );
        default:
          return;
      }
  }
}
exports.UnionEntityGroupFailureConditionHelper =
  UnionEntityGroupFailureConditionHelper;
//# sourceMappingURL=UnionEntityGroupFailureConditionHelper.js.map
