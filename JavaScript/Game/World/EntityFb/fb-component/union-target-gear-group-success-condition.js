"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionTargetGearGroupSuccessCondition =
    exports.unionToUnionTargetGearGroupSuccessCondition =
    exports.UnionTargetGearGroupSuccessCondition =
      void 0);
const success_condition_count_down_state_js_1 = require("../fb-component/success-condition-count-down-state.js"),
  success_condition_same_arbitrary_state_js_1 = require("../fb-component/success-condition-same-arbitrary-state.js"),
  success_condition_same_specific_state_js_1 = require("../fb-component/success-condition-same-specific-state.js"),
  success_condition_specific_target_state_js_1 = require("../fb-component/success-condition-specific-target-state.js");
var UnionTargetGearGroupSuccessCondition;
function unionToUnionTargetGearGroupSuccessCondition(e, s) {
  switch (UnionTargetGearGroupSuccessCondition[e]) {
    case "NONE":
      return;
    case "SuccessConditionCountDownState":
      return s(
        new success_condition_count_down_state_js_1.SuccessConditionCountDownState(),
      );
    case "SuccessConditionSameArbitraryState":
      return s(
        new success_condition_same_arbitrary_state_js_1.SuccessConditionSameArbitraryState(),
      );
    case "SuccessConditionSameSpecificState":
      return s(
        new success_condition_same_specific_state_js_1.SuccessConditionSameSpecificState(),
      );
    case "SuccessConditionSpecificTargetState":
      return s(
        new success_condition_specific_target_state_js_1.SuccessConditionSpecificTargetState(),
      );
    default:
      return;
  }
}
function unionListToUnionTargetGearGroupSuccessCondition(e, s, t) {
  switch (UnionTargetGearGroupSuccessCondition[e]) {
    case "NONE":
      return;
    case "SuccessConditionCountDownState":
      return s(
        t,
        new success_condition_count_down_state_js_1.SuccessConditionCountDownState(),
      );
    case "SuccessConditionSameArbitraryState":
      return s(
        t,
        new success_condition_same_arbitrary_state_js_1.SuccessConditionSameArbitraryState(),
      );
    case "SuccessConditionSameSpecificState":
      return s(
        t,
        new success_condition_same_specific_state_js_1.SuccessConditionSameSpecificState(),
      );
    case "SuccessConditionSpecificTargetState":
      return s(
        t,
        new success_condition_specific_target_state_js_1.SuccessConditionSpecificTargetState(),
      );
    default:
      return;
  }
}
!(function (e) {
  (e[(e.NONE = 0)] = "NONE"),
    (e[(e.SuccessConditionCountDownState = 1)] =
      "SuccessConditionCountDownState"),
    (e[(e.SuccessConditionSameArbitraryState = 2)] =
      "SuccessConditionSameArbitraryState"),
    (e[(e.SuccessConditionSameSpecificState = 3)] =
      "SuccessConditionSameSpecificState"),
    (e[(e.SuccessConditionSpecificTargetState = 4)] =
      "SuccessConditionSpecificTargetState");
})(
  (UnionTargetGearGroupSuccessCondition =
    exports.UnionTargetGearGroupSuccessCondition ||
    (exports.UnionTargetGearGroupSuccessCondition = {})),
),
  (exports.unionToUnionTargetGearGroupSuccessCondition =
    unionToUnionTargetGearGroupSuccessCondition),
  (exports.unionListToUnionTargetGearGroupSuccessCondition =
    unionListToUnionTargetGearGroupSuccessCondition);
//# sourceMappingURL=union-target-gear-group-success-condition.js.map
