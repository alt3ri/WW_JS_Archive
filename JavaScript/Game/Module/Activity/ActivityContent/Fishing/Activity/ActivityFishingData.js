"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityFishingData = void 0);
const Log_1 = require("../../../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../../Manager/ModelManager"),
  ActivityCommonDefine_1 = require("../../../ActivityCommonDefine"),
  ActivityData_1 = require("../../../ActivityData"),
  ActivityFishingDefine_1 = require("./ActivityFishingDefine");
class ActivityFishingData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.tcl = 0),
      (this.icl = 0),
      (this.ix_ = new Map()),
      (this.rx_ = new Map()),
      (this.lVl = (e, t) => {
        var i, r;
        return e.Status === t.Status
          ? ((i =
              ConfigManager_1.ConfigManager.FishingConfig.GetFishingActivityLimitTask(
                e.Id,
              )),
            (r =
              ConfigManager_1.ConfigManager.FishingConfig.GetFishingActivityLimitTask(
                t.Id,
              )),
            i.SortId === r.SortId ? e.Id - t.Id : i.SortId - r.SortId)
          : e.Status - t.Status;
      }),
      (this.ox_ = new Map()),
      (this.nx_ = 0),
      (this.MilestoneRewardMaxCount = 0);
  }
  OnInit(e) {
    this.sx_();
  }
  PhraseEx(e) {
    e = e.YS_;
    e &&
      ((this.tcl = MathUtils_1.MathUtils.LongToNumber(e._M_)),
      (this.icl = MathUtils_1.MathUtils.LongToNumber(e.cM_)),
      this.RefreshLimitTimeTaskDataList(e.$M_, !1),
      (this.MilestoneRewardItemAccumulate = e.QM_),
      this.RefreshMilestoneReward(e.WM_, !1));
  }
  GetActivityConfig() {
    return ConfigManager_1.ConfigManager.FishingConfig.GetFishingActivityConfig(
      this.Id,
    );
  }
  GetExDataRedPointShowState() {
    return this.IsUnLock()
      ? !!this.GetTimeLimitRedDotState() || !!this.GetHandBookRedDotState()
      : this.GetPreOpenFirstCheckRedDotState();
  }
  GetButtonRedPointShowState() {
    return !this.IsUnLock() && this.GetPreOpenFirstCheckRedDotState();
  }
  RefreshActivityRedDotState() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.Id,
    );
  }
  GetTimeLimitRedDotState() {
    return (
      !!this.IsLimitTimeRewardOn() &&
      (this.GetTimeLimitRewardRedDotState() ||
        this.GetLimitTimeShopRedDotState())
    );
  }
  GetTimeLimitRewardRedDotState() {
    var t = this.GetRewardTargetTabList();
    for (let e = 0; e < t.length; e++) {
      var i = e + 1;
      if (this.GetTimeLimitTasksRedDotStateByGroupId(i)) return !0;
    }
    return 0 < this.GetAllAvailableGetMilestoneRewardIds().length;
  }
  GetHandBookRedDotState() {
    return ModelManager_1.ModelManager.FishingModel.GetHandBookRewardRedDotState();
  }
  GetLimitTimeShopRedDotState() {
    return ModelManager_1.ModelManager.PayShopModel.CheckShopItemCheckFlag(209);
  }
  GetPreOpenFirstCheckRedDotState() {
    var e = this.CanPreOpen(),
      t = this.HasPreOpenCondition();
    return (
      !(!e || !t) &&
      0 ===
        ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
          this.Id,
          0,
          0,
          0,
          0,
        )
    );
  }
  SaveFirstCheckRedDotState(e, t = 0) {
    return (
      1 ===
        ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
          this.Id,
          0,
          e,
          t,
          0,
        ) ||
      (ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
        this.Id,
        e,
        t,
        0,
        1,
      ),
      this.RefreshActivityRedDotState(),
      !1)
    );
  }
  GetRewardTargetTabList() {
    return ConfigManager_1.ConfigManager.FishingConfig.GetAllFishingActivityGroupConfig();
  }
  GetRewardTabList() {
    return ConfigManager_1.ConfigManager.DynamicTabConfig.GetViewTabList(
      "FishingTimeLimitView",
    );
  }
  IsLimitTimeRewardOn() {
    var e;
    return (
      !!this.IsUnLock() &&
      (e = TimeUtil_1.TimeUtil.GetServerTime()) >= this.tcl &&
      e <= this.icl
    );
  }
  GetLimitTimeEndTime() {
    return this.icl;
  }
  RefreshLimitTimeTaskDataList(e, t) {
    for (const i of e) this.ax_(i);
    t &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FishingTimeLimitRewardListRefresh,
      );
  }
  ax_(t) {
    let i = this.ix_.get(t.s5n);
    if (!i) {
      i = new ActivityCommonDefine_1.ActivityTaskData();
      var r =
        ConfigManager_1.ConfigManager.FishingConfig.GetFishingActivityLimitTask(
          t.s5n,
        );
      if (!r)
        return void (
          Log_1.Log.CheckError() &&
          Log_1.Log.Error("Fishing", 37, "[FishingActivity] 限时奖励无配置", [
            "TaskId",
            t.s5n,
          ])
        );
      let e = this.rx_.get(r.GroupId);
      e || ((e = new Set()), this.rx_.set(r.GroupId, e)),
        e.add(t.s5n),
        this.ix_.set(t.s5n, i);
    }
    i.Refresh(t);
  }
  SetTimeLimitTaskDone(e) {
    (this.ix_.get(e).Status = 2),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FishingTimeLimitRewardProgressRefresh,
      );
  }
  GetTimeLimitTasksByGroupId(e) {
    var t = [],
      e = this.rx_.get(e);
    if (!e) return t;
    for (const i of e.values()) t.push(this.ix_.get(i));
    return t.sort(this.lVl);
  }
  GetTimeLimitTasksRedDotStateByGroupId(e) {
    for (const t of this.GetTimeLimitTasksByGroupId(e))
      if (0 === t.Status) return !0;
    return !1;
  }
  set MilestoneRewardItemAccumulate(e) {
    (this.nx_ = e),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FishingTimeLimitRewardProgressRefresh,
      );
  }
  get MilestoneRewardItemAccumulate() {
    return this.nx_;
  }
  get MilestoneRewardItemId() {
    return this.GetActivityConfig().MilestonItemId;
  }
  sx_() {
    this.ox_.clear();
    let e = -1;
    for (const i of ConfigManager_1.ConfigManager.FishingConfig.GetAllFishingActivityMilestone()) {
      var t = new ActivityFishingDefine_1.FishingRewardProgressData(
        i.Id,
        i.ItemNum,
      );
      this.ox_.set(i.Id, t), (e = Math.max(e, i.ItemNum));
    }
    this.MilestoneRewardMaxCount = e;
  }
  RefreshMilestoneReward(e, t) {
    for (const s of Object.keys(e)) {
      var i = Number.parseInt(s),
        r = e[s],
        n = this.ox_.get(i);
      n
        ? (n.State = r)
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error("Fishing", 37, "[FishingActivity] 里程碑奖励无配置", [
            "Id",
            i,
          ]);
    }
    t &&
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.FishingTimeLimitRewardProgressRefresh,
      );
  }
  GetAllMilestoneReward() {
    return Array.from(this.ox_.values()).sort((e, t) => e.Id - t.Id);
  }
  GetAllAvailableGetMilestoneRewardIds() {
    var e,
      t,
      i = [];
    for ([e, t] of this.ox_.entries()) t.IsReceivable() && i.push(e);
    return i;
  }
  GetShopDataList() {
    var e = ModelManager_1.ModelManager.PayShopModel.GetPayShopTabData(209);
    return (
      ModelManager_1.ModelManager.PayShopModel.ReadShopItemCheckFlag(209) &&
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.FishingTimeLimitShopRefresh,
        ),
        this.RefreshActivityRedDotState()),
      e
    );
  }
  GetRecommendQuestLinkId() {
    var e = this.GetActivityConfig(),
      t = [e.RecommendQuestId, ...e.RecommendQuestLinkList];
    for (let e = t.length - 1; 0 <= e; --e) {
      var i = t[e],
        r = ModelManager_1.ModelManager.QuestNewModel.GetQuest(i),
        n = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(i),
        n = 2 === n || 1 === n;
      if (r && r.CanShowInUiPanel() && n) return i;
    }
  }
  IsRecommendQuestFinished() {
    var e = this.GetActivityConfig().RecommendQuestId;
    return ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(e);
  }
}
exports.ActivityFishingData = ActivityFishingData;
//# sourceMappingURL=ActivityFishingData.js.map
