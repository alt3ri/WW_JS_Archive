"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotTimeOfDay = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol"),
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
      (this.dzi = !1),
      (this.Czi = !1),
      (this.IRe = void 0);
  }
  OnPlotStart(e) {
    this.uzi ||
      ((this.uzi = e) &&
        ((this._zi = !0),
        (this.dzi =
          ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState),
        (this.Czi =
          ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState),
        (ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = !0),
        (ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState = !0),
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
      (ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = this._zi),
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
      ((ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = this.dzi),
      (ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState = this.Czi),
      this.dzi &&
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
      ((ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = !0),
      (this._zi = !0));
  }
  ResumeTime() {
    this._zi &&
      ((ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = !1),
      (this._zi = !1));
  }
  SetTime(e) {
    TimeOfDayController_1.TimeOfDayController.AdjustTime(
      e,
      Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto,
    );
  }
  SetTimeDuration(t, e, o, r) {
    this.gzi(), (this.Uk = t);
    let a = e;
    if ((a > TimeOfDayDefine_1.TOD_SECOND_PER_DAY && (a = 0), r <= 0))
      TimeOfDayController_1.TimeOfDayController.AdjustTime(
        a,
        Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto,
      );
    else {
      let e = o;
      (e = e > TimeOfDayDefine_1.TOD_SECOND_PER_DAY ? 0 : e) < a &&
        (e += TimeOfDayDefine_1.TOD_SECOND_PER_DAY);
      t = TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(r);
      let i = 1;
      0 < t && (i = (e - a) / t),
        (ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = !1),
        TimeOfDayController_1.TimeOfDayController.AdjustTime(
          a,
          Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto,
        ),
        TimeOfDayController_1.TimeOfDayController.ChangeTimeScale(i),
        (this.IRe = TimerSystem_1.TimerSystem.Delay(() => {
          TimeOfDayController_1.TimeOfDayController.AdjustTime(
            o,
            Protocol_1.Aki.Protocol.C4s.Proto_LevelPlayAuto,
          ),
            (this.IRe = void 0),
            TimeOfDayController_1.TimeOfDayController.ResumeTimeScale(),
            (ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState =
              this._zi);
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
