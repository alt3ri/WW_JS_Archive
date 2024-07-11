"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorTreeDefines = void 0);
const puerts_1 = require("puerts");
const UE = require("ue");
const PATROL_STATE_PREFIX = "IN_PATROL";
const PATROL_ACTIONS_STATE_PREFIX = "PATROL_ACTIONS";
const ACTIONS_STATE_PREFIX = "IN_ACTIONS";
class BehaviorTreeDefines {
  static get UseLevelAiBehaviorTree() {
    return this.hIe || ((this.hIe = !0), (this.lIe = this._Ie())), this.lIe;
  }
  static set UseLevelAiBehaviorTree(e) {
    this.hIe || ((this.hIe = !0), (this.lIe = this._Ie())),
      this.lIe !== e && (this.lIe = e);
  }
  static _Ie() {
    const e = "" + UE.BlueprintPathsLibrary.ProjectDir() + this.uIe;
    const t = (0, puerts_1.$ref)(void 0);
    return (
      UE.KuroStaticLibrary.LoadFileToString(t, e) &&
      (0, puerts_1.$unref)(t) === "true"
    );
  }
  static GetPatrolActionStateName(e, t) {
    return `${PATROL_ACTIONS_STATE_PREFIX}_${t.toString()}_` + e.toString();
  }
  static GetPatrolStateName(e) {
    return PATROL_STATE_PREFIX + "_" + e.toString();
  }
  static GetActionStateName(e) {
    return ACTIONS_STATE_PREFIX + "_" + e.toString();
  }
  static GetBehaviorTreePath(e, t, r = !1) {
    (e = "BT_" + e.toString()), (t = `${this.cIe}/${t.toString()}/` + e);
    return r ? t + "." + e : t;
  }
}
((exports.BehaviorTreeDefines = BehaviorTreeDefines).cIe =
  "/Game/Aki/AI/AINPC/LevelAiBT"),
  (BehaviorTreeDefines.uIe = "IsUseLevelAiBehaviorTree"),
  (BehaviorTreeDefines.BehaviorTreeStateName = "BT_STATE"),
  (BehaviorTreeDefines.LevelAiSwitchName = "LEVEL_AI_STOP"),
  (BehaviorTreeDefines.PatrolFinishSegmentIndexName =
    "PATROL_FINISH_SEGMENT_INDEX"),
  (BehaviorTreeDefines.lIe = !1),
  (BehaviorTreeDefines.hIe = !1);
// # sourceMappingURL=BehaviorTreeDefines.js.map
