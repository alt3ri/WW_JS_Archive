"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionHitLogicType =
    exports.unionToUnionHitLogicType =
    exports.UnionHitLogicType =
      void 0);
const hit_logic_change_count_down_state_js_1 = require("../fb-component/hit-logic-change-count-down-state.js"),
  hit_logic_change_lock_state_js_1 = require("../fb-component/hit-logic-change-lock-state.js"),
  hit_logic_change_next_and_lock_target_state_js_1 = require("../fb-component/hit-logic-change-next-and-lock-target-state.js"),
  hit_logic_change_next_state_js_1 = require("../fb-component/hit-logic-change-next-state.js"),
  hit_logic_change_target_state_js_1 = require("../fb-component/hit-logic-change-target-state.js");
var UnionHitLogicType;
function unionToUnionHitLogicType(t, e) {
  switch (UnionHitLogicType[t]) {
    case "NONE":
      return;
    case "HitLogicChangeCountDownState":
      return e(
        new hit_logic_change_count_down_state_js_1.HitLogicChangeCountDownState(),
      );
    case "HitLogicChangeLockState":
      return e(new hit_logic_change_lock_state_js_1.HitLogicChangeLockState());
    case "HitLogicChangeNextAndLockTargetState":
      return e(
        new hit_logic_change_next_and_lock_target_state_js_1.HitLogicChangeNextAndLockTargetState(),
      );
    case "HitLogicChangeNextState":
      return e(new hit_logic_change_next_state_js_1.HitLogicChangeNextState());
    case "HitLogicChangeTargetState":
      return e(
        new hit_logic_change_target_state_js_1.HitLogicChangeTargetState(),
      );
    default:
      return;
  }
}
function unionListToUnionHitLogicType(t, e, n) {
  switch (UnionHitLogicType[t]) {
    case "NONE":
      return;
    case "HitLogicChangeCountDownState":
      return e(
        n,
        new hit_logic_change_count_down_state_js_1.HitLogicChangeCountDownState(),
      );
    case "HitLogicChangeLockState":
      return e(
        n,
        new hit_logic_change_lock_state_js_1.HitLogicChangeLockState(),
      );
    case "HitLogicChangeNextAndLockTargetState":
      return e(
        n,
        new hit_logic_change_next_and_lock_target_state_js_1.HitLogicChangeNextAndLockTargetState(),
      );
    case "HitLogicChangeNextState":
      return e(
        n,
        new hit_logic_change_next_state_js_1.HitLogicChangeNextState(),
      );
    case "HitLogicChangeTargetState":
      return e(
        n,
        new hit_logic_change_target_state_js_1.HitLogicChangeTargetState(),
      );
    default:
      return;
  }
}
!(function (t) {
  (t[(t.NONE = 0)] = "NONE"),
    (t[(t.HitLogicChangeCountDownState = 1)] = "HitLogicChangeCountDownState"),
    (t[(t.HitLogicChangeLockState = 2)] = "HitLogicChangeLockState"),
    (t[(t.HitLogicChangeNextAndLockTargetState = 3)] =
      "HitLogicChangeNextAndLockTargetState"),
    (t[(t.HitLogicChangeNextState = 4)] = "HitLogicChangeNextState"),
    (t[(t.HitLogicChangeTargetState = 5)] = "HitLogicChangeTargetState");
})(
  (UnionHitLogicType =
    exports.UnionHitLogicType || (exports.UnionHitLogicType = {})),
),
  (exports.unionToUnionHitLogicType = unionToUnionHitLogicType),
  (exports.unionListToUnionHitLogicType = unionListToUnionHitLogicType);
//# sourceMappingURL=union-hit-logic-type.js.map
