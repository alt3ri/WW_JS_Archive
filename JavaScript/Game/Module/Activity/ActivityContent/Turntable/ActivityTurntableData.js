"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityTurntableData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityCommonDefine_1 = require("../../ActivityCommonDefine"),
  ActivityData_1 = require("../../ActivityData");
class ActivityTurntableData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.QuestStateMap = new Map()),
      (this.QuestList = []),
      (this.DailyTaskInfo = new Map()),
      (this.AllRewardInfo = new Map()),
      (this.RoundRewardIdMap = new Map()),
      (this.RoundIdList = []),
      (this.TurntableCostConfigId = 0),
      (this.TurntableCostCount = 0),
      (this._Ln = []),
      (this.TurntableType = 1),
      (this.OnCommonItemCountAnyChange = (t, e) => {
        t === this.TurntableCostConfigId &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            this.Id,
          );
      }),
      (this.SNe = (t, e) => {
        var i = t.IsSpecial ? 1 : 0,
          s = e.IsSpecial ? 1 : 0;
        return i == s ? t.Id - e.Id : s - i;
      }),
      (this.eLl = (t, e) => {
        var i =
            ConfigManager_1.ConfigManager.ActivityTurntableConfig.GetTurntableTaskByTaskId(
              t.Id,
            ),
          s =
            ConfigManager_1.ConfigManager.ActivityTurntableConfig.GetTurntableTaskByTaskId(
              e.Id,
            );
        return i.TaskSort === s.TaskSort
          ? t.Id - e.Id
          : i.TaskSort - s.TaskSort;
      });
  }
  PhraseEx(t) {
    var e =
      ConfigManager_1.ConfigManager.ActivityTurntableConfig.GetTurntableInfoByActivityId(
        this.Id,
      );
    if (e) {
      (this.TurntableCostConfigId = e.CostItemId),
        (this.TurntableCostCount = e.CostItemCount),
        (this.TurntableType = e.TurntableType);
      e = t.Qps;
      if (e) {
        if (
          ((this.QuestList.length = 0),
          this.QuestStateMap.clear(),
          this.DailyTaskInfo.clear(),
          1 === this.TurntableType)
        ) {
          var i =
            ConfigManager_1.ConfigManager.ActivityTurntableConfig.GetTurntableActivityByActivityId(
              this.Id,
            );
          for (let t = 0; t < i.length; t++) {
            this.QuestList.push(i[t].CoinQuestId);
            var s = {
              QuestState:
                ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
                  i[t].CoinQuestId,
                ),
              QuestUnlockStamp: this.TNe(this.BeginOpenTime, t),
            };
            this.QuestStateMap.set(i[t].CoinQuestId, s);
          }
        } else if (2 === this.TurntableType && e.JS_)
          for (const c of e.JS_) this.RefreshTask(c, !0);
        this.AllRewardInfo.clear(),
          this.RoundRewardIdMap.clear(),
          (this.RoundIdList.length = 0);
        var r,
          n,
          t =
            ConfigManager_1.ConfigManager.ActivityTurntableConfig.GetTurntableAwardsByActivityId(
              this.Id,
            ),
          a = e.sMs,
          h = e.aMs,
          o = e.hMs,
          u = new Map();
        for (const g of t) {
          var f,
            _,
            l = [];
          for ([f, _] of g.RewardItem) {
            var v = [{ IncId: 0, ItemId: f }, _];
            l.push(v);
          }
          if (1 !== l.length)
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Activity",
                37,
                "[转盘活动] 转盘奖项配置物品数量错误",
                ["Id", g.Id],
              );
          else {
            let t = !1;
            (a || g.GroupId < h || o.includes(g.Id)) && (t = !0);
            var d = {
              Id: g.Id,
              RoundId: g.GroupId,
              IsClaimed: t,
              RewardItem: l[0],
              IsSpecial: g.IsSpecial,
            };
            this.AllRewardInfo.set(g.Id, d);
            let e = u.get(d.RoundId);
            (e = e || []).push(d), u.set(d.RoundId, e);
          }
        }
        for ([r, n] of u.entries()) {
          n.sort(this.SNe);
          var M = [];
          for (const m of n) M.push(m.Id);
          this.RoundRewardIdMap.set(r, M), this.RoundIdList.push(r);
        }
        this.RoundIdList.sort((t, e) => t - e);
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Activity", 37, "[转盘活动] 未找到对应TurntableInfo", [
          "ActivityId",
          this.Id,
        ]);
  }
  GetExDataRedPointShowState() {
    return (
      !!this.IsActivityUnFinished() &&
      (!!this.IsHasPreQuestRedDot() ||
        !!this.IsHasRewardRedDot() ||
        !!this.IsHasUnlockRedDot() ||
        this.IsHasDailyRedDot() ||
        this.IsHasNewQuestRedDot())
    );
  }
  GetActivityCurrencyCount() {
    return ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
      this.TurntableCostConfigId,
    );
  }
  OnQuestStateChange(t, e) {
    let i = !1;
    this.LocalConfig.PreShowGuideQuest.includes(t) && (i = !0);
    var s,
      r = this.QuestStateMap.get(t);
    r &&
      ((s = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t)),
      (r.QuestState = s),
      this.QuestStateMap.set(t, r),
      ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
        this.Id,
        1,
        t,
        0,
        2 === s ? 1 : 0,
      ),
      (i = !0)),
      i &&
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.RefreshCommonActivityRedDot,
          this.Id,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.ActivityViewRefreshCurrent,
          this.Id,
        ));
  }
  ReadCurrentUnlockQuest() {
    var t;
    this.IsActivityUnFinished() &&
      ((t = this.GetCurrentQuestIndex()),
      (t = this.QuestList[t]),
      2 === this.QuestStateMap.get(t).QuestState &&
        ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
          this.Id,
          1,
          t,
          0,
          0,
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      ));
  }
  GetCurrentQuestIndex() {
    for (let t = 0; t < this.QuestList.length; t++)
      switch (this.QuestStateMap.get(this.QuestList[t]).QuestState) {
        case 0:
        case 1:
          return 0 < t ? t - 1 : t;
        case 2:
          return t;
      }
    return this.QuestList.length - 1;
  }
  IsHasNewQuestRedDot() {
    if (
      1 === this.TurntableType &&
      this.IsActivityUnFinished() &&
      this.GetPreGuideQuestFinishState()
    )
      for (const e of this.QuestList) {
        var t = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(e);
        if (2 === t)
          if (
            ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
              this.Id,
              0,
              1,
              e,
              0,
            )
          )
            return !0;
      }
    return !1;
  }
  GetCurrentQuestProgress() {
    let i = 0;
    return (
      this.QuestStateMap.forEach((t, e) => {
        3 === t.QuestState && i++;
      }),
      i
    );
  }
  TNe(t, e) {
    (t = new Date(t * TimeUtil_1.TimeUtil.InverseMillisecond)),
      t.getHours() < TimeUtil_1.TimeUtil.CrossDayHour &&
        t.setDate(t.getDate() - 1),
      t.setHours(TimeUtil_1.TimeUtil.CrossDayHour, 0, 0, 0),
      (t = t.getTime() * TimeUtil_1.TimeUtil.Millisecond);
    return t + e * TimeUtil_1.TimeUtil.OneDaySeconds;
  }
  SavePreQuestRedDot(t) {
    this.IsHasPreQuestRedDot() &&
      (ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
        this.Id,
        1,
        t,
        0,
        1,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      ));
  }
  IsHasPreQuestRedDot() {
    return (
      !this.GetPreGuideQuestFinishState() &&
      0 ===
        ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
          this.Id,
          0,
          1,
          this.GetUnFinishPreGuideQuestId(),
          0,
        )
    );
  }
  IsActivityUnFinished() {
    for (const t of this.AllRewardInfo.values()) if (!t.IsClaimed) return !0;
    return !1;
  }
  IsRoundUnFinished(t) {
    t = this.RoundRewardIdMap.get(t);
    if (t)
      for (const e of t) if (!this.AllRewardInfo.get(e).IsClaimed) return !0;
    return !1;
  }
  IsHasRewardRedDot() {
    return !!(
      this.GetActivityCurrencyCount() >= this.TurntableCostCount &&
      this.IsActivityUnFinished()
    );
  }
  GetCurrentRoundId() {
    for (const t of this.RoundIdList) if (this.IsRoundUnFinished(t)) return t;
    return this.RoundIdList.at(-1) ?? 0;
  }
  IsRewardSpecial(t) {
    return this.AllRewardInfo.get(t)?.IsSpecial ?? !1;
  }
  SetRunResult(t, e) {
    const i = this.AllRewardInfo.get(t);
    if (((i.IsClaimed = !0), i.IsSpecial))
      for (const s of this.RoundRewardIdMap.get(i.RoundId)) {
        const i = this.AllRewardInfo.get(s);
        i.IsClaimed = !0;
      }
    this._Ln = e;
  }
  GetRunResult() {
    return this._Ln;
  }
  RefreshTask(t, e) {
    let i = this.DailyTaskInfo.get(t.s5n);
    if (!i) {
      if (!e) return;
      (i = new ActivityCommonDefine_1.ActivityTaskData()),
        this.DailyTaskInfo.set(t.s5n, i);
    }
    i.Refresh(t);
  }
  GetAllTurntableDailyQuestData() {
    return Array.from(this.DailyTaskInfo.values()).sort(this.eLl);
  }
  IsHasDailyRedDot() {
    return (
      2 === this.TurntableType &&
      !!this.GetPreGuideQuestFinishState() &&
      TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp() !==
        ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
          this.Id,
          0,
          3,
          0,
          0,
        )
    );
  }
  SaveDailyRedDot() {
    var t;
    this.IsHasDailyRedDot() &&
      ((t = TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp()),
      ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
        this.Id,
        3,
        0,
        0,
        t,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      ));
  }
  SaveUnlockRedDot() {
    this.IsHasUnlockRedDot() &&
      (ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
        this.Id,
        2,
        0,
        0,
        1,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      ));
  }
  IsHasUnlockRedDot() {
    return (
      0 ===
      ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
        this.Id,
        0,
        2,
        0,
        0,
      )
    );
  }
}
exports.ActivityTurntableData = ActivityTurntableData;
//# sourceMappingURL=ActivityTurntableData.js.map
