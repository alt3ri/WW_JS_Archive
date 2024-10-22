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
    Net_1.Net.Register(3185, TimeOfDayController.sTo),
      Net_1.Net.Register(2644, TimeOfDayController.aTo),
      Net_1.Net.Register(4102, TimeOfDayController.hTo);
  }
  static OnUnRegisterNetEvent() {
    Net_1.Net.UnRegister(3185), Net_1.Net.UnRegister(2644);
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
    var a = ModelManager_1.ModelManager.GameModeModel.IsMulti
        ? 1
        : ModelManager_1.ModelManager.TimeOfDayModel.TimeScale,
      e = TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(
        (e / TimeOfDayDefine_1.TOD_MILLIONSECOND_PER_SECOND) * a,
      );
    e <= 0 ||
      this.CTo(ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second + e);
  }
  static gTo() {
    if (!Global_1.Global.BaseCharacter)
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("TimeOfDay", 28, "时间找不到角色"),
        !1
      );
    if (ControllerHolder_1.ControllerHolder.GameModeController.IsInInstance())
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("TimeOfDay", 28, "时间在副本"),
        !1
      );
    if (ModelManager_1.ModelManager.GameModeModel.IsMulti)
      return (
        Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("TimeOfDay", 28, "时间在联机"),
        !1
      );
    for (const e of ConfigManager_1.ConfigManager.TimeOfDayConfig.GetBanGamePlayTags())
      if (
        e &&
        Global_1.Global.BaseCharacter.CharacterActorComponent?.Entity?.GetComponent(
          188,
        )?.HasTag(e.TagId)
      )
        return (
          Log_1.Log.CheckDebug() &&
            Log_1.Log.Debug("TimeOfDay", 28, "时间在BanTag"),
          !1
        );
    return (
      !ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState ||
      (Log_1.Log.CheckDebug() && Log_1.Log.Debug("TimeOfDay", 27, "时间被锁定"),
      !1)
    );
  }
  static CTo(e, a = !0) {
    let i = e;
    for (; i > TimeOfDayDefine_1.TOD_SECOND_PER_DAY; )
      i -= TimeOfDayDefine_1.TOD_SECOND_PER_DAY;
    (ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second = i),
      this.SyncGlobalGameTime(i),
      this.fTo(i),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.TodTimeChange),
      a &&
        !ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState &&
        this.pTo(e);
  }
  static pTo(e) {
    let a = e;
    a > TimeOfDayDefine_1.TOD_SECOND_PER_DAY && (a = 0);
    var i = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.DayState,
      i =
        (this.vTo !== i &&
          ((this.vTo = i),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.DayStateChange,
          )),
        Time_1.Time.Now - this.MTo),
      i =
        (((i > SENDTIMEGAP &&
          a - this.ETo > TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE) ||
          this.ETo > a) &&
          this.SyncServerGameTime(a),
        Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR));
    i < this.STo &&
      ((e = Math.floor(
        (e - i * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) /
          TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR,
      )),
      this.yTo(1, i, e, Protocol_1.Aki.Protocol.h4s.Proto_TimeFlowAuto)),
      (this.STo = i);
  }
  static SyncServerGameTime(e) {
    var a, i;
    !GlobalData_1.GlobalData.World ||
      (ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        !ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) ||
      ((a = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR)),
      (i = Math.floor(
        (e - a * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) /
          TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR,
      )),
      this.yTo(0, a, i, Protocol_1.Aki.Protocol.h4s.Proto_TimeFlowAuto),
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
    var a;
    GlobalData_1.GlobalData.World &&
      ((a = TimeOfDayController.ITo - e) > TimeOfDayController.TTo ||
        a < -TimeOfDayController.TTo) &&
      (AudioSystem_1.AudioSystem.SetRtpcValue(
        "time_game",
        TimeOfDayModel_1.TodDayTime.ConvertToHour(e),
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
  static SyncSceneTime(a, i, t) {
    if (
      (ModelManager_1.ModelManager.TimeOfDayModel.SetPassSceneTime(
        ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second,
      ),
      void 0 !== a && void 0 !== i)
    ) {
      a =
        a *
          TimeOfDayDefine_1.TOD_SECOND_PER_MINUTE *
          TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR +
        TimeOfDayModel_1.TodDayTime.ConvertFromMinute(i);
      let e = 0;
      ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        (e = TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(
          Number(
            MathUtils_1.MathUtils.LongToBigInt(t) /
              BigInt(TimeOfDayDefine_1.TOD_MILLIONSECOND_PER_SECOND),
          ) * ModelManager_1.ModelManager.TimeOfDayModel.TimeScale,
        )),
        (TimeOfDayController.lTo = !0),
        this.CTo(a + e, !1);
    }
  }
  static AdjustTime(e, a, i = 0) {
    var t, r;
    !GlobalData_1.GlobalData.World ||
      (ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        !ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) ||
      (ModelManager_1.ModelManager.TimeOfDayModel.CacheTimeRecords(),
      (t = Math.floor(e / TimeOfDayDefine_1.TOD_SECOND_PER_HOUR)),
      (r = Math.floor(
        (e - t * TimeOfDayDefine_1.TOD_SECOND_PER_HOUR) /
          TimeOfDayDefine_1.TOD_MINUTE_PER_HOUR,
      )),
      this.yTo(i, t, r, a),
      this.CTo(e, !1),
      (this.ETo = e),
      (this.STo = t),
      EventSystem_1.EventSystem.Emit(EventDefine_1.EEventName.AdjustTime));
  }
  static yTo(e, a, i, t) {
    var r;
    !GlobalData_1.GlobalData.World ||
      (ModelManager_1.ModelManager.GameModeModel.IsMulti &&
        !ModelManager_1.ModelManager.CreatureModel.IsMyWorld()) ||
      (((r = Protocol_1.Aki.Protocol.Fcs.create()).XHn = a),
      (r.$Hn = i),
      (r.E9n = t),
      (r.YHn = e),
      Net_1.Net.Call(13894, r, (e) => {
        e &&
          (e.O4n !== Protocol_1.Aki.Protocol.O4n.NRs
            ? ControllerHolder_1.ControllerHolder.ErrorCodeController.OpenErrorCodeTipView(
                e.O4n,
                1532,
              )
            : ModelManager_1.ModelManager.TimeOfDayModel.SetCurrentDay(e.eDs));
      }));
  }
  static CheckInMinuteSpan(e, a) {
    (e = [e, a]),
      (a = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Minute);
    return TimeOfDayModel_1.TodDayTime.CheckInMinuteSpan(a, e);
  }
  static AdjustTimeByMinute(e, a) {
    this.AdjustTime(TimeOfDayModel_1.TodDayTime.ConvertFromMinute(e), a);
  }
  static SetUiAnimFlag(e) {
    TimeOfDayController.cTo = e;
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
    ModelManager_1.ModelManager.TimeOfDayModel.SetCurrentDay(e.eDs);
  }),
  (TimeOfDayController.aTo = (e) => {
    e = e.ERs;
    TimeOfDayController.SyncSceneTime(e.XHn, e.$Hn, e.bRs);
  }),
  (TimeOfDayController.hTo = (e) => {
    e.UEs === Protocol_1.Aki.Protocol.e3s.j6n
      ? ((ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = !0),
        (ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState = !0))
      : ((ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = !1),
        (ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState = !1));
  });
//# sourceMappingURL=TimeOfDayController.js.map
