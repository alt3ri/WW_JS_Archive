"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.LevelConditionForMoonChasingOpenInteractive =
    exports.LevelConditionForMoonChasingCheckHasNotFinishedTask =
    exports.LevelConditionForMoonChasingCheckNeedBranch =
    exports.LevelConditionForMoonChasingCheckTargetBuiltCount =
      void 0);
const ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  LevelGeneralBase_1 = require("../LevelGeneralBase");
class LevelConditionForMoonChasingCheckTargetBuiltCount extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    e = e.LimitParams.get("TargetBuiltCount");
    return (
      void 0 !== e &&
      parseInt(e) ===
        ModelManager_1.ModelManager.MoonChasingBuildingModel.GetBuiltBuildingCount()
    );
  }
}
exports.LevelConditionForMoonChasingCheckTargetBuiltCount =
  LevelConditionForMoonChasingCheckTargetBuiltCount;
class LevelConditionForMoonChasingCheckNeedBranch extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    e = e.LimitParams.get("TargetRewardId");
    if (void 0 === e) return !1;
    (e = parseInt(e)),
      (e =
        ModelManager_1.ModelManager.MoonChasingRewardModel.GetTaskDataById(e));
    if (void 0 === e) return !1;
    let o = !1;
    for (const r of ConfigManager_1.ConfigManager.TaskConfig.GetAllBranchLineTask())
      if (
        1 === ModelManager_1.ModelManager.QuestNewModel.GetQuestState(r.TaskId)
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
class LevelConditionForMoonChasingOpenInteractive extends LevelGeneralBase_1.LevelConditionBase {
  Check(e, n) {
    return !0;
  }
}
exports.LevelConditionForMoonChasingOpenInteractive =
  LevelConditionForMoonChasingOpenInteractive;
//# sourceMappingURL=LevelConditionForMoonChasing.js.map
