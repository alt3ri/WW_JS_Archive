"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionEntityGroupFailureCondition =
    exports.unionToUnionEntityGroupFailureCondition =
    exports.UnionEntityGroupFailureCondition =
      void 0);
const entity_group_failure_arbitrary_state_js_1 = require("../fb-component/entity-group-failure-arbitrary-state.js"),
  entity_group_failure_sequential_state_js_1 = require("../fb-component/entity-group-failure-sequential-state.js");
var UnionEntityGroupFailureCondition;
function unionToUnionEntityGroupFailureCondition(t, e) {
  switch (UnionEntityGroupFailureCondition[t]) {
    case "NONE":
      return;
    case "EntityGroupFailureArbitraryState":
      return e(
        new entity_group_failure_arbitrary_state_js_1.EntityGroupFailureArbitraryState(),
      );
    case "EntityGroupFailureSequentialState":
      return e(
        new entity_group_failure_sequential_state_js_1.EntityGroupFailureSequentialState(),
      );
    default:
      return;
  }
}
function unionListToUnionEntityGroupFailureCondition(t, e, i) {
  switch (UnionEntityGroupFailureCondition[t]) {
    case "NONE":
      return;
    case "EntityGroupFailureArbitraryState":
      return e(
        i,
        new entity_group_failure_arbitrary_state_js_1.EntityGroupFailureArbitraryState(),
      );
    case "EntityGroupFailureSequentialState":
      return e(
        i,
        new entity_group_failure_sequential_state_js_1.EntityGroupFailureSequentialState(),
      );
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.EntityGroupFailureArbitraryState = 1)] =
      "EntityGroupFailureArbitraryState"),
    (t[(t.EntityGroupFailureSequentialState = 2)] =
      "EntityGroupFailureSequentialState");
})(
  (UnionEntityGroupFailureCondition =
    exports.UnionEntityGroupFailureCondition ||
    (exports.UnionEntityGroupFailureCondition = {})),
),
  (exports.unionToUnionEntityGroupFailureCondition =
    unionToUnionEntityGroupFailureCondition),
  (exports.unionListToUnionEntityGroupFailureCondition =
    unionListToUnionEntityGroupFailureCondition);
//# sourceMappingURL=union-entity-group-failure-condition.js.map
