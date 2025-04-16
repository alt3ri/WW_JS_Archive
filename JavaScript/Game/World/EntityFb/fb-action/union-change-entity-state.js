"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionChangeEntityState =
    exports.unionToUnionChangeEntityState =
    exports.UnionChangeEntityState =
      void 0);
const change_entity_state_batch_directly_js_1 = require("../fb-action/change-entity-state-batch-directly.js"),
  change_entity_state_directly_js_1 = require("../fb-action/change-entity-state-directly.js"),
  change_entity_state_loop_js_1 = require("../fb-action/change-entity-state-loop.js");
var UnionChangeEntityState;
function unionToUnionChangeEntityState(t, e) {
  switch (UnionChangeEntityState[t]) {
    case "NONE":
      return;
    case "ChangeEntityStateBatchDirectly":
      return e(
        new change_entity_state_batch_directly_js_1.ChangeEntityStateBatchDirectly(),
      );
    case "ChangeEntityStateDirectly":
      return e(
        new change_entity_state_directly_js_1.ChangeEntityStateDirectly(),
      );
    case "ChangeEntityStateLoop":
      return e(new change_entity_state_loop_js_1.ChangeEntityStateLoop());
    default:
      return;
  }
}
function unionListToUnionChangeEntityState(t, e, n) {
  switch (UnionChangeEntityState[t]) {
    case "NONE":
      return;
    case "ChangeEntityStateBatchDirectly":
      return e(
        n,
        new change_entity_state_batch_directly_js_1.ChangeEntityStateBatchDirectly(),
      );
    case "ChangeEntityStateDirectly":
      return e(
        n,
        new change_entity_state_directly_js_1.ChangeEntityStateDirectly(),
      );
    case "ChangeEntityStateLoop":
      return e(n, new change_entity_state_loop_js_1.ChangeEntityStateLoop());
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.ChangeEntityStateBatchDirectly = 1)] =
      "ChangeEntityStateBatchDirectly"),
    (t[(t.ChangeEntityStateDirectly = 2)] = "ChangeEntityStateDirectly"),
    (t[(t.ChangeEntityStateLoop = 3)] = "ChangeEntityStateLoop");
})(
  (UnionChangeEntityState =
    exports.UnionChangeEntityState || (exports.UnionChangeEntityState = {})),
),
  (exports.unionToUnionChangeEntityState = unionToUnionChangeEntityState),
  (exports.unionListToUnionChangeEntityState =
    unionListToUnionChangeEntityState);
//# sourceMappingURL=union-change-entity-state.js.map
