"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotTimeOfDay = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  ModelManager_1 = require("../../Manager/ModelManager"),
  TimeOfDayController_1 = require("../TimeOfDay/TimeOfDayController"),
  TimeOfDayDefine_1 = require("../TimeOfDay/TimeOfDayDefine"),
  TimeOfDayModel_1 = require("../TimeOfDay/TimeOfDayModel");
class PlotTimeOfDay {
  constructor() {
    (this._zi = !1),
      (this.uzi = !1),
      (this.Uk = !1),
      (this.czi = 0),
      (this.mzi = 0),
      (this.IRe = void 0);
  }
  OnPlotStart(e) {
    this.uzi ||
      ((this.uzi = e) &&
        ((this._zi = !0),
        ModelManager_1.ModelManager.TimeOfDayModel.SetUseClientLockState(!0),
        (ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateClient =
          !0),
        (ModelManager_1.ModelManager.TimeOfDayModel.TimeSyncLockStateClient =
          !0),
        (this.czi =
          ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second)));
  }
  OnSeqStart() {
    this.gzi(),
      (this.mzi = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second),
      (this.Uk = !1);
  }
  OnSeqEnd() {
    this.gzi(),
      (ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateClient =
        this._zi),
      this.Uk &&
        0 !== this.mzi &&
        this.mzi !==
          ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second &&
        TimeOfDayController_1.TimeOfDayController.AdjustTime(
          this.mzi,
          Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto,
        ),
      (this.Uk = !1),
      (this.mzi = 0);
  }
  OnPlotEnd() {
    this.uzi &&
      (ModelManager_1.ModelManager.TimeOfDayModel.SetUseClientLockState(!1),
      (ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateClient = !1),
      (ModelManager_1.ModelManager.TimeOfDayModel.TimeSyncLockStateClient = !1),
      0 !== this.czi &&
        this.czi !==
          ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second &&
        TimeOfDayController_1.TimeOfDayController.AdjustTime(
          this.czi,
          Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto,
        ),
      (this.czi = 0),
      (this.uzi = !1),
      (this._zi = !1));
  }
  PauseTime() {
    this._zi ||
      ((ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateClient = !0),
      (this._zi = !0),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("TimeOfDay", 26, "[TimeRunLockState] 剧情行为锁定时间"));
  }
  ResumeTime() {
    this._zi &&
      ((ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateClient = !1),
      Log_1.Log.CheckInfo() &&
        Log_1.Log.Info("TimeOfDay", 26, "[TimeRunLockState] 剧情行为解锁时间"),
      (this._zi = !1));
  }
  SetTime(e) {
    TimeOfDayController_1.TimeOfDayController.AdjustTime(
      e,
      Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto,
    );
  }
  SetTimeDuration(o, e, t, r) {
    this.gzi(), (this.Uk = o);
    let a = e;
    if ((a > TimeOfDayDefine_1.TOD_SECOND_PER_DAY && (a = 0), r <= 0))
      TimeOfDayController_1.TimeOfDayController.AdjustTime(
        a,
        Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto,
      );
    else {
      let e = t;
      (e = e > TimeOfDayDefine_1.TOD_SECOND_PER_DAY ? 0 : e) < a &&
        (e += TimeOfDayDefine_1.TOD_SECOND_PER_DAY);
      o = TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(r);
      let i = 1;
      0 < o && (i = (e - a) / o),
        (ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateClient =
          !1),
        Log_1.Log.CheckInfo() &&
          Log_1.Log.Info("TimeOfDay", 26, "[TimeRunLockState] Seq解锁时间"),
        TimeOfDayController_1.TimeOfDayController.AdjustTime(
          a,
          Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto,
        ),
        TimeOfDayController_1.TimeOfDayController.ChangeTimeScale(i),
        (this.IRe = TimerSystem_1.TimerSystem.Delay(() => {
          TimeOfDayController_1.TimeOfDayController.AdjustTime(
            t,
            Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto,
          ),
            (this.IRe = void 0),
            TimeOfDayController_1.TimeOfDayController.ResumeTimeScale(),
            (ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockStateClient =
              this._zi),
            Log_1.Log.CheckInfo() &&
              Log_1.Log.Info(
                "TimeOfDay",
                26,
                "[TimeRunLockState] Seq恢复时间锁定",
                ["IsPauseInPlot", this._zi],
              );
        }, r * TimeUtil_1.TimeUtil.InverseMillisecond));
    }
  }
  gzi() {
    this.IRe &&
      (TimerSystem_1.TimerSystem.Has(this.IRe) &&
        TimerSystem_1.TimerSystem.Remove(this.IRe),
      TimeOfDayController_1.TimeOfDayController.ResumeTimeScale(),
      (this.IRe = void 0));
  }
}
exports.PlotTimeOfDay = PlotTimeOfDay;
//# sourceMappingURL=PlotTimeOfDay.js.map
