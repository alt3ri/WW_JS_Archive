"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityDailyAdventureData = exports.rewardStateResolver = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData"),
  ActivityDailyAdventureDefine_1 = require("./ActivityDailyAdventureDefine"),
  DAILY_TIME_FLAG =
    ((exports.rewardStateResolver = {
      [Protocol_1.Aki.Protocol.pks.Proto_DailyAdventureTaskRunning]: 1,
      [Protocol_1.Aki.Protocol.pks.Proto_DailyAdventureTaskFinish]: 0,
      [Protocol_1.Aki.Protocol.pks.Proto_DailyAdventureTaskTaken]: 2,
    }),
    1);
class ActivityDailyAdventureData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.ProgressPoint = 0),
      (this.QNe = new Map()),
      (this.XNe = new Map());
  }
  SetProgressPoint(t) {
    this.ProgressPoint = t;
    for (const e of this.QNe.values())
      e.RefreshState(2 === e.RewardState, this.ProgressPoint);
  }
  PhraseEx(t) {
    var e =
      ConfigManager_1.ConfigManager.ActivityDailyAdventureConfig.GetActivityDailyAdventureConfig(
        this.Id,
      );
    if (e) {
      this.$Ne(e.RewardList);
      var i = t.jps;
      if (i) {
        (this.ProgressPoint =
          ModelManager_1.ModelManager.InventoryModel.GetItemCountByConfigId(
            ActivityDailyAdventureDefine_1.DAILY_ADVENTURE_PT_CONFIGID,
          )),
          this.XNe.clear();
        for (const n of i._Ms) {
          var r = new ActivityDailyAdventureDefine_1.DailyAdventureTaskData();
          (r.TaskId = n.s5n),
            (r.CurrentProgress = n.lMs),
            (r.TargetProgress = n.j6n),
            (r.TaskState = exports.rewardStateResolver[n.H6n]),
            this.XNe.set(n.s5n, r),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "Activity",
                38,
                "[日常探险活动] 任务信息打印",
                ["TaskId", n.s5n],
                ["State", r.TaskState],
              );
        }
        for (const a of this.QNe.values()) {
          var o = i.uMs.includes(a.RewardId);
          a.RefreshState(o, this.ProgressPoint);
        }
      }
    } else
      Log_1.Log.CheckError() &&
        Log_1.Log.Error("Activity", 38, "[日常探险活动] 活动数据未找到", [
          "ActivityId",
          this.Id,
        ]);
  }
  $Ne(t) {
    this.QNe.clear();
    for (const r of t) {
      var e =
          ConfigManager_1.ConfigManager.ActivityDailyAdventureConfig.GetDailyAdventurePointConfig(
            r,
          ),
        i =
          (e ||
            (Log_1.Log.CheckError() &&
              Log_1.Log.Error(
                "Activity",
                38,
                "[日常探险活动] 积分奖励数据不存在",
                ["Id", r],
              )),
          new ActivityDailyAdventureDefine_1.DailyAdventureRewardData());
      (i.RewardId = r), (i.Point = e.NeedPt), this.QNe.set(r, i);
    }
  }
  GetAllPointReward() {
    return Array.from(this.QNe.values()).sort(
      (t, e) => t.RewardId - e.RewardId,
    );
  }
  GetAllTaskInfo() {
    return Array.from(this.XNe.values()).sort((t, e) =>
      t.TaskState === e.TaskState
        ? t.TaskId - e.TaskId
        : t.TaskState - e.TaskState,
    );
  }
  SetPointReward(t, e) {
    t = this.QNe.get(t);
    t && t.RefreshState(e, this.ProgressPoint);
  }
  SetTaskInfo(t, e, i) {
    t = this.XNe.get(t);
    t &&
      (void 0 !== e && (t.TaskState = e), void 0 !== i) &&
      (t.CurrentProgress = i);
  }
  GetDefaultMapMarkId() {
    var t =
      ConfigManager_1.ConfigManager.ActivityDailyAdventureConfig.GetActivityDailyAdventureConfig(
        this.Id,
      );
    return t ? t.AreaDefaultMarkId : 0;
  }
  GetExDataRedPointShowState() {
    return (
      !this.YNe() &&
      (this.IsTaskHasReward() || this.IsPointHasReward() || this.IsDailyTips())
    );
  }
  NeedSelfControlFirstRedPoint() {
    return !1;
  }
  IsTaskHasReward() {
    for (const t of this.XNe.values()) if (0 === t.TaskState) return !0;
    return !1;
  }
  IsPointHasReward() {
    for (const t of this.QNe.values()) if (0 === t.RewardState) return !0;
    return !1;
  }
  IsDailyTips() {
    return (
      TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp() !==
      ModelManager_1.ModelManager.ActivityModel.GetActivityCacheData(
        this.Id,
        0,
        DAILY_TIME_FLAG,
        0,
        0,
      )
    );
  }
  ReadDailyTips() {
    var t = TimeUtil_1.TimeUtil.GetCurrentCrossDayStamp();
    ModelManager_1.ModelManager.ActivityModel.SaveActivityData(
      this.Id,
      DAILY_TIME_FLAG,
      0,
      0,
      t,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      );
  }
  YNe() {
    let t = !0;
    for (const e of this.QNe.values()) 2 !== e.RewardState && (t = !1);
    return t;
  }
}
exports.ActivityDailyAdventureData = ActivityDailyAdventureData;
//# sourceMappingURL=ActivityDailyAdventureData.js.map
