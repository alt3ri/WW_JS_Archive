"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressConfig = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  ConditionGroupById_1 = require("../../../../../Core/Define/ConfigQuery/ConditionGroupById"),
  RegressBaseByEntryType_1 = require("../../../../../Core/Define/ConfigQuery/RegressBaseByEntryType"),
  RegressBonusRewardByGrade_1 = require("../../../../../Core/Define/ConfigQuery/RegressBonusRewardByGrade"),
  RegressDoubleDropByGrade_1 = require("../../../../../Core/Define/ConfigQuery/RegressDoubleDropByGrade"),
  RegressEntryByEntryType_1 = require("../../../../../Core/Define/ConfigQuery/RegressEntryByEntryType"),
  RegressInvestigationByInvestigationTypeAndIfGlobal_1 = require("../../../../../Core/Define/ConfigQuery/RegressInvestigationByInvestigationTypeAndIfGlobal"),
  RegressQuestById_1 = require("../../../../../Core/Define/ConfigQuery/RegressQuestById"),
  RegressSignRewardByGradeAndActivityId_1 = require("../../../../../Core/Define/ConfigQuery/RegressSignRewardByGradeAndActivityId"),
  RewardConfigById_1 = require("../../../../../Core/Define/ConfigQuery/RewardConfigById"),
  ConfigBase_1 = require("../../../../../Core/Framework/ConfigBase"),
  LauncherNetworkDetectionController_1 = require("../../../../../Launcher/NetworkDetection/LauncherNetworkDetectionController"),
  ModelManager_1 = require("../../../../Manager/ModelManager");
class ActivityRegressConfig extends ConfigBase_1.ConfigBase {
  GetRegressSignRewards(e, r) {
    var i =
      RegressSignRewardByGradeAndActivityId_1.configRegressSignRewardByGradeAndActivityId.GetConfigList(
        r,
        e,
      );
    return (
      void 0 === i &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          63,
          "回归活动->获取回流签到奖励配置失败,请检查配置表RegressSignReward",
          ["activityId:", e],
          ["grade:", r],
        ),
      i
    );
  }
  GetRegressQuestionnaireConfig(e) {
    var r =
        LauncherNetworkDetectionController_1.LauncherNetworkDetectionController.IsGlobalPlayer(),
      i =
        RegressInvestigationByInvestigationTypeAndIfGlobal_1.configRegressInvestigationByInvestigationTypeAndIfGlobal.GetConfig(
          e,
          r,
        );
    return (
      void 0 === i &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          63,
          "回归活动->获取回流调查问卷配置失败,请检查配置表RegressInvestigation",
          ["type:", e],
          ["ifGlobal:", r],
        ),
      i
    );
  }
  GetRegressBaseConfigListByType(e) {
    var r;
    if (4 !== e)
      return (
        void 0 ===
          (r =
            RegressBaseByEntryType_1.configRegressBaseByEntryType.GetConfigList(
              Number(e),
            )) &&
          Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ActivityRecall",
            63,
            "[回流活动]ActivityRecallConfig.GetRecallBaseConfigByType->",
            ["获取回流基础配置失败,请检查配置表RegressBase: entryType:", e],
          ),
        r
      );
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "ActivityRecall",
        63,
        "[回流活动]ActivityRecallConfig.GetRecallBaseConfigByType->",
        [
          "获取回流基础配置失败,请检查传入参数,请传入新角色1类型来获取配置，EntryType:",
          e,
        ],
      );
  }
  GetRewardConfig(e) {
    var r = RewardConfigById_1.configRewardConfigById.GetConfig(e);
    if (void 0 !== r) return r;
    Log_1.Log.CheckError() &&
      Log_1.Log.Error(
        "ActivityRecall",
        63,
        "[回流活动]ActivityRecallConfig.GetRewardConfig->",
        [
          "获取回归奖励配置失败,请检查配置表奖励档次|RewardConfig: rewardGroupId:",
          e,
        ],
      );
  }
  GetRegressQuestConfig(e) {
    return RegressQuestById_1.configRegressQuestById.GetConfig(e);
  }
  GetRegressBonusRewardConfigList(e) {
    return RegressBonusRewardByGrade_1.configRegressBonusRewardByGrade.GetConfigList(
      e,
    );
  }
  GetRegressRoleEntryConfigTuple() {
    var e = this.GetSortedOpenRegressEntryConfigList();
    return [e[0], e[1]];
  }
  GetSortedOpenRegressEntryConfigList() {
    var e = this.GetRegressEntryConfigByType(3),
      e = Array.from(e);
    return (
      e.sort((e, r) => {
        if (void 0 === e || void 0 === r) {
          const i = e ? 1 : 0,
            t = r ? 1 : 0;
          return t - i;
        }
        const i =
            ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(
              e,
            )[0]
              ? 1
              : 0,
          t = ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(
            r,
          )[0]
            ? 1
            : 0;
        return t === i ? e.Id - r.Id : t - i;
      }),
      e
    );
  }
  GetSortedOpenRegressBaseConfigList() {
    var e = [];
    for (const r of ModelManager_1.ModelManager.ActivityRegressModel.GetLastestRegressBaseConfigList(
      3,
    ))
      ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(r)[0] &&
        e.push(r);
    return e;
  }
  GetRegressEntrySingleConfigByType(e) {
    return this.GetRegressEntryConfigByType(e)[0];
  }
  GetRegressEntryConfigByType(e) {
    if (4 === e)
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          63,
          "[回流活动]ActivityRecallConfig.GetRegressEntryConfigByType->",
          [
            "获取回流配置失败,请检查传入参数,请传入新角色1类型来获取配置,RegressEntry:entryType:",
            e,
          ],
        );
    else {
      var r =
        RegressEntryByEntryType_1.configRegressEntryByEntryType.GetConfigList(
          Number(e),
        );
      if (void 0 !== r) return r;
      Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          63,
          "[回流活动]ActivityRecallConfig.GetRegressEntryConfigByType->",
          ["获取回流配置失败,请检查配置表RegressEntry: entryType:", e],
        );
    }
  }
  GetUnlockRegressEntryViewConfigList() {
    var e,
      r = [],
      i = this.GetRegressEntrySingleConfigByType(1),
      i = (r.push(i), this.GetRegressEntrySingleConfigByType(2)),
      [i, t] = (r.push(i), this.GetRegressRoleEntryConfigTuple()),
      [n] =
        ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(i);
    let o = !1;
    return (
      void 0 !== t &&
        (([e] =
          ModelManager_1.ModelManager.ActivityRegressModel.CheckIfEntryOpen(t)),
        (o = e)),
      (n || o) && (n && r.push(i), !n) && o && r.push(t),
      r
    );
  }
  GetDoubleDropConfig(e) {
    return RegressDoubleDropByGrade_1.configRegressDoubleDropByGrade.GetConfig(
      e,
    );
  }
  GetConditionGroup(e) {
    return ConditionGroupById_1.configConditionGroupById.GetConfig(e);
  }
}
exports.ActivityRegressConfig = ActivityRegressConfig;
//# sourceMappingURL=ActivityRegressConfig.js.map
