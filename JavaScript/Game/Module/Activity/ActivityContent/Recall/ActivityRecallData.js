"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRecallData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData"),
  ActivityRecallDefine_1 = require("./ActivityRecallDefine");
class ActivityRecallData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.A1a = void 0),
      (this.R1a = new Map()),
      (this.U1a = new Map()),
      (this.x1a = new Map()),
      (this.xCa = 0);
  }
  PhraseEx(t) {
    (this.A1a = t.Vua),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ActivityRecall",
          64,
          "[回流活动]-ActivityRecallData.PhraseEx()->",
          ["收到回流活动数据, data::", this.A1a],
        ),
      this.A1a
        ? (this.A1a.kua ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "ActivityRecall",
                64,
                "[回流活动]-ActivityRecallData.PhraseEx()->",
                ["协议下发的回流活动数据没有签到数据, data:", this.A1a.kua],
              )),
          this.A1a.h$s ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "ActivityRecall",
                64,
                "[回流活动]-ActivityRecallData.PhraseEx()->",
                ["协议下发的回流活动数据没有任务数据, data:", this.A1a.h$s],
              )),
          this.A1a.Gua ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "ActivityRecall",
                64,
                "[回流活动]-ActivityRecallData.PhraseEx()->",
                [
                  "协议下发的回流活动数据没有已经领取的积分奖励, data:",
                  this.A1a.Gua,
                ],
              )),
          (this.EndOpenTimeInternal = MathUtils_1.MathUtils.LongToNumber(
            this.A1a.sps,
          )),
          (this.EndShowTimeInternal = this.EndOpenTimeInternal),
          (this.xCa = MathUtils_1.MathUtils.LongToNumber(this.A1a.gDs)),
          this.R1a.clear(),
          this.A1a.h$s.forEach((t) => {
            this.R1a.set(t.J4n, t);
          }),
          this.P1a(),
          this.w1a(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "ActivityRecall",
              64,
              "[回流活动]-ActivityRecallData.PhraseEx()->",
              ["开启状态, IsOpen:", this.IsActivityOpen()],
              ["nowOpen，服务器下发标记:", this.A1a.Fua],
              ["leftTime, 剩余开启时间:", this.GetActivityOpenTimeLeft()],
            ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ActivityRecall",
            64,
            "[回流活动]-ActivityRecallData.PhraseEx()->",
            ["协议下发的活动数据没有回流活动相关的, data:", this.A1a],
          );
  }
  GetActivityState() {
    var t = this.CheckIfInOpenTime();
    if (t && this.A1a.Fua) return 1;
    return 0;
  }
  CheckIfInOpenTime() {
    return (
      this.A1a.Fua &&
      this.CheckIfInTimeInterval(this.BeginOpenTime, this.EndOpenTime)
    );
  }
  GetActivityOpenTimeLeft() {
    var t = this.EndOpenTime;
    return Math.round(Math.max(0, t - TimeUtil_1.TimeUtil.GetServerTime()));
  }
  IsActivityOpen() {
    return 1 === this.GetActivityState();
  }
  GetSignRewardState(t) {
    switch (this.B1a(t).w6n) {
      case Protocol_1.Aki.Protocol.d$s.Proto_ActivityTaskRunning:
        return 0;
      case Protocol_1.Aki.Protocol.d$s.Proto_ActivityTaskFinish:
        return 1;
      case Protocol_1.Aki.Protocol.d$s.Proto_ActivityTaskTaken:
        return 2;
    }
    return 0;
  }
  CheckRewardState(t, e) {
    return this.GetSignRewardState(t) === e;
  }
  CheckHaveSignRewardCanGet() {
    for (const t of this.A1a.kua)
      if (t.w6n === Protocol_1.Aki.Protocol.d$s.Proto_ActivityTaskFinish)
        return !0;
    return !1;
  }
  CheckHaveTaskRewardCanGet() {
    for (const t of this.A1a.h$s)
      if (t.w6n === Protocol_1.Aki.Protocol.d$s.Proto_ActivityTaskFinish)
        return !0;
    return !1;
  }
  B1a(t) {
    var e = this.A1a.kua,
      i = e[t - 1];
    return (
      void 0 === i &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          64,
          "[回流活动]ActivityRecallData.GetSignRewardRawData()->",
          ["协议下发的数据不存在该天签到奖励, day:", t],
          ["signRewards:", e],
        ),
      i
    );
  }
  GetSignRewardEntityId(t) {
    return this.B1a(t).J4n;
  }
  GetRecallTaskProgressTuple() {
    var t = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(20),
      e =
        ConfigManager_1.ConfigManager.ActivityRecallConfig.GetAllRecallScoreRewardConfigList();
    let i = 0;
    return (
      e.forEach((t) => {
        i = Math.max(t.NeedScore, i);
      }),
      [t, i]
    );
  }
  GetTaskScorePreviewItem(t) {
    var e = t.TargetReward,
      r = ConfigManager_1.ConfigManager.RewardConfig.GetDropPackage(e);
    if (r && 0 < r.DropPreview.size) {
      r = r.DropPreview;
      let [i, a] = [0, 0];
      return (
        r.forEach((t, e) => {
          0 === i && ((i = e), (a = t));
        }),
        [i, a]
      );
    }
    return (
      Log_1.Log.CheckWarn() &&
        Log_1.Log.Warn(
          "ActivityRecall",
          64,
          "[回流活动]-ActivityRecallModel.GetTaskScore()->回流任务的积分奖励不存在",
          ["taskConfig:", t],
          ["dropId:", e],
        ),
      [void 0, 0]
    );
  }
  P1a() {
    this.U1a.clear(),
      ConfigManager_1.ConfigManager.ActivityRecallConfig.GetAllRecallScoreRewardConfigList().forEach(
        (t) => {
          this.U1a.set(t.Id, t.NeedScore);
        },
      );
  }
  GetRecallTaskProgressFloat01() {
    var [t, e] = this.GetRecallTaskProgressTuple();
    return 0 === e ? 0 : ((t = Math.min(1, t / e)), Math.trunc(100 * t) / 100);
  }
  GetRecallTaskScore() {
    var [t] = this.GetRecallTaskProgressTuple();
    return t;
  }
  b1a(t) {
    return (
      void 0 === this.R1a.get(t) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          64,
          "[回流活动]ActivityRecallData.GetRawTaskData->",
          ["获取回流任务数据失败, 服务器没下发该任务数据 taskId:", t],
        ),
      this.R1a.get(t)
    );
  }
  GetRecallTaskScoreRewardState(t) {
    return this.q1a(t.Id)
      ? 2
      : this.GetRecallTaskScore() >= t.NeedScore
        ? 1
        : 0;
  }
  IsRecallTaskScoreOverExp() {
    return 1 <= this.GetRecallTaskProgressFloat01();
  }
  q1a(t) {
    return this.A1a.Gua.includes(t);
  }
  GetRecallTaskRelativeScore(t) {
    var e = this.GetRecallTaskScore(),
      i = t.Id - 1;
    let a = 0;
    this.U1a.has(i) && (a = this.U1a.get(i) ?? 0);
    (i = this.U1a.get(t.Id)), (t = i - a);
    let r = 0;
    return [(r = e > a ? (e < i ? e - a : t) : r), t];
  }
  GetRecallTaskConfigMap() {
    return this.x1a;
  }
  w1a() {
    this.x1a.clear(),
      this.A1a.h$s.forEach((t) => {
        (t = t.J4n),
          (t =
            ConfigManager_1.ConfigManager.ActivityRecallConfig.GetRecallTaskConfigById(
              t,
            ));
        let e = t.TaskType,
          i =
            ((t.TaskType !==
              ActivityRecallDefine_1.EActivityRecallTaskType.DailyA &&
              t.TaskType !==
                ActivityRecallDefine_1.EActivityRecallTaskType.DailyB) ||
              (e = ActivityRecallDefine_1.EActivityRecallTaskType.DailyA),
            this.x1a.get(e));
        void 0 === i && ((i = []), this.x1a.set(e, i)), i.push(t);
      });
  }
  GetTaskProgressTuple(t) {
    var t = this.b1a(t),
      [t, e] = [t.iMs, t.b6n];
    return [t, e];
  }
  GetTaskRewardState(t) {
    switch (this.b1a(t).w6n) {
      case Protocol_1.Aki.Protocol.d$s.Proto_ActivityTaskRunning:
        return 0;
      case Protocol_1.Aki.Protocol.d$s.Proto_ActivityTaskFinish:
        return 1;
      case Protocol_1.Aki.Protocol.d$s.Proto_ActivityTaskTaken:
        return 2;
      default:
        return 0;
    }
  }
  GetTaskRewardShowPriority(t) {
    switch (this.b1a(t).w6n) {
      case Protocol_1.Aki.Protocol.d$s.Proto_ActivityTaskRunning:
        return 1;
      case Protocol_1.Aki.Protocol.d$s.Proto_ActivityTaskFinish:
        return 0;
      case Protocol_1.Aki.Protocol.d$s.Proto_ActivityTaskTaken:
        return 2;
      default:
        return 1;
    }
  }
  GetNextRefreshTime() {
    var t,
      e,
      i = this.xCa ?? 0;
    return 0 === i
      ? ""
      : ((t = TimeUtil_1.TimeUtil.GetServerTime()),
        (t =
          (i = Math.max(i - t, TimeUtil_1.TimeUtil.TimeDeviation)) >=
          CommonDefine_1.SECOND_PER_HOUR
            ? 2
            : 1),
        (e = i >= CommonDefine_1.SECOND_PER_HOUR ? 1 : 0),
        TimeUtil_1.TimeUtil.GetCountDownDataFormat2(i, t, e).CountDownText ??
          "");
  }
  CheckHaveScoreRewardCanGet() {
    for (const t of ConfigManager_1.ConfigManager.ActivityRecallConfig.GetAllRecallScoreRewardConfigList())
      if (1 === this.GetRecallTaskScoreRewardState(t)) return !0;
    return !1;
  }
  GetExDataRedPointShowState() {
    return (
      this.CheckHaveSignRewardCanGet() ||
      this.CheckHaveTaskRewardCanGet() ||
      this.CheckHaveScoreRewardCanGet()
    );
  }
}
exports.ActivityRecallData = ActivityRecallData;
//# sourceMappingURL=ActivityRecallData.js.map
