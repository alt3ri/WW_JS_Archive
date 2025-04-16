"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityRegressData = void 0);
const Log_1 = require("../../../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../../../Core/Define/CommonDefine"),
  CommonParamById_1 = require("../../../../../Core/Define/ConfigCommon/CommonParamById"),
  Protocol_1 = require("../../../../../Core/Define/Net/Protocol"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../../../Common/Event/EventSystem"),
  LocalStorage_1 = require("../../../../Common/LocalStorage"),
  LocalStorageDefine_1 = require("../../../../Common/LocalStorageDefine"),
  TimeUtil_1 = require("../../../../Common/TimeUtil"),
  ConfigManager_1 = require("../../../../Manager/ConfigManager"),
  ModelManager_1 = require("../../../../Manager/ModelManager"),
  ActivityData_1 = require("../../ActivityData"),
  RegressDefine_1 = require("./Base/RegressDefine");
class ActivityRegressData extends ActivityData_1.ActivityBaseData {
  constructor() {
    super(...arguments),
      (this.$h1 = void 0),
      (this.tda = new Map()),
      (this.ida = new Map()),
      (this.yfa = 0),
      (this.of1 = [
        RegressDefine_1.ERegressQuestionnaireType.Type1,
        RegressDefine_1.ERegressQuestionnaireType.Type2,
      ]),
      (this.Wh1 = new Map());
  }
  PhraseEx(e) {
    (this.$h1 = e.Qa1),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "ActivityRecall",
          63,
          "回流活动-ActivityRegressData.PhraseEx()->",
          ["收到回流活动数据, data::", this.$h1],
        ),
      this.$h1
        ? (this.$h1.$ca ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "ActivityRecall",
                63,
                "回流活动-ActivityRegressData.PhraseEx()->",
                ["协议下发的回流活动数据没有签到数据, data:", this.$h1.$ca],
              )),
          this.$h1.E$s ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "ActivityRecall",
                63,
                "回流活动-ActivityRegressData.PhraseEx()->",
                ["协议下发的回流活动数据没有任务数据, data:", this.$h1.E$s],
              )),
          this.$h1.Hca ||
            (Log_1.Log.CheckWarn() &&
              Log_1.Log.Warn(
                "ActivityRecall",
                63,
                "回流活动-ActivityRegressData.PhraseEx()->",
                [
                  "协议下发的回流活动数据没有已经领取的积分奖励, data:",
                  this.$h1.Hca,
                ],
              )),
          (this.EndOpenTimeInternal = MathUtils_1.MathUtils.LongToNumber(
            this.$h1.dps,
          )),
          (this.EndShowTimeInternal = this.EndOpenTimeInternal),
          (this.yfa = MathUtils_1.MathUtils.LongToNumber(this.$h1.yDs)),
          this.tda.clear(),
          this.$h1.E$s.forEach((e) => {
            this.tda.set(e.s5n, e);
          }),
          this.oda(),
          this.RefreshRegressTaskMapping(),
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug(
              "ActivityRecall",
              63,
              "回流活动-ActivityRegressData.PhraseEx()->",
              ["开启状态, IsOpen:", this.IsActivityOpen()],
              ["leftTime, 剩余开启时间:", this.GetActivityOpenTimeLeft()],
            ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RecallActivityInfoUpdate,
          ),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.RefreshCommonActivityRedDot,
            ModelManager_1.ModelManager.ActivityRegressModel.ActivityId,
          ))
        : Log_1.Log.CheckError() &&
          Log_1.Log.Error(
            "ActivityRecall",
            63,
            "回流活动-ActivityRegressData.PhraseEx()->",
            ["协议下发的活动数据没有回流活动相关的, data:", this.$h1],
          );
  }
  GetActivityState() {
    return this.IsUnLock() && this.CheckIfInOpenTime() ? 1 : 0;
  }
  get Grade() {
    return this.$h1.Ka1;
  }
  set Grade(e) {
    this.$h1.Ka1 = e;
  }
  CheckIfInOpenTime() {
    return this.CheckIfInTimeInterval(this.BeginOpenTime, this.EndOpenTime);
  }
  GetActivityOpenTimeLeft() {
    var e = this.EndOpenTime;
    return Math.round(Math.max(0, e - TimeUtil_1.TimeUtil.GetServerTime()));
  }
  IsActivityOpen() {
    return 1 === this.GetActivityState();
  }
  GetSignRewardState(e) {
    e = this.sda(e);
    if (void 0 !== e)
      switch (e.H6n) {
        case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning:
          return 0;
        case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish:
          return 1;
        case Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskTaken:
          return 2;
      }
    return 0;
  }
  HasSignRewardCanClaimed() {
    for (const e of this.$h1.$ca)
      if (e.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish)
        return !0;
    return !1;
  }
  sda(e) {
    return this.$h1.$ca[e - 1];
  }
  CheckHaveTaskRewardCanGet() {
    var e = this.GetRegressTaskProgressFloat01();
    if (!(1 <= e))
      for (const t of this.$h1.E$s)
        if (t.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish)
          return !0;
    return !1;
  }
  GetSignRewardEntityId(e) {
    return this.sda(e).s5n;
  }
  ada(e) {
    return (
      void 0 === this.tda.get(e) &&
        Log_1.Log.CheckError() &&
        Log_1.Log.Error(
          "ActivityRecall",
          63,
          "[回流活动]ActivityRegressData.GetRawTaskData->",
          ["获取回流任务数据失败, 服务器没下发该任务数据 taskId:", e],
        ),
      this.tda.get(e)
    );
  }
  IsRegressTaskScoreOverExp() {
    return 1 <= this.GetRegressTaskProgressFloat01();
  }
  GetTaskProgressTuple(e) {
    var e = this.ada(e),
      [e, t] = [e.lMs, e.j6n];
    return [e, t];
  }
  GetTaskRewardState(e) {
    switch (this.ada(e).H6n) {
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
  GetNextRefreshTime() {
    var e,
      t,
      r = this.yfa ?? 0;
    return 0 === r
      ? ""
      : ((e = TimeUtil_1.TimeUtil.GetServerTime()),
        (e =
          (r = Math.max(r - e, TimeUtil_1.TimeUtil.TimeDeviation)) >=
          CommonDefine_1.SECOND_PER_HOUR
            ? 2
            : 1),
        (t = r >= CommonDefine_1.SECOND_PER_HOUR ? 1 : 0),
        TimeUtil_1.TimeUtil.GetCountDownDataFormat2(r, e, t).CountDownText ??
          "");
  }
  GetExDataRedPointShowState() {
    return (
      !!this.IsActivityOpen() &&
      (this.HasSignRewardCanClaimed() ||
        this.CheckHaveTaskRewardCanGet() ||
        this.CheckRegressScoreRewardReached() ||
        this.CheckShowQuestionnaireRedDot() ||
        this.CheckShopRedDot() ||
        ModelManager_1.ModelManager.ActivityRegressModel.ShouldShowDoubleDropRedDot() ||
        this.HasReachableCultivateTask())
    );
  }
  GetBossDoubleDropCount() {
    return this.$h1.Xa1;
  }
  GetWeekDoubleDropCount() {
    return this.$h1.Ya1;
  }
  GetQuestionnaireRewardState(t) {
    switch (this.$h1.Zp1.find((e) => e.s5n === t)?.H6n) {
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
  CheckShowQuestionnaireRedDot() {
    if (!this.IsActivityOpen()) return !1;
    for (const t of this.of1) {
      var e =
        ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressQuestionnaireConfig(
          t,
        );
      if (
        void 0 !== e &&
        this.IsQuestionnaireUnlock(t) &&
        1 === this.GetQuestionnaireRewardState(e.Id)
      )
        return !0;
    }
    return (
      this.CheckQuestionnaireFirstRedDot() ||
      this.CheckSecondQuestionnaireFirstRedDot()
    );
  }
  CheckQuestionnaireFirstRedDot() {
    return (
      !!this.IsActivityOpen() &&
      !LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey
          .ActivityRegressQuestionnaireRedDotCheckedInPeriod,
        !1,
      )
    );
  }
  CheckSecondQuestionnaireFirstRedDot() {
    var e;
    return (
      !!this.IsActivityOpen() &&
      ((e = this.IsQuestionnaireUnlock(
        RegressDefine_1.ERegressQuestionnaireType.Type2,
      )),
      !LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey
          .ActivityRegressSecondQuestionnaireRedDotCheckedInPeriod,
        !1,
      )) &&
      e
    );
  }
  ResetQuestionnaireRedDot() {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey
        .ActivityRegressQuestionnaireRedDotCheckedInPeriod,
      !1,
    ),
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey
          .ActivityRegressSecondQuestionnaireRedDotCheckedInPeriod,
        !1,
      );
  }
  SetQuestionnaireRedDotChecked() {
    this.CheckQuestionnaireFirstRedDot() &&
      LocalStorage_1.LocalStorage.SetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey
          .ActivityRegressQuestionnaireRedDotCheckedInPeriod,
        !0,
      ),
      this.CheckSecondQuestionnaireFirstRedDot() &&
        LocalStorage_1.LocalStorage.SetPlayer(
          LocalStorageDefine_1.ELocalStoragePlayerKey
            .ActivityRegressSecondQuestionnaireRedDotCheckedInPeriod,
          !0,
        ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RecallActivityInfoUpdate,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      );
  }
  CheckShopRedDot() {
    return (
      !!this.IsActivityOpen() &&
      !LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey
          .ActivityRegressShopRedDotCheckedInPeriod,
        !1,
      )
    );
  }
  ResetShopRemindRedDot() {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey
        .ActivityRegressShopRedDotCheckedInPeriod,
      !1,
    );
  }
  SetShopRedDotChecked() {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey
        .ActivityRegressShopRedDotCheckedInPeriod,
      !0,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RecallActivityInfoUpdate,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      );
  }
  GetShopIdAndTabIndex() {
    var e =
        ConfigManager_1.ConfigManager.SkipInterfaceConfig.GetAccessPathConfig(
          RegressDefine_1.REGRESS_SKIP_SHOPID,
        ),
      t = e?.Val1,
      e = e?.Val2;
    return [t ? Number(t) : 0, e ? Number(e) : 0];
  }
  IsQuestionnaireUnlock(e) {
    return (
      !!this.IsActivityOpen() &&
      (e === RegressDefine_1.ERegressQuestionnaireType.Type1 ||
        (void 0 !==
          (e = CommonParamById_1.configCommonParamById.GetIntConfig(
            "RegressSecondAskSignDay",
          )) &&
          2 === this.GetSignRewardState(e)))
    );
  }
  SetQuestionnaireReached(t) {
    var e = this.$h1.Zp1.find((e) => e.s5n === t);
    e?.H6n === Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskRunning &&
      (e.H6n = Protocol_1.Aki.Protocol.I$s.Proto_ActivityTaskFinish);
  }
  RefreshRegressTaskMapping() {
    this.Wh1.clear();
    for (const r of this.$h1.E$s) {
      var e = r.s5n,
        e =
          ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressQuestConfig(
            e,
          ),
        t = this.Wh1.get(e.TaskType) ?? [];
      t.push(e), this.Wh1.set(e.TaskType, t);
    }
  }
  GetRegressTaskListByType(e) {
    return this.Wh1.get(e);
  }
  HasReachableTask(e) {
    return (
      this.GetRegressTaskListByType(e)?.some(
        (e) => 1 === this.GetTaskRewardState(e.Id),
      ) ?? !1
    );
  }
  HasReachableConstantTask() {
    return (
      !(1 <= this.GetRegressTaskProgressFloat01()) &&
      (this.HasReachableTask(0) || this.HasReachableTask(1))
    );
  }
  HasReachableCultivateTask() {
    return this.HasReachableTask(2);
  }
  GetRegressTaskProgressFloat01() {
    var [e, t] = this.GetRegressTaskProgressTuple();
    return 0 === t ? 0 : ((e = Math.min(1, e / t)), Math.trunc(100 * e) / 100);
  }
  GetRegressTaskScore() {
    var [e] = this.GetRegressTaskProgressTuple();
    return e;
  }
  hda(e) {
    return this.$h1.Hca.includes(e);
  }
  GetRegressTaskScoreRewardState(e) {
    return this.hda(e.Id)
      ? 2
      : this.GetRegressTaskScore() >= e.NeedScore
        ? 1
        : 0;
  }
  CheckRegressScoreRewardReached() {
    for (const e of ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressBonusRewardConfigList(
      this.Grade,
    ) ?? [])
      if (1 === this.GetRegressTaskScoreRewardState(e)) return !0;
    return !1;
  }
  SetRegressScoreRewardReached(e) {
    this.$h1.Hca = this.$h1.Hca.concat(e);
  }
  GetRegressTaskProgressTuple() {
    var e = ModelManager_1.ModelManager.InventoryModel.GetCommonItemCount(20);
    let t = 0;
    for (const r of ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressBonusRewardConfigList(
      this.Grade,
    ) ?? [])
      t = Math.max(r.NeedScore, t);
    return [e, t];
  }
  oda() {
    this.ida.clear();
    for (const e of ConfigManager_1.ConfigManager.ActivityRegressConfig.GetRegressBonusRewardConfigList(
      this.Grade,
    ) ?? [])
      this.ida.set(e.Id, e.NeedScore);
  }
  GetTaskSortPriority(e) {
    switch (this.ada(e).H6n) {
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
  GetRegressTaskRelativeScore(e) {
    var t = this.GetRegressTaskScore(),
      r = e.Id - 1;
    let i = 0;
    this.ida.has(r) && (i = this.ida.get(r) ?? 0);
    (r = this.ida.get(e.Id)), (e = r - i);
    let s = 0;
    return [(s = t > i ? (t < r ? t - i : e) : s), e];
  }
  IsDoubleDropUnlock(e) {
    return 1 === e ? (this.$h1?.Vu1 ?? !1) : 2 === e && (this.$h1?.ju1 ?? !1);
  }
  ResetDoubleDropFirstRedDot() {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey
        .ActivityRegressDoubleDropFirstRedDotCheckedInPeriod,
      !1,
    );
  }
  MarkDoubleDropFirstRedDotShown() {
    LocalStorage_1.LocalStorage.SetPlayer(
      LocalStorageDefine_1.ELocalStoragePlayerKey
        .ActivityRegressDoubleDropFirstRedDotCheckedInPeriod,
      !0,
    ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RecallActivityInfoUpdate,
      ),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        this.Id,
      );
  }
  CheckDoubleDropFirstRedDot() {
    return (
      !!this.IsActivityOpen() &&
      !LocalStorage_1.LocalStorage.GetPlayer(
        LocalStorageDefine_1.ELocalStoragePlayerKey
          .ActivityRegressDoubleDropFirstRedDotCheckedInPeriod,
        !1,
      )
    );
  }
}
exports.ActivityRegressData = ActivityRegressData;
//# sourceMappingURL=ActivityRegressData.js.map
