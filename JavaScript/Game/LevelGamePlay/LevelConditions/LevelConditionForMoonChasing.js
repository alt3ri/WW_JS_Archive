"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionForMoonChasingCheckMainlineTaskDone =
    exports.LevelConditionForMoonChasingOpenInteractive =
    exports.LevelConditionForMoonChasingCheckTaskState =
    exports.LevelConditionForMoonChasingCheckHasNotFinishedTask =
    exports.LevelConditionForMoonChasingCheckNeedBranch =
    exports.LevelConditionForMoonChasingCheckHasCanLevelUpBuilding =
    exports.LevelConditionForMoonChasingCheckTargetBuiltCount =
      void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionForMoonChasingCheckTargetBuiltCount extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var e = e.LimitParams,
      o = e.get("TargetBuiltCount"),
      e = e.get("Op");
    return (
      void 0 !== o &&
      void 0 !== e &&
      ((o = parseInt(o)),
      this.CheckCompareValue(
        e,
        ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuiltBuildingCount(),
        o,
      ))
    );
  }
}
exports.LevelConditionForMoonChasingCheckTargetBuiltCount =
  LevelConditionForMoonChasingCheckTargetBuiltCount;
class LevelConditionForMoonChasingCheckHasCanLevelUpBuilding extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    return (
      void 0 !==
      ModelManager_1.ModelManager.MoonChasingBuildingModel.GetFirstCanLevelUpBuildingId()
    );
  }
}
exports.LevelConditionForMoonChasingCheckHasCanLevelUpBuilding =
  LevelConditionForMoonChasingCheckHasCanLevelUpBuilding;
class LevelConditionForMoonChasingCheckNeedBranch extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    e = e.LimitParams.get("TargetRewardId");
    if (void 0 === e) return !1;
    (e = parseInt(e)),
      (e =
        ModelManager_1.ModelManager.MoonChasingRewardModel.GetTaskDataById(e));
    if (void 0 === e) return !1;
    let o = !1;
    for (const a of ConfigManager_1.ConfigManager.TaskConfig.GetAllBranchLineTask())
      if (
        1 === ModelManager_1.ModelManager.QuestNewModel.GetQuestState(a.TaskId)
      ) {
        o = !0;
        break;
      }
    return e.IsFinished && o;
  }
}
exports.LevelConditionForMoonChasingCheckNeedBranch =
  LevelConditionForMoonChasingCheckNeedBranch;
class LevelConditionForMoonChasingCheckHasNotFinishedTask extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    for (const o of ModelManager_1.ModelManager.MoonChasingBusinessModel.GetHelpEditTeamDataList())
      if (1 === o.GetTeamDataUnLockState()) return !0;
    return !1;
  }
}
exports.LevelConditionForMoonChasingCheckHasNotFinishedTask =
  LevelConditionForMoonChasingCheckHasNotFinishedTask;
class LevelConditionForMoonChasingCheckTaskState extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    var e = e.LimitParams,
      o = e.get("TargetState"),
      a = e.get("TargetCount"),
      e = e.get("Op");
    if (void 0 === o || void 0 === a || void 0 === e) return !1;
    var r = parseInt(o),
      o = parseInt(a);
    let t = 0;
    for (const i of ModelManager_1.ModelManager.MoonChasingBusinessModel.GetHelpEditTeamDataList())
      i.GetTeamDataUnLockState() === r && ++t;
    return this.CheckCompareValue(e, t, o);
  }
}
exports.LevelConditionForMoonChasingCheckTaskState =
  LevelConditionForMoonChasingCheckTaskState;
class LevelConditionForMoonChasingOpenInteractive extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    return !0;
  }
}
exports.LevelConditionForMoonChasingOpenInteractive =
  LevelConditionForMoonChasingOpenInteractive;
class LevelConditionForMoonChasingCheckMainlineTaskDone extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    e = e.LimitParams.get("MainLineId");
    return (
      void 0 !== e &&
      3 ===
        ModelManager_1.ModelManager.MoonChasingTaskModel.GetMainLineState(
          parseInt(e),
        )
    );
  }
}
exports.LevelConditionForMoonChasingCheckMainlineTaskDone =
  LevelConditionForMoonChasingCheckMainlineTaskDone;
//# sourceMappingURL=LevelConditionForMoonChasing.js.map
