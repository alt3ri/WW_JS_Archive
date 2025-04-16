"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityMapTravelData = void 0);
const EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityCommonDefine_1 = require("../../ActivityCommonDefine"),
  ActivityData_1 = require("../../ActivityData"),
  ActivityMapTravelDefine_1 = require("./ActivityMapTravelDefine");
class ActivityMapTravelData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.TravelLevelData = new Map()),
      (this.TravelLevel = 0),
      (this.tVl = 0),
      (this.iVl = 0),
      (this.rVl = 0),
      (this.AreaDataMap = new Map()),
      (this.AreaTaskMap = new Map()),
      (this.TaskFinalRewardData = void 0),
      (this.PhantomQuestIds = new Set()),
      (this.SortPhantomQuestItem = (t, e) => {
        var r =
            ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(
              t,
            ),
          a =
            ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(
              e,
            );
        return r.Sort === a.Sort ? t - e : r.Sort - a.Sort;
      }),
      (this.PhantomDataMap = new Map()),
      (this.SoarChallengeRewardDataMap = new Map()),
      (this.SoarChallengePlayDataMap = new Map()),
      (this.CheckSoarItemRedDot = (t) => {
        for (const e of t)
          if (0 === this.SoarChallengeRewardDataMap.get(e).Status) return !0;
        return !1;
      }),
      (this.CheckSoarItemFinished = (t) => {
        for (const e of t)
          if (2 !== this.SoarChallengeRewardDataMap.get(e).Status) return !1;
        return !0;
      });
  }
  OnInit(t) {
    this.oVl(), this.nVl(), this.sVl(), this.aVl(), this.hVl();
    t = t.KS_;
    t &&
      ((this.TravelLevel = t.fE_),
      (this.tVl = t.fE_),
      (this.rVl = this.GetCurrentExp()),
      (this.iVl = this.GetExpItemCount()));
  }
  PhraseEx(t) {
    t = t.KS_;
    t && this.RefreshMapTravelData(t);
  }
  RefreshMapTravelData(t) {
    this.TravelLevel = t.fE_;
    for (const e of t.CE_) this.UnlockAreaData(e);
    for (const r of t.E$s) this.RefreshTravelTaskData(r);
    this.TaskFinalRewardData.IsReceived = t.mE_;
    for (const a of t.dE_) this.UnlockPhantom(a);
    for (const i of t.gE_) this.RefreshSoarChallengePlayData(i);
  }
  GetExDataRedPointShowState() {
    return (
      !!this.CanTravelLevelUp() ||
      !!this.GetTaskRedDotState(!0) ||
      !!this.GetAllSoarItemRedDot()
    );
  }
  SaveFirstCheckRedDotState(t, e = 0) {
    return (
      1 ===
        ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
          this.Id,
          0,
          t,
          e,
          0,
        ) ||
      (ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
        this.Id,
        t,
        e,
        0,
        1,
      ),
      this.RefreshActivityRedDotState(),
      !1)
    );
  }
  GetTypeProgress(t) {
    let [e, r] = [0, 1];
    switch (t) {
      case 1:
        (e = this.GetFinishedAreaTaskCount()), (r = this.AreaTaskMap.size);
        break;
      case 2:
        [e, r] = this.GetPhantomQuestCount();
        break;
      case 3:
        for (const a of this.PhantomDataMap.values()) a && e++;
        r = this.PhantomDataMap.size;
        break;
      case 4:
        for (const i of this.SoarChallengeRewardDataMap.values())
          2 === i.Status && e++;
        r = this.SoarChallengeRewardDataMap.size;
    }
    return [e, r];
  }
  GetTypeRedDotState(t) {
    switch (t) {
      case 1:
        return this.GetTaskRedDotState(!1);
      case 4:
        return this.GetAllSoarItemRedDot();
    }
    return !1;
  }
  GetTypeNewState(t) {
    switch (t) {
      case 1:
        return this.GetAllAreaNewUnlockState();
      case 2:
        return this.GetAllPhantomQuestNewState();
      case 3:
        return this.GetAllPhantomNewUnlockState();
      case 4:
        return this.RefreshAndGetAllSoarItemNewUnlock();
    }
    return !1;
  }
  RefreshActivityRedDotState() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.RefreshCommonActivityRedDot,
      this.Id,
    );
  }
  GetActivityConfig() {
    return ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetActivityConfig(
      this.Id,
    );
  }
  lVl() {
    return (t, e) =>
      t.Status === e.Status ? t.Id - e.Id : t.Status - e.Status;
  }
  get LastTravelLevel() {
    var t = this.tVl;
    return (this.tVl = this.TravelLevel), t;
  }
  get LastCurrentExpCount() {
    var t = this.rVl;
    return (this.rVl = this.GetCurrentExp()), t;
  }
  get LastExpCount() {
    var t = this.iVl;
    return (this.iVl = this.GetExpItemCount()), t;
  }
  get MaxTravelLevel() {
    return this.GetActivityConfig().MaxLevel;
  }
  oVl() {
    this.TravelLevelData.clear();
    let t = 0;
    for (const r of ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAllLevelExpConfig(
      this.Id,
    )) {
      var e = {
        Id: r.Id,
        Level: r.Level,
        AccumulateExp: t,
        TargetExp: r.NeedExp,
      };
      this.TravelLevelData.set(r.Level, e), (t += r.NeedExp);
    }
  }
  GetExpItemCount() {
    var t = this.GetActivityConfig().ExpItemId;
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(t);
  }
  GetCurrentExp() {
    return (
      this.GetExpItemCount() -
      this.TravelLevelData.get(this.TravelLevel).AccumulateExp
    );
  }
  GetCurrentTargetExp() {
    var t = this.MaxTravelLevel === this.TravelLevel,
      e = this.TravelLevelData.get(this.TravelLevel);
    return t ? e.AccumulateExp : e.TargetExp;
  }
  CanTravelLevelUp() {
    var t, e;
    return (
      this.MaxTravelLevel !== this.TravelLevel &&
      ((t = this.GetExpItemCount()),
      (e = this.TravelLevelData.get(this.TravelLevel)).AccumulateExp +
        e.TargetExp <=
        t)
    );
  }
  nVl() {
    this.AreaDataMap.clear(),
      (this.TaskFinalRewardData =
        new ActivityMapTravelDefine_1.FinalTravelTaskData());
    var t =
        ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAllTravelTaskConfig(
          this.Id,
        ),
      t =
        ((this.TaskFinalRewardData.Target = t.length),
        ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAllAreaConfig(
          this.Id,
        ));
    for (const r of t) {
      var e = new ActivityMapTravelDefine_1.MapTravelAreaData(r.Id);
      this.AreaDataMap.set(r.Id, e);
    }
  }
  UnlockAreaData(t) {
    t = this.AreaDataMap.get(t);
    t && (t.IsUnlock = !0);
  }
  GetAllAreaData() {
    return Array.from(this.AreaDataMap.values()).sort((t, e) => {
      var r =
          ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAreaConfig(
            t.AreaId,
          ),
        a = ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAreaConfig(
          e.AreaId,
        );
      return r.Sort === a.Sort ? t.AreaId - e.AreaId : r.Sort - a.Sort;
    });
  }
  GetAllAreaNewUnlockState() {
    for (const t of this.AreaDataMap.keys())
      if (this.GetAreaNewUnlockState(t)) return !0;
    return !1;
  }
  RefreshTravelTaskData(a) {
    let t = this.AreaTaskMap.get(a.s5n);
    var e;
    t ||
      ((t = new ActivityCommonDefine_1.ActivityTaskData()),
      (e =
        ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetTravelTaskConfig(
          a.s5n,
        )),
      this.AreaDataMap.get(e.AreaId).TravelTaskIdSet.add(a.s5n),
      this.AreaTaskMap.set(a.s5n, t)),
      t.Refresh(a, (t, e, r) => {
        t && 2 === r && this.TaskFinalRewardData.FinishedIdSet.add(a.s5n);
      });
  }
  SetTravelTaskDataDone(t) {
    (this.AreaTaskMap.get(t).Status = 2),
      this.TaskFinalRewardData.FinishedIdSet.add(t);
  }
  IsAreaTaskFinish(t) {
    for (const e of this.AreaDataMap.get(t).TravelTaskIdSet)
      if (2 !== this.AreaTaskMap.get(e).Status) return !1;
    return !0;
  }
  GetFinishedAreaTaskCount() {
    let t = 0;
    for (const e of this.AreaTaskMap.values()) 2 === e.Status && t++;
    return t;
  }
  GetAreaTaskDataList(t) {
    var e = [];
    for (const a of this.AreaDataMap.get(t).TravelTaskIdSet) {
      var r = this.AreaTaskMap.get(a);
      e.push(r);
    }
    return e.sort(this.lVl()), e;
  }
  GetAreaNewUnlockState(t) {
    var e = this.AreaDataMap.get(t).IsUnlock,
      r = 0 < this.AreaDataMap.get(t).TravelTaskIdSet.size,
      a = this.IsAreaTaskFinish(t);
    return (
      !(!e || a || !r) &&
      0 ===
        ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
          this.Id,
          0,
          5,
          t,
          0,
        )
    );
  }
  GetAreaRewardState(t) {
    t = this.AreaDataMap.get(t);
    if (t.IsUnlock)
      for (const e of t.TravelTaskIdSet)
        if (0 === this.AreaTaskMap.get(e).Status) return !0;
    return !1;
  }
  GetTaskRedDotState(t = !1) {
    if (this.TaskFinalRewardData && this.TaskFinalRewardData.CanReceive())
      return !0;
    for (const e of this.AreaDataMap.keys()) {
      if (t && this.GetAreaNewUnlockState(e)) return !0;
      if (this.GetAreaRewardState(e)) return !0;
    }
    return !1;
  }
  sVl() {
    for (const t of ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAllQuestConfig(
      this.Id,
    ))
      this.AreaDataMap.get(t.AreaId).PhantomTaskIdSet.add(t.Id),
        this.PhantomQuestIds.add(t.Id);
  }
  GetPhantomQuestCount() {
    var t =
      ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAllQuestConfig(
        this.Id,
      );
    let e = 0;
    for (const r of t)
      3 ===
        ModelManager_1.ModelManager.QuestNewModel.GetQuestState(r.QuestId) &&
        e++;
    return [e, t.length];
  }
  GetAllPhantomQuestNewState() {
    for (const t of ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAllQuestConfig(
      this.Id,
    ))
      if (
        this.GetPhantomQuestNewState(t.Id) ||
        this.GetPhantomQuestNewUnlockState(t.Id) ||
        this.GetPhantomQuestDoneCheckState(t.Id)
      )
        return !0;
    return !1;
  }
  GetPhantomQuestNewState(t) {
    var e =
        ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(
          t,
        ).QuestId,
      e = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e);
    return (
      (1 === e || 2 === e) &&
      0 ===
        ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
          this.Id,
          0,
          2,
          t,
          0,
        )
    );
  }
  GetPhantomQuestDoneCheckState(t) {
    var e =
      ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(
        t,
      ).QuestId;
    return (
      3 === ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) &&
      0 ===
        ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
          this.Id,
          0,
          3,
          t,
          0,
        )
    );
  }
  GetPhantomQuestNewUnlockState(t) {
    var e =
      ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetQuestConfig(
        t,
      ).QuestId;
    return (
      0 !== ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e) &&
      0 ===
        ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
          this.Id,
          0,
          6,
          t,
          0,
        )
    );
  }
  aVl() {
    this.PhantomDataMap.clear();
    for (const t of ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAllPhantomConfig(
      this.Id,
    ))
      this.PhantomDataMap.set(t.Id, !1);
  }
  UnlockPhantom(t) {
    this.PhantomDataMap.set(t, !0);
  }
  GetAllPhantomNewUnlockState() {
    for (var [t, e] of this.PhantomDataMap.entries())
      if (
        e &&
        0 ===
          ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
            this.Id,
            0,
            4,
            t,
            0,
          )
      )
        return !0;
    return !1;
  }
  GetPhantomNewUnlockState(t) {
    return (
      0 ===
      ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
        this.Id,
        0,
        4,
        t,
        0,
      )
    );
  }
  hVl() {
    this.SoarChallengeRewardDataMap.clear();
    let e = 0;
    for (const a of ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetAllSoarChallengeConfig()) {
      var r = new ActivityCommonDefine_1.ActivityTaskData();
      (r.Id = a.Id),
        (r.Target = a.NeedScore),
        this.SoarChallengeRewardDataMap.set(a.Id, r);
      let t = this.SoarChallengePlayDataMap.get(a.LevelPlayId);
      t ||
        (((t = new ActivityMapTravelDefine_1.SoarChallengePlayData()).TabIndex =
          e),
        (t.PlayId = a.LevelPlayId),
        (t.NameTextId = a.Name),
        (t.CheckRedDot = this.CheckSoarItemRedDot),
        (t.CheckFinished = this.CheckSoarItemFinished),
        (t.JumpId = a.JumpId),
        this.SoarChallengePlayDataMap.set(a.LevelPlayId, t),
        e++),
        t.RewardIds.push(a.Id);
    }
  }
  RefreshSoarChallengePlayData(t) {
    var e = this.SoarChallengePlayDataMap.get(t.pE_);
    if (e) {
      e.HighestPoint = t.vE_;
      for (const a of e.RewardIds) {
        var r = this.SoarChallengeRewardDataMap.get(a);
        (r.Current = e.HighestPoint),
          t.yE_.includes(a)
            ? (r.Status = 2)
            : r.Current >= r.Target
              ? (r.Status = 0)
              : (r.Status = 1);
      }
    }
  }
  SetSoarChallengeRewardDone(t) {
    this.SoarChallengeRewardDataMap.get(t).Status = 2;
  }
  RefreshSoarChallengeUnlockState(t) {
    var e = this.SoarChallengePlayDataMap.get(t),
      r =
        ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetSoarChallengeConfig(
          e.RewardIds[0],
        );
    (e.IsNew = !1),
      this.TravelLevel < r.UnlockTravelLevel ||
        (0 !== r.UnlockQuestId
          ? ((r = ModelManager_1.ModelManager.QuestNewModel.CheckQuestFinished(
              r.UnlockQuestId,
            )),
            (e.IsUnlock = r))
          : (e.IsUnlock = !0),
        (e.IsNew = this.GetSoarItemNewUnlockState(t)));
  }
  GetSoarPlayLockTips(t) {
    t = this.SoarChallengePlayDataMap.get(t);
    return ConfigManager_1.ConfigManager.ActivityMapTravelConfig.GetSoarChallengeConfig(
      t.RewardIds[0],
    ).LockTips;
  }
  GetAllSoarTabData() {
    return Array.from(this.SoarChallengePlayDataMap.values());
  }
  GetSoarItemDataList(t) {
    var e = [];
    for (const a of t) {
      var r = this.SoarChallengeRewardDataMap.get(a);
      e.push(r);
    }
    return e.sort(this.lVl()), e;
  }
  GetAllSoarItemRedDot() {
    for (const t of this.SoarChallengeRewardDataMap.values())
      if (0 === t.Status) return !0;
    return !1;
  }
  RefreshAndGetAllSoarItemNewUnlock() {
    let t = !1;
    for (const e of this.SoarChallengePlayDataMap.keys())
      this.RefreshSoarChallengeUnlockState(e),
        !t && this.GetSoarItemNewUnlockState(e) && (t = !0);
    return t;
  }
  GetSoarItemNewUnlockState(t) {
    t = this.SoarChallengePlayDataMap.get(t);
    return !(
      !t.IsUnlock ||
      0 !==
        ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
          this.Id,
          0,
          7,
          t.PlayId,
          0,
        )
    );
  }
}
exports.ActivityMapTravelData = ActivityMapTravelData;
//# sourceMappingURL=ActivityMapTravelData.js.map
