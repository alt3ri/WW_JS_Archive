"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.PlotTimeOfDay = void 0);
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const ModelManager_1 = require("../../Manager/ModelManager");
const TimeOfDayController_1 = require("../TimeOfDay/TimeOfDayController");
const TimeOfDayDefine_1 = require("../TimeOfDay/TimeOfDayDefine");
const TimeOfDayModel_1 = require("../TimeOfDay/TimeOfDayModel");
class PlotTimeOfDay {
  constructor() {
    (this.cJi = !1),
      (this.mJi = !1),
      (this.Uk = !1),
      (this.dJi = 0),
      (this.CJi = 0),
      (this.gJi = !1),
      (this.fJi = !1),
      (this.IRe = void 0);
  }
  OnPlotStart(e) {
    this.mJi ||
      ((this.mJi = e) &&
        ((this.cJi = !0),
        (this.gJi =
          ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState),
        (this.fJi =
          ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState),
        (ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = !0),
        (ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState = !0),
        (this.dJi =
          ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second)));
  }
  OnSeqStart() {
    this.pJi(),
      (this.CJi = ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second),
      (this.Uk = !1);
  }
  OnSeqEnd() {
    this.pJi(),
      (ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = this.cJi),
      this.Uk &&
        this.CJi !== 0 &&
        this.CJi !==
          ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second &&
        TimeOfDayController_1.TimeOfDayController.AdjustTime(
          this.CJi,
          Protocol_1.Aki.Protocol.pOs.Proto_LevelPlayAuto,
        ),
      (this.Uk = !1),
      (this.CJi = 0);
  }
  OnPlotEnd() {
    this.mJi &&
      ((ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = this.gJi),
      (ModelManager_1.ModelManager.TimeOfDayModel.TimeSynLockState = this.fJi),
      this.gJi &&
        this.dJi !== 0 &&
        this.dJi !==
          ModelManager_1.ModelManager.TimeOfDayModel.GameTime.Second &&
        TimeOfDayController_1.TimeOfDayController.AdjustTime(
          this.dJi,
          Protocol_1.Aki.Protocol.pOs.Proto_LevelPlayAuto,
        ),
      (this.dJi = 0),
      (this.mJi = !1),
      (this.cJi = !1));
  }
  PauseTime() {
    this.cJi ||
      ((ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = !0),
      (this.cJi = !0));
  }
  ResumeTime() {
    this.cJi &&
      ((ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = !1),
      (this.cJi = !1));
  }
  SetTime(e) {
    TimeOfDayController_1.TimeOfDayController.AdjustTime(
      e,
      Protocol_1.Aki.Protocol.pOs.Proto_LevelPlayAuto,
    );
  }
  SetTimeDuration(t, e, o, r) {
    this.pJi(), (this.Uk = t);
    let a = e;
    if ((a > TimeOfDayDefine_1.TOD_SECOND_PER_DAY && (a = 0), r <= 0))
      TimeOfDayController_1.TimeOfDayController.AdjustTime(
        a,
        Protocol_1.Aki.Protocol.pOs.Proto_LevelPlayAuto,
      );
    else {
      let e = o;
      (e = e > TimeOfDayDefine_1.TOD_SECOND_PER_DAY ? 0 : e) < a &&
        (e += TimeOfDayDefine_1.TOD_SECOND_PER_DAY);
      t = TimeOfDayModel_1.TodDayTime.ConvertFromRealTimeSecond(r);
      let i = 1;
      t > 0 && (i = (e - a) / t),
        (ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState = !1),
        TimeOfDayController_1.TimeOfDayController.AdjustTime(
          a,
          Protocol_1.Aki.Protocol.pOs.Proto_LevelPlayAuto,
        ),
        TimeOfDayController_1.TimeOfDayController.ChangeTimeScale(i),
        (this.IRe = TimerSystem_1.TimerSystem.Delay(() => {
          TimeOfDayController_1.TimeOfDayController.AdjustTime(
            o,
            Protocol_1.Aki.Protocol.pOs.Proto_LevelPlayAuto,
          ),
            (this.IRe = void 0),
            TimeOfDayController_1.TimeOfDayController.ResumeTimeScale(),
            (ModelManager_1.ModelManager.TimeOfDayModel.TimeRunLockState =
              this.cJi);
        }, r * TimeUtil_1.TimeUtil.InverseMillisecond));
    }
  }
  pJi() {
    this.IRe &&
      (TimerSystem_1.TimerSystem.Has(this.IRe) &&
        TimerSystem_1.TimerSystem.Remove(this.IRe),
      TimeOfDayController_1.TimeOfDayController.ResumeTimeScale(),
      (this.IRe = void 0));
  }
}
exports.PlotTimeOfDay = PlotTimeOfDay;
// # sourceMappingURL=PlotTimeOfDay.js.map
