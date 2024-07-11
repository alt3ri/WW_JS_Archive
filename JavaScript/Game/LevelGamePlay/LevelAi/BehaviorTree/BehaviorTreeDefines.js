"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.BehaviorTreeDefines = void 0);
const puerts_1 = require("puerts"),
  UE = require("ue"),
  PATROL_STATE_PREFIX = "IN_PATROL",
  PATROL_ACTIONS_STATE_PREFIX = "PATROL_ACTIONS",
  ACTIONS_STATE_PREFIX = "IN_ACTIONS";
class BehaviorTreeDefines {
  static get UseLevelAiBehaviorTree() {
    return this.hIe || ((this.hIe = !0), (this.lIe = this._Ie())), this.lIe;
  }
  static set UseLevelAiBehaviorTree(e) {
    this.hIe || ((this.hIe = !0), (this.lIe = this._Ie())),
      this.lIe !== e && (this.lIe = e);
  }
  static _Ie() {
    var e = "" + UE.BlueprintPathsLibrary.ProjectDir() + this.uIe,
      t = (0, puerts_1.$ref)(void 0);
    return (
      UE.KuroStaticLibrary.LoadFileToString(t, e) &&
      "true" === (0, puerts_1.$unref)(t)
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
  (BehaviorTreeDefines.BehaviorTreePatrolStateName = "PATROL_STATE"),
  (BehaviorTreeDefines.LevelAiSwitchName = "LEVEL_AI_STOP"),
  (BehaviorTreeDefines.PatrolFinishName = "PATROL_COMPLETE"),
  (BehaviorTreeDefines.lIe = !1),
  (BehaviorTreeDefines.hIe = !1);
//# sourceMappingURL=BehaviorTreeDefines.js.map
