"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.TimeOfDayController = void 0);
const ue_1 = require("ue"),
  AudioSystem_1 = require("../../../Core/Audio/AudioSystem"),
  Log_1 = require("../../../Core/Common/Log"),
  Time_1 = require("../../../Core/Common/Time"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  Net_1 = require("../../../Core/Net/Net"),
  MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  Global_1 = require("../../Global"),
  GlobalData_1 = require("../../GlobalData"),
  ConfigManager_1 = require("../../Manager/ConfigManager"),
  ControllerHolder_1 = require("../../Manager/ControllerHolder"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  UiControllerBase_1 = require("../../Ui/Base/UiControllerBase"),
  UiManager_1 = require("../../Ui/UiManager"),
  ScrollingTipsController_1 = require("../ScrollingTips/ScrollingTipsController"),
  TimeOfDayDefine_1 = require("./TimeOfDayDefine"),
  TimeOfDayModel_1 = require("./TimeOfDayModel"),
  SENDTIMEGAP = 2e3;
class TimeOfDayController extends UiControllerBase_1.UiControllerBase {
  static OnAddEvents() {
    EventSystem_1.EventSystem.Add(
      EventDefine_1.EEventName.EnterGameSuccess,
      this.nTo,
    ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.PauseGame,
        this.LZe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.LoginSuccess,
        this.gSe,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.BeforeLoadMap,
        this.SYi,
      ),
      EventSystem_1.EventSystem.Add(
        EventDefine_1.EEventName.WorldDone,
        this.FWe,
      );
  }
  static OnRemoveEvents() {
    EventSystem_1.EventSystem.Remove(
      EventDefine_1.EEventName.EnterGameSuccess,
      this.nTo,
    ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.PauseGame,
        this.LZe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.LoginSuccess,
        this.gSe,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.BeforeLoadMap,
        this.SYi,
      ),
      EventSystem_1.EventSystem.Remove(
        EventDefine_1.EEventName.WorldDone,
        this.FWe,
      );
  }
  static OnRegisterNetEvent() {
    Net_1.Net.Register(19764, TimeOfDayController.sTo),
      Net_1.Net.Register(25771, TimeOfDayController.aTo),
      Net_1.Net.Register(19904, TimeOfDayController.hTo),
      Net_1.Net.Register(23411, TimeOfDayController.Awa);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(19764),
      Net_1.Net.UnRegister(25771),
      Net_1.Net.UnRegister(19904),
      Net_1.Net.UnRegister(23411);
  }
  static OnTick(e) {
    !TimeOfDayController.lTo ||
      !TimeOfDayController._To ||
      TimeOfDayController.uTo ||
      TimeOfDayController.cTo ||
      ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState ||
      ((this.mTo += e), this.dTo(this.mTo), (this.mTo = 0));
  }
  static dTo(e) {
    var i = ModelManager_1.ModelManager.GameModeModel.IsMulti
        ? 1
        : ModelManager_1.ModelManager.TimeOfDayModel.TimeScale,
      e = TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(
        (e / TimeOfDayDefine_1.TOD_MILLIONSECOND_PER_SECOND) * i,
      );
    e <= 0 ||
      this.CTo(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second + e);
  }
  static gTo() {
    if (!Global_1.Global.BaseCharacter)
      return (
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("TimeOfDay", 27, "时间找不到角色"),
        !1
      );
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance())
      return (
        Log_1.Log.CheckInfo() && Log_1.Log.Info("TimeOfDay", 27, "时间在副本"),
        !1
      );
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti)
      return (
        Log_1.Log.CheckInfo() && Log_1.Log.Info("TimeOfDay", 27, "时间在联机"),
        !1
      );
    for (const e of ConfigManager_1.ConfigManager.TimeOfDayConfig.GetBanGamePlayTags())
      if (
        e &&
        Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity?.GetComponent(
          203,
        )?.HasTag(e.TagId)
      )
        return (
          Log_1.Log.CheckInfo() &&
            Log_1.Log.Info("TimeOfDay", 27, "时间在BanTag"),
          !1
        );
    return (
      !ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState ||
      (Log_1.Log.CheckInfo() && Log_1.Log.Info("TimeOfDay", 26, "时间被锁定"),
      !1)
    );
  }
  static CTo(e, i = !0) {
    let t = e;
    for (; t > TimeOfDayDefine_1.TOD_SECOND_PER_DAY; )
      t -= TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
    (ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second = t),
      this.SyncGlobalGameTime(t),
      this.fTo(t),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TodTimeChange),
      i &&
        !ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState &&
        this.pTo(e);
  }
  static pTo(e) {
    let i = e;
    i > TimeOfDayDefine_1.TOD_SECOND_PER_DAY && (i = 0);
    var t = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.DayState,
      t =
        (this.vTo !== t &&
          ((this.vTo = t),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DayStateChange,
          )),
        Time_1.Time.Now - this.MTo),
      t =
        (((t > SENDTIMEGAP &&
          i - this.ETo > TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE) ||
          this.ETo > i) &&
          this.SyncServerGameTime(i),
        Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR));
    t < this.STo &&
      ((e = Math.floor(
        (e - t * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) /
          TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR,
      )),
      this.yTo(1, t, e, Protocol_1.Aki.Protocol.C4s.Proto_TimeFlowAuto)),
      this.RecordLastHour(t);
  }
  static SyncServerGameTime(e) {
    var i, t;
    !GlobalData_1.GlobalData.World ||
      (ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        !ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) ||
      ((i = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR)),
      (t = Math.floor(
        (e - i * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) /
          TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR,
      )),
      this.yTo(0, i, t, Protocol_1.Aki.Protocol.C4s.Proto_TimeFlowAuto),
      (this.ETo = e),
      (this.MTo = Time_1.Time.Now));
  }
  static SyncGlobalGameTime(e) {
    !this.IsSyncToEngine ||
      (GlobalData_1.GlobalData.World &&
        !ModelManager_1.ModelManager.LoginModel.HasLoginPromise() &&
        ue_1.KuroRenderingRuntimeBPPluginBPLibrary.SetGlobalGITime(
          GlobalData_1.GlobalData.World,
          TimeOfDayModel_1.TodDayTime.ConvertToHour(e),
        ));
  }
  static fTo(e) {
    var i;
    GlobalData_1.GlobalData.World &&
      ((i = TimeOfDayController.ITo - e) > TimeOfDayController.TTo ||
        i < -TimeOfDayController.TTo) &&
      (AudioSystem_1.AudioSystem.SetRtpcValue(
        "time",
        TimeOfDayModel_1.TodDayTime.ConvertToHour(e),
      ),
      AudioSystem_1.AudioSystem.SetRtpcValue(
        "time_local",
        TimeUtil_1.TimeUtil.GetHoursFloat(),
      ),
      (TimeOfDayController.ITo = e));
  }
  static ChangeTimeScale(e) {
    ModelManager_1.ModelManager.TimeOfDayModel.TimeScale = e;
  }
  static PauseTime() {
    ModelManager_1.ModelManager.TimeOfDayModel.TimeScale = 0;
  }
  static ResumeTimeScale(e = !0) {
    ModelManager_1.ModelManager.TimeOfDayModel.TimeScale = e
      ? 1
      : ModelManager_1.ModelManager.TimeOfDayModel.OldTimeScale;
  }
  static ForcePauseTime() {
    TimeOfDayController.PauseTime(),
      (ModelManager_1.ModelManager.TimeOfDayModel.FreezeTimeScale = !0);
  }
  static ForceResumeTime() {
    (ModelManager_1.ModelManager.TimeOfDayModel.FreezeTimeScale = !1),
      TimeOfDayController.ResumeTimeScale();
  }
  static OnAddOpenViewCheckFunction() {
    UiManager_1.UiManager.AddOpenViewCheckFunction(
      "TimeOfDaySecondView",
      TimeOfDayController.iVe,
      "TimeOfDayController.CanOpenView",
    );
  }
  static OnRemoveOpenViewCheckFunction() {
    UiManager_1.UiManager.RemoveOpenViewCheckFunction(
      "TimeOfDaySecondView",
      TimeOfDayController.iVe,
    );
  }
  static SyncSceneTime(i, t, a, o = !1) {
    if (
      (ModelManager_1.ModelManager.TimeOfDayModel.SetPassSceneTime(
        ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second,
      ),
      void 0 !== i && void 0 !== t)
    ) {
      i =
        i *
          TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE *
          TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR +
        TimeOfDayModel_1.TodDayTime.ConvertFromMinute(t);
      let e = 0;
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        (e = TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(
          Number(
            MathUtils_1.MathUtils.LongToBigInt(a) /
              BigInt(TimeOfDayDefine_1.TOD_MILLIONSECOND_PER_SECOND),
          ) * ModelManager_1.ModelManager.TimeOfDayModel.TimeScale,
        )),
        (TimeOfDayController.lTo = !0);
      const r = i + e;
      o
        ? UiManager_1.UiManager.ResetToBattleView((e) => {
            e
              ? ((e = { SetTime: r }),
                UiManager_1.UiManager.OpenView(
                  "TimeOfDaySecondView",
                  e,
                  (e) => {
                    e || this.CTo(r, !1);
                  },
                ))
              : this.CTo(r, !1);
          })
        : this.CTo(r, !1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "TimeOfDay",
            26,
            "服务器同步Tod时间",
            ["second", r],
            ["showUi", o],
          );
    }
  }
  static AdjustTime(e, i, t = 0) {
    var a, o;
    !GlobalData_1.GlobalData.World ||
      (ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        !ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) ||
      (ModelManager_1.ModelManager.TimeOfDayModel.CacheTimeRecords(),
      (a = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR)),
      (o = Math.floor(
        (e - a * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) /
          TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR,
      )),
      this.yTo(t, a, o, i),
      this.CTo(e, !1),
      (this.ETo = e),
      this.RecordLastHour(a),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdjustTime));
  }
  static yTo(e, i, t, a) {
    var o;
    !GlobalData_1.GlobalData.World ||
      (ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        !ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) ||
      (((o = Protocol_1.Aki.Protocol.Qcs.create()).rjn = i),
      (o.ojn = t),
      (o.x9n = a),
      (o.njn = e),
      Net_1.Net.Call(22769, o, (e) => {
        e &&
          (e.Q4n !== Protocol_1.Aki.Protocol.Q4n.KRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.Q4n,
                18779,
              )
            : ModelManager_1.ModelManager.TimeOfDayModel.SetCurrentDay(e.aDs));
      }));
  }
  static CheckInMinuteSpan(e, i) {
    (e = [e, i]),
      (i = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Minute);
    return TimeOfDayModel_1.TodDayTime.CheckInMinuteSpan(i, e);
  }
  static AdjustTimeByMinute(e, i) {
    this.AdjustTime(TimeOfDayModel_1.TodDayTime.ConvertFromMinute(e), i);
  }
  static SetUiAnimFlag(e) {
    TimeOfDayController.cTo = e;
  }
  static RecordLastHour(e) {
    this.STo !== e &&
      ((this.STo = e),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CrossHour));
  }
  static OnClear() {
    return !0;
  }
}
(exports.TimeOfDayController = TimeOfDayController),
  ((_a = TimeOfDayController).IsSyncToEngine = !0),
  (TimeOfDayController.mTo = 0),
  (TimeOfDayController.vTo = 4),
  (TimeOfDayController.ITo = 0),
  (TimeOfDayController.ETo = 0),
  (TimeOfDayController.MTo = 0),
  (TimeOfDayController.STo = 0),
  (TimeOfDayController._To = !1),
  (TimeOfDayController.uTo = !1),
  (TimeOfDayController.cTo = !1),
  (TimeOfDayController.lTo = !1),
  (TimeOfDayController.TTo = 0.1 * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR),
  (TimeOfDayController.nTo = () => {
    TimeOfDayController._To = !0;
  }),
  (TimeOfDayController.SYi = () => {
    TimeOfDayController.uTo = !0;
  }),
  (TimeOfDayController.FWe = () => {
    (TimeOfDayController.uTo = !1),
      TimeOfDayController.SyncGlobalGameTime(
        ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second,
      );
  }),
  (TimeOfDayController.LZe = (e) => {
    1 === e
      ? TimeOfDayController.PauseTime()
      : 0 === e && TimeOfDayController.ResumeTimeScale();
  }),
  (TimeOfDayController.gSe = (e) => {
    ModelManager_1.ModelManager.TimeOfDayModel.PlayerAccount = e;
  }),
  (TimeOfDayController.iVe = (e) =>
    !!_a.gTo() ||
    (ScrollingTipsController_1.ScrollingTipsController.ShowTipsById(
      "TimeOfDayCantOpenView",
    ),
    !1)),
  (TimeOfDayController.sTo = (e) => {
    ModelManager_1.ModelManager.TimeOfDayModel.SetCurrentDay(e.aDs);
  }),
  (TimeOfDayController.aTo = (e) => {
    var i = e.ARs;
    TimeOfDayController.SyncSceneTime(i.rjn, i.ojn, i.FRs, e.lZ_);
  }),
  (TimeOfDayController.hTo = (e) => {
    e.Y5n
      ? ((ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateServer =
          !0),
        (ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateServer =
          !0),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "TimeOfDay",
            26,
            "[TimeRunLockState] 服务器通知锁定时间",
          ))
      : ((ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateServer =
          !1),
        (ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateServer =
          !1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "TimeOfDay",
            26,
            "[TimeRunLockState] 服务器通知解锁时间",
          ));
    var i = MathUtils_1.MathUtils.LongToNumber(e.rjn),
      e = MathUtils_1.MathUtils.LongToNumber(e.ojn);
    -1 !== i &&
      -1 !== e &&
      ((i = TimeOfDayModel_1.TodDayTime.ConvertFromHourMinute(i, e)),
      _a.CTo(i, !1));
  }),
  (TimeOfDayController.Awa = (e) => {
    1 === e.S0a
      ? (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "TimeOfDay",
            37,
            "[TimeResetNotify] 收到服务器4点跨天通知,触发跨天事件",
          ),
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CrossDay))
      : 4 === e.S0a &&
        (Log_1.Log.CheckInfo() &&
          Log_1.Log.Info(
            "TimeOfDay",
            37,
            "[TimeResetNotify] 收到服务器0点跨天通知,触发跨天事件",
          ),
        EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.CrossDayZone));
  });
//# sourceMappingURL=TimeOfDayController.js.map
