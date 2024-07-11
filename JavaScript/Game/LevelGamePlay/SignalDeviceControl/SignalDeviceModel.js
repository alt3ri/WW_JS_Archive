"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalDeviceModel = exports.ROWNUM = void 0);
const Log_1 = require("../../../Core/Common/Log"),
  Protocol_1 = require("../../../Core/Define/Net/Protocol"),
  ModelBase_1 = require("../../../Core/Framework/ModelBase"),
  Net_1 = require("../../../Core/Net/Net"),
  TimerSystem_1 = require("../../../Core/Timer/TimerSystem"),
  Rotator_1 = require("../../../Core/Utils/Math/Rotator"),
  IAction_1 = require("../../../UniverseEditor/Interface/IAction"),
  EventDefine_1 = require("../../Common/Event/EventDefine"),
  EventSystem_1 = require("../../Common/Event/EventSystem"),
  TimeUtil_1 = require("../../Common/TimeUtil"),
  SignalDeviceController_1 = require("./SignalDeviceController");
exports.ROWNUM = 5;
class SignalDeviceModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.GridNum = exports.ROWNUM * exports.ROWNUM),
      (this.uPe = []),
      (this.cPe = []),
      (this.CurrentColor = IAction_1.EPieceColorType.White),
      (this.CacheRotator = Rotator_1.Rotator.Create(0, 0, 0)),
      (this.ViewType = 0),
      (this.RotateMap = new Map([
        [0, 0],
        [4, -90],
        [3, 90],
        [1, 180],
        [2, 0],
      ]));
  }
  InitData(e) {
    this.uPe = new Array(this.GridNum);
    for (let t = 0; t < this.GridNum; t++)
      this.uPe[t] = { IsFinished: !1, Color: e[t].Color };
    this.mPe();
  }
  ResetData() {
    for (const t of this.uPe) t.IsFinished = !1;
    this.mPe(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSignalDeviceReset,
      );
  }
  IsGridFinished(t) {
    return this.uPe[t]?.IsFinished;
  }
  GetGridColor(t) {
    return this.uPe[t]?.Color;
  }
  LinkingStart(t, e) {
    (this.CurrentColor = e), (this.cPe = [t]);
  }
  Linking(t) {
    var e = this.cPe[this.cPe.length - 1];
    !this.cPe.includes(t) && 0 !== this.NeighboringType(e, t) && this.dPe(t)
      ? (this.cPe.push(t),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSignalDeviceLinking,
          !0,
          e,
          this.uPe[e].Color === this.CurrentColor,
          t,
          this.uPe[t].Color === this.CurrentColor,
        ),
        this.uPe[t].Color === this.CurrentColor && this.CheckLinking(t))
      : 1 < this.cPe.length && this.cPe.indexOf(t) === this.cPe.length - 2
        ? (this.cPe.pop(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSignalDeviceLinking,
            !1,
            e,
            this.uPe[e].Color === this.CurrentColor,
            t,
            this.uPe[t].Color === this.CurrentColor,
          ))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Temp", 36, "Linking Fail", ["index", t]);
  }
  NeighboringType(t, e) {
    var i = t - e;
    if (
      (-1 == i && e % exports.ROWNUM == 0) ||
      (1 == i && t % exports.ROWNUM == 0)
    )
      return 0;
    switch (i) {
      case 1:
        return 1;
      case -1:
        return 2;
      case exports.ROWNUM:
        return 3;
      case -exports.ROWNUM:
        return 4;
      default:
        return 0;
    }
  }
  dPe(t) {
    return (
      (this.uPe[t].Color === IAction_1.EPieceColorType.White &&
        !this.uPe[t].IsFinished) ||
      this.uPe[t].Color === this.CurrentColor
    );
  }
  CheckLinking(t) {
    var e;
    0 !== this.cPe.length &&
      ((e = this.cPe[this.cPe.length - 1]),
      this.GetGridColor(e) !== this.CurrentColor || 1 === this.cPe.length
        ? this.CancelCurrentLinking()
        : this.MarkCurrentLinking());
  }
  MarkCurrentLinking() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnSignalDeviceLinkingCheck,
      !0,
      Array.from(this.cPe),
    );
    for (const t of this.cPe) this.uPe[t].IsFinished = !0;
    this.mPe(), this.CPe() && this.EDe();
  }
  CancelCurrentLinking() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnSignalDeviceLinkingCheck,
      !1,
      Array.from(this.cPe),
    ),
      this.mPe();
  }
  CPe() {
    for (const t of this.uPe)
      if (t.Color !== IAction_1.EPieceColorType.White && !t.IsFinished)
        return !1;
    return !0;
  }
  EDe() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnSignalDeviceFinish,
    ),
      TimerSystem_1.TimerSystem.Delay(() => {
        var t = Protocol_1.Aki.Protocol.TJn.create();
        (t.z4n = "0"),
          (t.Z4n = Protocol_1.Aki.Protocol.t3s.Proto_SignalDevice),
          Net_1.Net.Call(5703, t, (t) => {
            t.DEs === Protocol_1.Aki.Protocol.O4n.NRs &&
              (this.gPe(),
              SignalDeviceController_1.SignalDeviceController.CallFinishCallback());
          });
      }, 1.7 * TimeUtil_1.TimeUtil.InverseMillisecond);
  }
  gPe() {
    (this.uPe.length = 0), this.mPe();
  }
  mPe() {
    (this.cPe.length = 0),
      (this.CurrentColor = IAction_1.EPieceColorType.White);
  }
}
exports.SignalDeviceModel = SignalDeviceModel;
//# sourceMappingURL=SignalDeviceModel.js.map
