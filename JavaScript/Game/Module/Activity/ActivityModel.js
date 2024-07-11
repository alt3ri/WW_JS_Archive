"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ActivityModel = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const StringUtils_1 = require("../../../Core/Utils/StringUtils");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
const LogReportController_1 = require("../LogReport/LogReportController");
const LogReportDefine_1 = require("../LogReport/LogReportDefine");
const ActivityCache_1 = require("./ActivityCache");
const ActivityCommonDefine_1 = require("./ActivityCommonDefine");
const ActivityMowingController_1 = require("./ActivityContent/Mowing/ActivityMowingController");
const ActivityController_1 = require("./ActivityController");
const ActivityManager_1 = require("./ActivityManager");
const ACTIVITY_TIME_REASON =
  "活动开启关闭时间倒计时 [ActivityId:{0}, IsOpen:{1}]";
class ActivityModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.I3e = 0),
      (this.K2e = new Map()),
      (this.T3e = new Array()),
      (this.L3e = new ActivityCache_1.ActivityCache()),
      (this.D3e = new Set()),
      (this.R3e = new Map()),
      (this.U3e = new Map()),
      (this.A3e = new Set()),
      (this.P3e = new Set()),
      (this.x3e = new Map());
  }
  OnInit() {
    return this.w3e(), !0;
  }
  OnClear() {
    for (const t of this.R3e.values())
      TimerSystem_1.RealTimeTimerSystem.Remove(t);
    return this.R3e.clear(), this.D3e.clear(), !0;
  }
  InitCache() {
    this.L3e.InitData();
  }
  OnReceiveMessageData(t) {
    this.K2e.forEach((t, e) => {
      t.ForceClose();
    }),
      t.forEach((t) => {
        ActivityManager_1.ActivityManager.GetActivityController(t.Ikn)
          ? this.B3e(t)?.Phrase(t)
          : Log_1.Log.CheckWarn() &&
            Log_1.Log.Warn("Activity", 28, "尚未实现活动", ["type", t.Ikn]);
      });
    const e = new Map();
    t.forEach((t) => {
      e.has(t.Ikn) || e.set(t.Ikn, new Array()), e.get(t.Ikn).push(t.Ekn);
    }),
      e.forEach((t, e) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnReceiveActivityData,
          e,
          t,
        );
      }),
      this.L3e.OnReceiveActivityData(),
      this.b3e(),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("Activity", 38, "ActivityRequest 收到活动数据"),
      this.RefreshShowingActivities();
  }
  SetCurrentSelectActivityId(t) {
    this.I3e = t;
  }
  GetCurrentSelectActivityId() {
    return this.I3e;
  }
  GetCurrentOpenActivityData(i) {
    const r = this.GetCurrentShowingActivities();
    const n = r.length;
    if (n !== 0) {
      let e = void 0;
      for (let t = 0; t < n; t++)
        if (r[t].Id === i) {
          e = r[t];
          break;
        }
      return (e = e || this.GetActivityById(r[0].Id));
    }
  }
  RedPointState() {
    if (this.GetIfFunctionOpen()) {
      const e = this.T3e.length;
      for (let t = 0; t < e; t++)
        if (this.K2e.get(this.T3e[t])?.RedPointShowState) return !0;
    }
    return !1;
  }
  OnReceiveActivityRead(t) {
    t = this.K2e.get(t);
    t && t.SetFirstOpenFalse();
  }
  OnActivityUpdate(t) {
    t.forEach((t) => {
      ActivityManager_1.ActivityManager.GetActivityController(t.Ikn)
        ? this.B3e(t)?.Phrase(t)
        : Log_1.Log.CheckWarn() &&
          Log_1.Log.Warn("Activity", 28, "尚未实现活动", ["type", t.Ikn]);
    });
    const e = new Map();
    t.forEach((t) => {
      e.has(t.Ikn) || e.set(t.Ikn, new Array()), e.get(t.Ikn).push(t.Ekn);
    }),
      e.forEach((t, e) => {
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnReceiveActivityData,
          e,
          t,
        );
      }),
      this.RefreshShowingActivities(),
      this.b3e(),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityUpdate);
  }
  OnDisableActivity(t) {
    t.forEach((t) => {
      t = this.K2e.get(t);
      t && t.ForceClose();
    }),
      this.RefreshShowingActivities(),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.OnActivityUpdate);
  }
  B3e(t) {
    let e = this.K2e.get(t.Ekn);
    if (!e) {
      var i = TimeUtil_1.TimeUtil.GetServerTime();
      var r = Number(MathUtils_1.MathUtils.LongToBigInt(t.l0s));
      var n = Number(MathUtils_1.MathUtils.LongToBigInt(t.a0s));
      if (i <= r && i <= n)
        return (i = Math.min(n, r)), void this.q3e(i, t.Ekn, !0);
      e = ActivityController_1.ActivityController.CreateActivityData(t);
    }
    (n = Number(MathUtils_1.MathUtils.LongToBigInt(t._0s))),
      (r = Number(MathUtils_1.MathUtils.LongToBigInt(t.h0s))),
      (i = Math.max(n, r));
    return (
      this.q3e(i, t.Ekn, !1), this.K2e.set(t.Ekn, e), this.T3e.push(t.Ekn), e
    );
  }
  q3e(t, e, i) {
    let r;
    this.D3e.has(t) ||
      t < TimeUtil_1.TimeUtil.GetServerTime() ||
      ((r = Math.max(
        (t - TimeUtil_1.TimeUtil.GetServerTime()) *
          TimeUtil_1.TimeUtil.InverseMillisecond,
        TimerSystem_1.MIN_TIME,
      )),
      (e = StringUtils_1.StringUtils.Format(
        ACTIVITY_TIME_REASON,
        e.toString(),
        String(i),
      )),
      (i = TimerSystem_1.RealTimeTimerSystem.Delay(
        () => {
          this.G3e(t);
        },
        r,
        void 0,
        e,
      )) && (this.D3e.add(t), this.R3e.set(t, i)));
  }
  G3e(t) {
    Log_1.Log.CheckInfo() &&
      Log_1.Log.Info(
        "Activity",
        38,
        "ActivityTimeStampCheck 活动开始结束时间检查",
      ),
      ActivityController_1.ActivityController.RequestActivityData().then();
    const e = this.R3e.get(t);
    e && (TimerSystem_1.RealTimeTimerSystem.Remove(e), this.R3e.delete(t)),
      this.D3e.delete(t);
  }
  GetIfFunctionOpen() {
    return ModelManager_1.ModelManager.FunctionModel.IsOpen(10053);
  }
  GetIfShowActivity() {
    return !!this.GetIfFunctionOpen() && this.U3e.size > 0;
  }
  GetAllActivityMap() {
    return this.K2e;
  }
  GetCurrentSelectActivity() {
    return this.K2e.get(this.I3e);
  }
  GetActivityById(t) {
    return this.K2e.get(t);
  }
  GetCurrentActivitiesByType(i) {
    const r = [];
    return (
      this.U3e.forEach((t, e) => {
        t.Type === i && r.push(t);
      }),
      r
    );
  }
  GetCurrentShowingActivities() {
    return Array.from(this.U3e.values()).sort(ActivityModel.SortFunc);
  }
  RefreshShowingActivities() {
    this.A3e.clear(),
      this.P3e.clear(),
      this.K2e.forEach((t, e) => {
        this.U3e.has(t.Id) && !t.CheckIfInShowTime()
          ? (this.A3e.add(t.Id), this.U3e.delete(t.Id))
          : !this.U3e.has(t.Id) &&
            t.CheckIfInShowTime() &&
            (this.P3e.add(t.Id), this.U3e.set(t.Id, t));
      }),
      this.A3e.size > 0 &&
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnActivityClose,
          this.A3e,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnActivityUpdate,
        )),
      this.P3e.size > 0 &&
        (EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnActivityOpen,
          this.P3e,
        ),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnActivityUpdate,
        ));
  }
  b3e() {
    for (const e of this.GetCurrentShowingActivities()) {
      const t = this.GetActivityCacheData(
        e.Id,
        0,
        ActivityCommonDefine_1.ACTIVITYFIRSTUNLOCKFLAG,
        0,
        0,
      );
      e.IsUnLock() &&
        t === 0 &&
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
    this.L3e.SaveCacheData(t, e, i, r, n);
  }
  GetActivityCacheData(t, e, i, r, n) {
    t = this.GetActivityById(t);
    return this.L3e.GetCacheData(t, e, i, r, n);
  }
  SendActivityViewOpenLogData(t) {
    const e = new LogReportDefine_1.ActivityViewOpenLogData();
    (e.i_open_way = t), LogReportController_1.LogReportController.LogReport(e);
  }
  SendActivityTabViewOpenLogData(t) {
    const e = new LogReportDefine_1.ActivityTabViewOpenLogData();
    var i = TimeUtil_1.TimeUtil.GetServerTime();
    var i = Number(t.EndOpenTime) === 0 ? 0 : Number(t.EndOpenTime) - i;
    (e.i_activity_id = t.Id),
      (e.i_activity_type = t.Type),
      (e.i_time_left = Math.round(i)),
      (e.i_unlock = t.IsUnLock() ? 1 : 0),
      LogReportController_1.LogReportController.LogReport(e);
  }
  SendActivityViewJumpClickLogData(t, e) {
    const i = new LogReportDefine_1.ActivityViewJumpClickLogData();
    var r = TimeUtil_1.TimeUtil.GetServerTime();
    var r = Number(t.EndOpenTime) === 0 ? 0 : Number(t.EndOpenTime) - r;
    (i.i_activity_id = t.Id),
      (i.i_activity_type = t.Type),
      (i.i_time_left = Math.round(r)),
      (i.i_button_type = e),
      LogReportController_1.LogReportController.LogReport(i);
  }
  w3e() {
    const t = {
      CheckIsActivityLevel:
        ActivityMowingController_1.ActivityMowingController
          .CheckIsActivityLevel,
      GetLevelRecommendLevel:
        ActivityMowingController_1.ActivityMowingController.GetRecommendLevel,
    };
    this.x3e.set(Protocol_1.Aki.Protocol.gBs.Proto_Harvest, t);
  }
  GetActivityLevelUnlockState(t, e) {
    t = ActivityManager_1.ActivityManager.GetActivityController(t);
    return !t || t.GetActivityLevelUnlockState(e);
  }
  GetActivityLevelRecommendLevel(t, e, i) {
    i = this.x3e.get(i);
    return i ? i.GetLevelRecommendLevel(t, e) : 0;
  }
  CheckActivityLevelBelongToType(t) {
    for (let [e, i] of this.x3e.entries()) {
      i = i.CheckIsActivityLevel(t);
      if (i) return [i, e];
    }
    return [!1, 0];
  }
}
(exports.ActivityModel = ActivityModel).SortFunc = (t, e) =>
  e.Sort === t.Sort
    ? e.BeginOpenTime === t.BeginOpenTime
      ? t.Id - e.Id
      : t.BeginOpenTime - e.BeginOpenTime
    : t.Sort - e.Sort;
// # sourceMappingURL=ActivityModel.js.map
