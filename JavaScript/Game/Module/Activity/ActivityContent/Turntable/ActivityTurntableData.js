"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityTurntableData = void 0);
const Log_1 = require("../../../../../Core/Common/Log");
const EventDefine_1 = require("../../../../Common/Event/EventDefine");
const EventSystem_1 = require("../../../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../../../Common/TimeUtil");
const ConfigManager_1 = require("../../../../Manager/ConfigManager");
const ModelManager_1 = require("../../../../Manager/ModelManager");
const ActivityData_1 = require("../../ActivityData");
class ActivityTurntableData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.QuestStateMap = new Map()),
      (this.QuestList = []),
      (this.AllRewardInfo = new Map()),
      (this.RoundRewardIdMap = new Map()),
      (this.RoundIdList = []),
      (this.TurntableCostConfigId = 0),
      (this.TurntableCostCount = 0),
      (this.WIn = []),
      (this.OnCommonItemCountAnyChange = (t, e) => {
        t === this.TurntableCostConfigId &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            this.Id,
          );
      }),
      (this.ENe = (t, e) => {
        const i = t.IsSpecial ? 1 : 0;
        const s = e.IsSpecial ? 1 : 0;
        return i == s ? t.Id - e.Id : s - i;
      });
  }
  PhraseEx(t) {
    (this.QuestList.length = 0), this.QuestStateMap.clear();
    const e =
      ConfigManager_1.ConfigManager.ActivityTurntableConfig.GetTurntableActivityByActivityId(
        this.Id,
      );
    for (let t = 0; t < e.length; t++) {
      this.QuestList.push(e[t].CoinQuestId);
      const i = {
        QuestState: ModelManager_1.ModelManager.QuestNewModel.GetQuestState(
          e[t].CoinQuestId,
        ),
        QuestUnlockStamp: this.TNe(this.BeginOpenTime, t),
      };
      this.QuestStateMap.set(e[t].CoinQuestId, i);
    }
    let s =
      ConfigManager_1.ConfigManager.ActivityTurntableConfig.GetTurntableInfoByActivityId(
        this.Id,
      );
    if (s) {
      (this.TurntableCostConfigId = s.CostItemId),
        (this.TurntableCostCount = s.CostItemCount),
        this.AllRewardInfo.clear(),
        this.RoundRewardIdMap.clear(),
        (this.RoundIdList.length = 0);
      (s =
        ConfigManager_1.ConfigManager.ActivityTurntableConfig.GetTurntableAwardsByActivityId(
          this.Id,
        )),
        (t = t.I0s);
      if (t) {
        let r;
        let n;
        const a = t.q0s;
        const h = t.G0s;
        const o = t.O0s;
        const u = new Map();
        for (const M of s) {
          var f;
          var v;
          const _ = [];
          for ([f, v] of M.RewardItem) {
            const l = [{ IncId: 0, ItemId: f }, v];
            _.push(l);
          }
          if (_.length !== 1)
            Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "Activity",
                38,
                "[转盘活动] 转盘奖项配置物品数量错误",
                ["Id", M.Id],
              );
          else {
            let t = !1;
            (a || M.GroupId < h || o.includes(M.Id)) && (t = !0);
            const c = {
              Id: M.Id,
              RoundId: M.GroupId,
              IsClaimed: t,
              RewardItem: _[0],
              IsSpecial: M.IsSpecial,
            };
            this.AllRewardInfo.set(M.Id, c);
            let e = u.get(c.RoundId);
            (e = e || []).push(c), u.set(c.RoundId, e);
          }
        }
        for ([r, n] of u.entries()) {
          n.sort(this.ENe);
          const d = [];
          for (const g of n) d.push(g.Id);
          this.RoundRewardIdMap.set(r, d), this.RoundIdList.push(r);
        }
        this.RoundIdList.sort((t, e) => t - e);
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Activity", 38, "[转盘活动] 未找到对应TurntableInfo", [
          "ActivityId",
          this.Id,
        ]);
  }
  GetExDataRedPointShowState() {
    return (
      this.IsHasPreQuestRedDot() ||
      this.IsHasNewQuestRedDot() ||
      this.IsHasRewardRedDot()
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
    let s;
    const r = this.QuestStateMap.get(t);
    r &&
      ((s = ModelManager_1.ModelManager.QuestNewModel.GetQuestState(t)),
      (r.QuestState = s),
      this.QuestStateMap.set(t, r),
      ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
        this.Id,
        t,
        0,
        0,
        s === 2 ? 1 : 0,
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
    let t;
    this.IsActivityUnFinished() &&
      ((t = this.GetCurrentQuestIndex()),
      (t = this.QuestList[t]),
      this.QuestStateMap.get(t).QuestState === 2 &&
        ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
          this.Id,
          t,
          0,
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
          return t > 0 ? t - 1 : t;
        case 2:
          return t;
      }
    return this.QuestList.length - 1;
  }
  IsHasNewQuestRedDot() {
    if (this.IsActivityUnFinished() && this.GetPreGuideQuestFinishState())
      for (const t of this.QuestList)
        if (
          ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
            this.Id,
            0,
            t,
            0,
            0,
          )
        )
          return !0;
    return !1;
  }
  GetCurrentQuestProgress() {
    let i = 0;
    return (
      this.QuestStateMap.forEach((t, e) => {
        t.QuestState === 3 && i++;
      }),
      i
    );
  }
  TNe(t, e) {
    (t = new Date(t * TimeUtil_1.TimeUtil.InverseMillisecond)),
      t.setHours(TimeUtil_1.TimeUtil.CrossDayHour),
      (t = t.getTime() * TimeUtil_1.TimeUtil.Millisecond);
    return t + e * TimeUtil_1.TimeUtil.OneDaySeconds;
  }
  SavePreQuestRedDot(t) {
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
  IsHasPreQuestRedDot() {
    return (
      !this.GetPreGuideQuestFinishState() &&
      ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
        this.Id,
        0,
        this.GetUnFinishPreGuideQuestId(),
        0,
        0,
      ) === 0
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
    this.WIn = e;
  }
  GetRunResult() {
    return this.WIn;
  }
}
exports.ActivityTurntableData = ActivityTurntableData;
// # sourceMappingURL=ActivityTurntableData.js.map
