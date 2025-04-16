"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionTargetGearGroupFailureCondition =
    exports.unionToUnionTargetGearGroupFailureCondition =
    exports.UnionTargetGearGroupFailureCondition =
      void 0);
const failure_condition_arbitrary_state_js_1 = require("../fb-component/failure-condition-arbitrary-state.js"),
  failure_condition_hit_target_entity_js_1 = require("../fb-component/failure-condition-hit-target-entity.js"),
  failure_condition_sequential_state_js_1 = require("../fb-component/failure-condition-sequential-state.js");
var UnionTargetGearGroupFailureCondition;
function unionToUnionTargetGearGroupFailureCondition(t, i) {
  switch (UnionTargetGearGroupFailureCondition[t]) {
    case "NONE":
      return;
    case "FailureConditionArbitraryState":
      return i(
        new failure_condition_arbitrary_state_js_1.FailureConditionArbitraryState(),
      );
    case "FailureConditionHitTargetEntity":
      return i(
        new failure_condition_hit_target_entity_js_1.FailureConditionHitTargetEntity(),
      );
    case "FailureConditionSequentialState":
      return i(
        new failure_condition_sequential_state_js_1.FailureConditionSequentialState(),
      );
    default:
      return;
  }
}
function unionListToUnionTargetGearGroupFailureCondition(t, i, e) {
  switch (UnionTargetGearGroupFailureCondition[t]) {
    case "NONE":
      return;
    case "FailureConditionArbitraryState":
      return i(
        e,
        new failure_condition_arbitrary_state_js_1.FailureConditionArbitraryState(),
      );
    case "FailureConditionHitTargetEntity":
      return i(
        e,
        new failure_condition_hit_target_entity_js_1.FailureConditionHitTargetEntity(),
      );
    case "FailureConditionSequentialState":
      return i(
        e,
        new failure_condition_sequential_state_js_1.FailureConditionSequentialState(),
      );
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.FailureConditionArbitraryState = 1)] =
      "FailureConditionArbitraryState"),
    (t[(t.FailureConditionHitTargetEntity = 2)] =
      "FailureConditionHitTargetEntity"),
    (t[(t.FailureConditionSequentialState = 3)] =
      "FailureConditionSequentialState");
})(
  (UnionTargetGearGroupFailureCondition =
    exports.UnionTargetGearGroupFailureCondition ||
    (exports.UnionTargetGearGroupFailureCondition = {})),
),
  (exports.unionToUnionTargetGearGroupFailureCondition =
    unionToUnionTargetGearGroupFailureCondition),
  (exports.unionListToUnionTargetGearGroupFailureCondition =
    unionListToUnionTargetGearGroupFailureCondition);
//# sourceMappingURL=union-target-gear-group-failure-condition.js.map
