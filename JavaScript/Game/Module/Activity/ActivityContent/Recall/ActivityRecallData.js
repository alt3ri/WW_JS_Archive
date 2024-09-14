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
      (this.Gca = void 0),
      (this.Nca = new Map()),
      (this.Fca = new Map()),
      (this.Vca = new Map()),
      (this.Rfa = 0);
  }
  PhraseEx(t) {
    (this.Gca = t.Pca),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ActivityRecall",
          64,
          "[回流活动]-ActivityRecallData.PhraseEx()->",
          ["收到回流活动数据, data::", this.Gca],
        ),
      this.Gca
        ? (this.Gca.Dca ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "ActivityRecall",
                64,
                "[回流活动]-ActivityRecallData.PhraseEx()->",
                ["协议下发的回流活动数据没有签到数据, data:", this.Gca.Dca],
              )),
          this.Gca.E$s ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "ActivityRecall",
                64,
                "[回流活动]-ActivityRecallData.PhraseEx()->",
                ["协议下发的回流活动数据没有任务数据, data:", this.Gca.E$s],
              )),
          this.Gca.Aca ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "ActivityRecall",
                64,
                "[回流活动]-ActivityRecallData.PhraseEx()->",
                [
                  "协议下发的回流活动数据没有已经领取的积分奖励, data:",
                  this.Gca.Aca,
                ],
              )),
          (this.EndOpenTimeInternal = MathUtils_1.MathUtils.LongToNumber(
            this.Gca.dps,
          )),
          (this.EndShowTimeInternal = this.EndOpenTimeInternal),
          (this.Rfa = MathUtils_1.MathUtils.LongToNumber(this.Gca.yDs)),
          this.Nca.clear(),
          this.Gca.E$s.forEach((t) => {
            this.Nca.set(t.s5n, t);
          }),
          this.$ca(),
          this.Hca(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "ActivityRecall",
              64,
              "[回流活动]-ActivityRecallData.PhraseEx()->",
              ["开启状态, IsOpen:", this.IsActivityOpen()],
              ["nowOpen，服务器下发标记:", this.Gca.wca],
              ["leftTime, 剩余开启时间:", this.GetActivityOpenTimeLeft()],
            ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ActivityRecall",
            64,
            "[回流活动]-ActivityRecallData.PhraseEx()->",
            ["协议下发的活动数据没有回流活动相关的, data:", this.Gca],
          );
  }
  GetActivityState() {
    var t = this.CheckIfInOpenTime();
    if (t && this.Gca.wca) return 1;
    return 0;
  }
  CheckIfInOpenTime() {
    return (
      this.Gca.wca &&
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
    switch (this.jca(t).H6n) {
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning:
        return 0;
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish:
        return 1;
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken:
        return 2;
    }
    return 0;
  }
  CheckRewardState(t, e) {
    return this.GetSignRewardState(t) === e;
  }
  CheckHaveSignRewardCanGet() {
    for (const t of this.Gca.Dca)
      if (t.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish)
        return !0;
    return !1;
  }
  CheckHaveTaskRewardCanGet() {
    var t = this.GetRecallTaskProgressFloat01();
    if (!(1 <= t))
      for (const e of this.Gca.E$s)
        if (e.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish)
          return !0;
    return !1;
  }
  jca(t) {
    var e = this.Gca.Dca,
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
    return this.jca(t).s5n;
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
  $ca() {
    this.Fca.clear(),
      ConfigManager_1.ConfigManager.ActivityRecallConfig.GetAllRecallScoreRewardConfigList().forEach(
        (t) => {
          this.Fca.set(t.Id, t.NeedScore);
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
  Wca(t) {
    return (
      void 0 === this.Nca.get(t) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          64,
          "[回流活动]ActivityRecallData.GetRawTaskData->",
          ["获取回流任务数据失败, 服务器没下发该任务数据 taskId:", t],
        ),
      this.Nca.get(t)
    );
  }
  GetRecallTaskScoreRewardState(t) {
    return this.Qca(t.Id)
      ? 2
      : this.GetRecallTaskScore() >= t.NeedScore
        ? 1
        : 0;
  }
  IsRecallTaskScoreOverExp() {
    return 1 <= this.GetRecallTaskProgressFloat01();
  }
  Qca(t) {
    return this.Gca.Aca.includes(t);
  }
  GetRecallTaskRelativeScore(t) {
    var e = this.GetRecallTaskScore(),
      i = t.Id - 1;
    let a = 0;
    this.Fca.has(i) && (a = this.Fca.get(i) ?? 0);
    (i = this.Fca.get(t.Id)), (t = i - a);
    let r = 0;
    return [(r = e > a ? (e < i ? e - a : t) : r), t];
  }
  GetRecallTaskConfigMap() {
    return this.Vca;
  }
  Hca() {
    this.Vca.clear(),
      this.Gca.E$s.forEach((t) => {
        (t = t.s5n),
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
            this.Vca.get(e));
        void 0 === i && ((i = []), this.Vca.set(e, i)), i.push(t);
      });
  }
  GetTaskProgressTuple(t) {
    var t = this.Wca(t),
      [t, e] = [t.lMs, t.j6n];
    return [t, e];
  }
  GetTaskRewardState(t) {
    switch (this.Wca(t).H6n) {
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning:
        return 0;
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish:
        return 1;
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken:
        return 2;
      default:
        return 0;
    }
  }
  GetTaskRewardShowPriority(t) {
    switch (this.Wca(t).H6n) {
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning:
        return 1;
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish:
        return 0;
      case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken:
        return 2;
      default:
        return 1;
    }
  }
  GetNextRefreshTime() {
    var t,
      e,
      i = this.Rfa ?? 0;
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
