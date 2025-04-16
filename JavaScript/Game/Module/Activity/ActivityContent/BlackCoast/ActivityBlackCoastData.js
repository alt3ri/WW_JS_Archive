"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityBlackCoastData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  WeaponTrialData_1 = require("../../../Weapon/Data/WeaponTrialData"),
  ActivityData_1 = require("../../ActivityData"),
  ActivityBlackCoastDefine_1 = require("./ActivityBlackCoastDefine");
class ActivityBlackCoastData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.bja = new Map()),
      (this.ROe = new Map()),
      (this.qja = 0),
      (this.Oja = 0),
      (this.y7s = (t, e) => t.Goal - e.Goal);
  }
  OnInit(t) {
    this.InitProgressReward(), this.Gja();
  }
  PhraseEx(t) {
    t = t.VS_;
    if (t) {
      this.StageUpdate(t.gMs);
      for (const r of t.rM_) {
        var e = this.GetProgressRewardDataById(r);
        e
          ? (e.Achieved = !0)
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn(
              "Activity",
              37,
              "[BlackCoastActivity] 奖励Id不存在",
              ["RewardId", r],
            );
      }
    }
  }
  NeedSelfControlFirstRedPoint() {
    return !1;
  }
  GetExDataRedPointShowState() {
    return this.RewardRedDotState();
  }
  RewardRedDotState() {
    return (
      this.HasProgressRewardRedDot() ||
      this.HasStageRewardRedDot() ||
      this.HasAnyNewStageRedDot()
    );
  }
  GetProgressItemCount() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      this.qja,
    );
  }
  GetProgressItemTotal() {
    return this.Oja;
  }
  get GetProgressItemId() {
    return this.qja;
  }
  InitProgressReward() {
    this.bja.clear();
    var t =
        ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetActivityConfig(
          this.Id,
        ),
      t =
        ((this.qja = t.ItemId),
        ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetAllRewardConfigByActivityId(
          this.Id,
        ));
    for (const r of t) {
      var e = new ActivityBlackCoastDefine_1.BlackCoastProgressRewardData();
      (e.Id = r.Id),
        (e.Goal = r.Active),
        (e.DropId = r.DropId),
        (e.GetCurrentGoal = () => this.GetProgressItemCount()),
        (this.Oja = Math.max(this.Oja, e.Goal)),
        this.bja.set(r.Id, e);
    }
  }
  GetProgressRewardDataById(t) {
    return this.bja.get(t);
  }
  GetAllProgressRewardData() {
    return Array.from(this.bja.values()).sort(this.y7s);
  }
  GetAllAvailableProgressRewardIds() {
    var t = [];
    for (const e of this.GetAllProgressRewardData())
      0 === e.GetState() && t.push(e.Id);
    return t;
  }
  SetProgressRewardDataGot(t) {
    for (const r of t) {
      var e = this.GetProgressRewardDataById(r);
      e && (e.Achieved = !0);
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.Id,
    );
  }
  HasProgressRewardRedDot() {
    for (const t of this.bja.values()) if (0 === t.GetState()) return !0;
    return !1;
  }
  SetTaskRewardGot(t, e) {
    this.ROe.get(t).SetTaskRewardGot(e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      );
  }
  Gja() {
    this.ROe.clear();
    var e =
      ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetAllStageConfigByActivityId(
        this.Id,
      );
    for (let t = 0; t < e.length; t++) {
      var r = e[t],
        a = new ActivityBlackCoastDefine_1.BlackCoastStageInfo(r.Id, t);
      this.ROe.set(r.Id, a);
    }
  }
  GetStageById(t) {
    return this.ROe.get(t);
  }
  GetAllStages() {
    return Array.from(this.ROe.values()).sort((t, e) => t.StageId - e.StageId);
  }
  GetAllStagesId() {
    return Array.from(this.ROe.keys()).sort((t, e) => t - e);
  }
  StageUpdate(t) {
    for (const r of t) {
      var e = this.ROe.get(r.s5n);
      e
        ? e.StageUpdate(r)
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn(
            "Activity",
            37,
            "[BlackCoastActivity] 活动Stage不存在",
            ["Id", r.s5n],
          );
    }
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.Id,
    );
  }
  HasStageRewardRedDot() {
    for (const t of this.ROe.values()) if (t.GetRewardState()) return !0;
    return !1;
  }
  HasAnyNewStageRedDot() {
    for (const t of this.ROe.values())
      if (1 === t.StageState)
        if (
          !ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
            this.Id,
            0,
            t.StageId,
            0,
            0,
          )
        )
          return !0;
    return !1;
  }
  HasNewStageFlag(t) {
    return (
      1 === this.ROe.get(t).StageState &&
      !ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
        this.Id,
        0,
        t,
        0,
        0,
      )
    );
  }
  SaveNewStageFlag(t) {
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
      this.Id,
      t,
      0,
      0,
      1,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      );
  }
  GetCurrentLockQuestId() {
    for (const t of this.GetAllStages())
      if (!t.IsUnlock)
        return ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetStageConfig(
          t.StageId,
        ).QuestionId;
  }
  GetPreviewWeaponDataList() {
    var t = [],
      e =
        ConfigManager_1.ConfigManager.ActivityBlackCoastConfig.GetActivityConfig(
          this.Id,
        );
    if (e)
      for (const a of e.WeaponPreviewId) {
        var r = new WeaponTrialData_1.WeaponTrialData();
        r.SetTrialId(a), t.push(r);
      }
    return t;
  }
}
exports.ActivityBlackCoastData = ActivityBlackCoastData;
//# sourceMappingURL=ActivityBlackCoastData.js.map
