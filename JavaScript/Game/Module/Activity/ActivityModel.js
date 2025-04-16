"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityModel = void 0);
const Info_1 = require("../../../Core/Common/Info"),
  Log_1 = require("../../../Core/Common/Log"),
  CommonDefine_1 = require("../../../Core/Define/CommonDefine"),
  MultiTextLang_1 = require("../../../Core/Define/ConfigQuery/MultiTextLang"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Macro_1 = require("../../../Core/Preprocessor/Macro"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  StringUtils_1 = require("../../../Core/Utils/StringUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  ConfirmBoxDefine_1 = require("../ConfirmBox/ConfirmBoxDefine"),
  LogReportController_1 = require("../LogReport/LogReportController"),
  LogReportDefine_1 = require("../LogReport/LogReportDefine"),
  ActivityCache_1 = require("./ActivityCache"),
  ActivityCommonDefine_1 = require("./ActivityCommonDefine"),
  ActivityMowingController_1 = require("./ActivityContent/Mowing/ActivityMowingController"),
  ActivityController_1 = require("./ActivityController"),
  ActivityManager_1 = require("./ActivityManager"),
  ACTIVITY_TIME_REASON = "活动开启关闭时间倒计时 [ActivityId:{0}, IsOpen:{1}]";
class ActivityModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.h3e = new Map()),
      (this.F4e = new Array()),
      (this.V4e = new ActivityCache_1.ActivityCache()),
      (this.H4e = new Set()),
      (this.j4e = new Map()),
      (this.q5e = ""),
      (this.G5e = ""),
      (this.N5e = ""),
      (this.O5e = ""),
      (this.OnLanguageChange = () => {
        (this.q5e = ""),
          (this.G5e = ""),
          (this.N5e = ""),
          (this.O5e = ""),
          this.Lma();
      }),
      (this.W4e = new Map()),
      (this.K4e = new Set()),
      (this.Q4e = new Set()),
      (this.X4e = new Map()),
      (this.u8a = (t, e) => {
        var i = t.IsFinished ? 1 : 0,
          r = e.IsFinished ? 1 : 0;
        if (i != r) return i - r;
        var n = [];
        for (const o of [t.AccessType, e.AccessType]) {
          let t = 2;
          switch (o) {
            case 7:
              t = 0;
              break;
            case 16:
              t = 1;
          }
          n.push(t);
        }
        return n[0] - n[1];
      }),
      (this.Apl = !1),
      (this.iec = !1),
      (this.rec = []);
  }
  OnInit() {
    return (
      this.$4e(),
      this.Lma(),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.TextLanguageChange,
        this.OnLanguageChange,
      ),
      !0
    );
  }
  OnClear() {
    for (const t of this.j4e.values())
      TimerSystem_1.RealTimeTimerSystem.Remove(t);
    return (
      this.j4e.clear(),
      this.H4e.clear(),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.TextLanguageChange,
        this.OnLanguageChange,
      ),
      !0
    );
  }
  InitCache() {
    this.V4e.InitData();
  }
  Lma() {
    var t;
    StringUtils_1.StringUtils.IsEmpty(this.q5e) &&
      (this.q5e =
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "ActivityForeverTip",
        )),
      StringUtils_1.StringUtils.IsEmpty(this.G5e) &&
        ((t =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "ActiveClose",
          )),
        (this.G5e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(t))),
      StringUtils_1.StringUtils.IsEmpty(this.N5e) &&
        (this.N5e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "ActivityClosePanelTime",
        )),
      StringUtils_1.StringUtils.IsEmpty(this.O5e) &&
        (this.O5e = MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "ActivityRemainingTime",
        ));
  }
  OnReceiveMessageData(t) {
    this.h3e.forEach((t, e) => {
      t.ForceClose();
    }),
      t.forEach((e) => {
        if (ActivityManager_1.ActivityManager.GetActivityController(e.h5n))
          try {
            this.Y4e(e)?.Phrase(e);
          } catch (t) {
            this.OpenActivityErrorConfirmBox(e.s5n, e.h5n),
              t instanceof Error
                ? Log_1.Log.CheckError() &&
                  Log_1.Log.ErrorWithStack(
                    "Activity",
                    37,
                    "[Activity]Phrase执行异常",
                    t,
                    ["id", e.s5n],
                    ["error", t.message],
                  )
                : Log_1.Log.CheckError() &&
                  Log_1.Log.Error("Activity", 37, "[Activity]Phrase执行异常", [
                    "id",
                    e.s5n,
                  ]);
          }
        else
          Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Activity", 27, "尚未实现活动", ["type", e.h5n]);
      });
    const e = new Map();
    t.forEach((t) => {
      e.has(t.h5n) || e.set(t.h5n, new Array()), e.get(t.h5n).push(t.s5n);
    }),
      e.forEach((t, e) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnReceiveActivityData,
          e,
          t,
        );
      }),
      this.V4e.OnReceiveActivityData(),
      this.RefreshShowingActivities(),
      this.J4e(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Activity", 37, "ActivityRequest 收到活动数据");
  }
  RedPointState() {
    if (this.GetIfFunctionOpen()) {
      var e = this.F4e.length;
      for (let t = 0; t < e; t++)
        if (this.h3e.get(this.F4e[t])?.RedPointShowState) return !0;
    }
    return !1;
  }
  OnReceiveActivityRead(t) {
    t = this.h3e.get(t);
    t && t.SetFirstOpenFalse();
  }
  OnActivityUpdate(t) {
    t.forEach((e) => {
      if (ActivityManager_1.ActivityManager.GetActivityController(e.h5n))
        try {
          this.Y4e(e)?.Phrase(e);
        } catch (t) {
          this.OpenActivityErrorConfirmBox(e.s5n, e.h5n),
            t instanceof Error
              ? Log_1.Log.CheckError() &&
                Log_1.Log.ErrorWithStack(
                  "Activity",
                  37,
                  "[Activity]Phrase执行异常",
                  t,
                  ["id", e.s5n],
                  ["error", t.message],
                )
              : Log_1.Log.CheckError() &&
                Log_1.Log.Error("Activity", 37, "[Activity]Phrase执行异常", [
                  "id",
                  e.s5n,
                ]);
        }
      else
        Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Activity", 27, "尚未实现活动", ["type", e.h5n]);
    });
    const e = new Map();
    t.forEach((t) => {
      e.has(t.h5n) || e.set(t.h5n, new Array()), e.get(t.h5n).push(t.s5n);
    }),
      e.forEach((t, e) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnReceiveActivityData,
          e,
          t,
        );
      }),
      this.RefreshShowingActivities(),
      ModelManager_1.ModelManager.GameModeModel.WorldDone && this.J4e(),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityUpdate);
  }
  OnDisableActivity(t) {
    t.forEach((t) => {
      t = this.h3e.get(t);
      t && t.ForceClose();
    }),
      this.RefreshShowingActivities(),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityUpdate);
  }
  Y4e(t) {
    var e,
      i,
      r,
      n = this.h3e.get(t.s5n);
    return (
      n ||
      ((e = TimeUtil_1.TimeUtil.GetServerTime()),
      (i = Number(MathUtils_1.MathUtils.LongToBigInt(t.wps))),
      (r = Number(MathUtils_1.MathUtils.LongToBigInt(t.Pps))),
      e <= i && e <= r
        ? ((e = Math.min(r, i)),
          this.z4e(e, t.s5n, !0),
          void (
            Log_1.Log.CheckInfo() &&
            Log_1.Log.Info(
              "Activity",
              37,
              "活动待开启",
              ["Id", t.s5n],
              ["ShowTime", i],
              ["OpenTime", r],
            )
          ))
        : ((e = Number(MathUtils_1.MathUtils.LongToBigInt(t.xps))),
          (i = Number(MathUtils_1.MathUtils.LongToBigInt(t.Ups))),
          (r = Math.max(e, i)),
          this.z4e(r, t.s5n, !1),
          (n = ActivityController_1.ActivityController.CreateActivityData(t)),
          this.h3e.set(t.s5n, n),
          this.F4e.push(t.s5n),
          n))
    );
  }
  z4e(t, e, i) {
    var r;
    this.H4e.has(t) ||
      t < TimeUtil_1.TimeUtil.GetServerTime() ||
      ((r =
        t * TimeUtil_1.TimeUtil.InverseMillisecond + TimerSystem_1.MIN_TIME),
      (e = StringUtils_1.StringUtils.Format(
        ACTIVITY_TIME_REASON,
        e.toString(),
        String(i),
      )),
      (i = TimerSystem_1.RealTimeTimerSystem.EmitOnTime(
        () => {
          this.Z4e(t);
        },
        r,
        void 0,
        e,
      )) && (this.H4e.add(t), this.j4e.set(t, i)));
  }
  Z4e(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Activity",
        37,
        "ActivityTimeStampCheck 活动开始结束时间检查",
      ),
      ActivityController_1.ActivityController.RequestActivityData().then();
    var e = this.j4e.get(t);
    e && (TimerSystem_1.RealTimeTimerSystem.Remove(e), this.j4e.delete(t)),
      this.H4e.delete(t);
  }
  GetIfFunctionOpen() {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10053);
  }
  GetIfShowActivity() {
    return !!this.GetIfFunctionOpen();
  }
  GetAllActivityMap() {
    return this.h3e;
  }
  GetActivityById(t) {
    return this.h3e.get(t);
  }
  GetActivitiesByType(i) {
    const r = [];
    return (
      this.h3e.forEach((t, e) => {
        t.Type === i && r.push(t);
      }),
      r
    );
  }
  GetCurrentActivitiesByType(i) {
    const r = [];
    return (
      this.W4e.forEach((t, e) => {
        t.Type === i && r.push(t);
      }),
      r
    );
  }
  GetCurrentShowingActivities() {
    return Array.from(this.W4e.values()).sort(ActivityModel.SortFunc);
  }
  Kuc() {
    let t = Array.from(this.W4e.values());
    return (t = this.iec ? t.filter((t) => this.rec.includes(t.Id)) : t);
  }
  HaveShowingActivity() {
    return 0 < this.W4e.size;
  }
  GetIsActivityShowingByType(t) {
    if (this.W4e && 0 !== this.W4e.size)
      for (var [, e] of this.W4e) if (e.Type === t) return !0;
    return !1;
  }
  RefreshShowingActivities() {
    this.K4e.clear(),
      this.Q4e.clear(),
      this.h3e.forEach((t, e) => {
        var i = t.CheckIfInShowTime();
        this.W4e.has(t.Id) && !i
          ? (this.K4e.add(t.Id), this.W4e.delete(t.Id))
          : !this.W4e.has(t.Id) &&
            i &&
            (this.Q4e.add(t.Id), this.W4e.set(t.Id, t));
      }),
      0 < this.K4e.size &&
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnActivityClose,
          this.K4e,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnActivityUpdate,
        )),
      0 < this.Q4e.size &&
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnActivityOpen,
          this.Q4e,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnActivityUpdate,
        ));
  }
  J4e() {
    for (const e of this.GetCurrentShowingActivities()) {
      var t = this.GetActivityCacheData(
        e.Id,
        0,
        ActivityCommonDefine_1.ACTIVITYFIRSTUNLOCKFLAG,
        0,
        0,
      );
      e.IsUnLock() &&
        0 === t &&
        (ActivityManager_1.ActivityManager.GetActivityController(
          e.Type,
        ).OnActivityFirstUnlock(e),
        this.SaveActivityData(
          e.Id,
          ActivityCommonDefine_1.ACTIVITYFIRSTUNLOCKFLAG,
          0,
          0,
          1,
        ));
    }
  }
  SaveActivityData(t, e, i, r, n) {
    t = this.GetActivityById(t);
    this.V4e.SaveCacheData(t, e, i, r, n);
  }
  GetActivityCacheData(t, e, i, r, n) {
    t = this.GetActivityById(t);
    return this.V4e.GetCacheData(t, e, i, r, n);
  }
  GetActivityRedDotState(t) {
    return this.GetActivityById(t)?.RedPointShowState ?? !1;
  }
  SendActivityViewOpenLogData(t) {
    var e = new LogReportDefine_1.ActivityViewOpenLogData();
    (e.i_open_way = t), LogReportController_1.LogReportController.LogReport(e);
  }
  SendActivityTabViewOpenLogData(t) {
    var e = new LogReportDefine_1.ActivityTabViewOpenLogData(),
      i = TimeUtil_1.TimeUtil.GetServerTime(),
      i = 0 === Number(t.EndOpenTime) ? 0 : Number(t.EndOpenTime) - i;
    (e.i_activity_id = t.Id),
      (e.i_activity_type = t.Type),
      (e.i_time_left = Math.round(i)),
      (e.i_unlock = t.IsUnLock() ? 1 : 0),
      LogReportController_1.LogReportController.LogReport(e);
  }
  SendActivityViewJumpClickLogData(t) {
    var e = new LogReportDefine_1.ActivityViewJumpClickLogData();
    (e.i_activity_id = t.Id),
      (e.i_activity_type = t.Type),
      (e.i_unlock = t.IsUnLock() ? 1 : 0),
      LogReportController_1.LogReportController.LogReport(e);
  }
  SendActivityLockConditionLogData(t) {
    var e = new LogReportDefine_1.ActivityLockConditionClickLogData();
    (e.i_activity_id = t.Id),
      (e.i_activity_type = t.Type),
      LogReportController_1.LogReportController.LogReport(e);
  }
  $4e() {
    var t = {
      CheckIsActivityLevel:
        ActivityMowingController_1.ActivityMowingController
          .CheckIsActivityLevel,
      GetLevelRecommendLevel:
        ActivityMowingController_1.ActivityMowingController.GetRecommendLevel,
    };
    this.X4e.set(Protocol_1.Aki.Protocol.uks.Proto_Harvest, t);
  }
  GetActivityLevelUnlockState(t, e) {
    t = ActivityManager_1.ActivityManager.GetActivityController(t);
    return !t || t.GetActivityLevelUnlockState(e);
  }
  GetActivityLevelRecommendLevel(t, e, i) {
    i = this.X4e.get(i);
    return i ? i.GetLevelRecommendLevel(t, e) : 0;
  }
  CheckActivityLevelBelongToType(t) {
    for (var [e, i] of this.X4e.entries()) {
      i = i.CheckIsActivityLevel(t);
      if (i) return [i, e];
    }
    return [!1, 0];
  }
  GetActivityMapMarkState(t, e) {
    t = ActivityManager_1.ActivityManager.GetActivityController(t);
    return !!t && t.GetActivityMapMarkState(e);
  }
  GetTimeVisibleAndRemainTime(t) {
    var e = t.CheckIfInShowTime(),
      i = t.CheckIfInOpenTime();
    if (!i && !e)
      return (
        (e =
          ConfigManager_1.ConfigManager.TextConfig.GetTextContentIdById(
            "ActiveClose",
          )),
        [!1, MultiTextLang_1.configMultiTextLang.GetLocalTextNew(e)]
      );
    var r,
      e = t.EndOpenTime,
      n = t.EndShowTime;
    let o = "",
      s = !0,
      a = 0;
    return (
      0 === e && 0 === n
        ? ((r = t.LocalConfig),
          (s = !!r && 1 === r.TimeIsDisplay),
          (o = this.q5e))
        : ((o =
            0 === t.EndOpenTime
              ? ((a = n), this.N5e)
              : ((a = i ? e : n), i ? this.O5e : this.N5e)),
          (s = !0),
          (o = this.GetRemainTimeText(a, o) ?? "")),
      [s, o]
    );
  }
  GetRemainTimeText(t, e) {
    var i = TimeUtil_1.TimeUtil.GetServerTime(),
      t = Math.max(t - i, 1),
      i = this.FOe(t),
      t =
        TimeUtil_1.TimeUtil.GetCountDownDataFormat2(t, i[0], i[1])
          .CountDownText ?? "";
    return StringUtils_1.StringUtils.Format(e, t);
  }
  FOe(t) {
    return t > CommonDefine_1.SECOND_PER_DAY
      ? [3, 2]
      : t > CommonDefine_1.SECOND_PER_HOUR
        ? [2, 1]
        : t > CommonDefine_1.SECOND_PER_MINUTE
          ? [1, 0]
          : [0, 0];
  }
  GetActivityConditionData(e) {
    var i = [];
    let t = 0;
    t = e.HasPreOpenCondition()
      ? e.PreOpenConditionGroupId
      : e.ConditionGroupId;
    for (const o of ConfigManager_1.ConfigManager.ConditionConfig.GetGroupConditionIds(
      t,
    )) {
      var r =
        ConfigManager_1.ConfigManager.ConditionConfig.GetConditionConfig(o);
      let t = -1;
      r.AccessId &&
        ((n = ConfigManager_1.ConfigManager.GetWayConfig.GetConfigById(
          r.AccessId,
        )),
        (t = n.SkipName));
      var n = {
        ConditionId: o,
        ConditionTextId: r.Description,
        IsFinished: e.IsActivityConditionFinished(o),
        AccessId: r.AccessId,
        AccessType: t,
      };
      i.push(n);
    }
    return i.sort(this.u8a), i;
  }
  SetForceHideActivityTimeTextFlag(t) {
    this.Apl = t;
  }
  SetDebugFilterMode(t, e) {
    (this.iec = t), e && (this.rec = e);
    for (const i of this.W4e.values())
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.RefreshCommonActivityRedDot,
        i.Id,
      );
  }
  OpenActivityErrorConfirmBox(t, e) {
    var i = new ConfirmBoxDefine_1.ConfirmBoxDataNew(33),
      t = StringUtils_1.StringUtils.Format(
        MultiTextLang_1.configMultiTextLang.GetLocalTextNew(
          "ActivityErrorTips",
        ) ?? "",
        t.toString(),
        e.toString(),
      );
    i.SetTextArgs(t),
      ControllerHolder_1.ControllerHolder.ConfirmBoxController.ShowConfirmBoxNew(
        i,
      );
  }
}
(exports.ActivityModel = ActivityModel).SortFunc = (t, e) =>
  t.FinishSinkState !== e.FinishSinkState
    ? t.FinishSinkState
      ? 1
      : -1
    : t.Sort !== e.Sort
      ? t.Sort - e.Sort
      : t.BeginOpenTime !== e.BeginOpenTime
        ? t.BeginOpenTime - e.BeginOpenTime
        : t.Id - e.Id;
//# sourceMappingURL=ActivityModel.js.map
