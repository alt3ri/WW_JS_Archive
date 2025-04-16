"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.WeeklyRogueData = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ActivityData_1 = require("../Activity/ActivityData");
class WeeklyRogueData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.Score = 0),
      (this.LastInstInfo = void 0),
      (this.AwardsInfoList = void 0),
      (this.CycleId = 0),
      (this.CycleBeginTime = 0),
      (this.CycleEndTime = 0),
      (this.WorldLevel = 0);
  }
  GetExDataRedPointShowState() {
    return this.HasScoreRewardEnable() || this.HasNewCycle();
  }
  HasNewCycle() {
    return !ModelManager_1.ModelManager.ActivityModel?.GetActivityCacheData(
      this.Id,
      this.CycleId,
      0,
      0,
      0,
    );
  }
  HasScoreRewardEnable() {
    return (
      this.AwardsInfoList?.some(
        (e) => e.zps === Protocol_1.Aki.Protocol.zps.CMs,
      ) ?? !1
    );
  }
  SetScoreRewardState(t, e) {
    var o = this.AwardsInfoList?.find((e) => e.v9n === t);
    o && (o.zps = e);
  }
  GetScoreRewardStateById(t) {
    var e = this.AwardsInfoList?.find((e) => e.v9n === t);
    return e?.zps === Protocol_1.Aki.Protocol.zps.ovs
      ? 2
      : e?.zps === Protocol_1.Aki.Protocol.zps.Z6n
        ? 0
        : 1;
  }
  GetCycleConfig() {
    return ConfigManager_1.ConfigManager.WeeklyRogueConfig.GetRogueWeeklyCycleConfig(
      this.CycleId,
    );
  }
  GetCycleRemainTime() {
    return (
      this.CycleEndTime -
      Time_1.Time.ServerTimeStamp / CommonDefine_1.MILLIONSECOND_PER_SECOND
    );
  }
  GetCycleBlackFlowerCost() {
    var e = this.GetCycleConfig();
    let o = 999,
      i = 0,
      t =
        (e.BlackFlowerCost.forEach((e, t) => {
          t < o && (o = t), t > i && (i = t);
        }),
        0);
    return (t =
      ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel < o
        ? (e.BlackFlowerCost.get(o) ?? 0)
        : ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel > i
          ? (e.BlackFlowerCost.get(i) ?? 0)
          : (e.BlackFlowerCost.get(
              ModelManager_1.ModelManager.WorldLevelModel.CurWorldLevel,
            ) ?? 0));
  }
  GetCycleCountDownData() {
    let e = this.GetCycleRemainTime();
    var t =
        (e = e <= 1 ? 1 : e) >= CommonDefine_1.SECOND_PER_DAY
          ? 3
          : e >= CommonDefine_1.SECOND_PER_HOUR
            ? 2
            : 1,
      o =
        e >= CommonDefine_1.SECOND_PER_DAY
          ? 2
          : e >= CommonDefine_1.SECOND_PER_HOUR
            ? 1
            : 0;
    return TimeUtil_1.TimeUtil.GetCountDownDataFormat2(e, t, o);
  }
  PhraseEx(e) {
    e = e.TN_;
    e
      ? (this.CycleId !== e.bN_ &&
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.WeeklyRogueCycleRefresh,
          ),
        (this.CycleId = e.bN_),
        (this.CycleBeginTime = e.RN_),
        (this.CycleEndTime = e.AN_),
        (this.LastInstInfo = e.LN_),
        (this.Score = e.SMs),
        (this.AwardsInfoList = e.wN_),
        (this.WorldLevel = e.cSs),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.WeeklyRogueRefreshScoreRedDot,
        ))
      : Log_1.Log.CheckError() &&
        Log_1.Log.Error("WeeklyRogue", 34, "WeeklyRogueData无周常数据");
  }
}
exports.WeeklyRogueData = WeeklyRogueData;
//# sourceMappingURL=WeeklyRogueData.js.map
