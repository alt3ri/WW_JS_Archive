"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SignalDeviceModel = exports.ROWNUM = void 0);
const Log_1 = require("../../../Core/Common/Log");
const Protocol_1 = require("../../../Core/Define/Net/Protocol");
const ModelBase_1 = require("../../../Core/Framework/ModelBase");
const Net_1 = require("../../../Core/Net/Net");
const TimerSystem_1 = require("../../../Core/Timer/TimerSystem");
const Rotator_1 = require("../../../Core/Utils/Math/Rotator");
const IAction_1 = require("../../../UniverseEditor/Interface/IAction");
const EventDefine_1 = require("../../Common/Event/EventDefine");
const EventSystem_1 = require("../../Common/Event/EventSystem");
const TimeUtil_1 = require("../../Common/TimeUtil");
const UiManager_1 = require("../../Ui/UiManager");
const SignalDeviceController_1 = require("./SignalDeviceController");
exports.ROWNUM = 5;
class SignalDeviceModel extends ModelBase_1.ModelBase {
  constructor() {
    super(...arguments),
      (this.GridNum = exports.ROWNUM * exports.ROWNUM),
      (this.uPe = []),
      (this.cPe = []),
      (this.CurrentColor = IAction_1.EPieceColorType.White),
      (this.CacheRotator = Rotator_1.Rotator.Create(0, 0, 0)),
      (this.RotateMap = new Map([
        [0, 0],
        [4, -90],
        [3, 90],
        [1, 180],
        [2, 0],
      ]));
  }
  InitData(t) {
    this.uPe = new Array(this.GridNum);
    for (let e = 0; e < this.GridNum; e++)
      this.uPe[e] = { IsFinished: !1, Color: t[e].Color };
    this.mPe();
  }
  ResetData() {
    for (const e of this.uPe) e.IsFinished = !1;
    this.mPe(),
      EventSystem_1.EventSystem.Emit(
        EventDefine_1.EEventName.OnSignalDeviceReset,
      );
  }
  IsGridFinished(e) {
    return this.uPe[e]?.IsFinished;
  }
  GetGridColor(e) {
    return this.uPe[e]?.Color;
  }
  LinkingStart(e, t) {
    (this.CurrentColor = t), (this.cPe = [e]);
  }
  Linking(e) {
    const t = this.cPe[this.cPe.length - 1];
    !this.cPe.includes(e) && this.NeighboringType(t, e) !== 0 && this.dPe(e)
      ? (this.cPe.push(e),
        EventSystem_1.EventSystem.Emit(
          EventDefine_1.EEventName.OnSignalDeviceLinking,
          !0,
          t,
          this.uPe[t].Color === this.CurrentColor,
          e,
          this.uPe[e].Color === this.CurrentColor,
        ),
        this.uPe[e].Color === this.CurrentColor && this.CheckLinking(e))
      : this.cPe.length > 1 && this.cPe.indexOf(e) === this.cPe.length - 2
        ? (this.cPe.pop(),
          EventSystem_1.EventSystem.Emit(
            EventDefine_1.EEventName.OnSignalDeviceLinking,
            !1,
            t,
            this.uPe[t].Color === this.CurrentColor,
            e,
            this.uPe[e].Color === this.CurrentColor,
          ))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug("Temp", 36, "Linking Fail", ["index", e]);
  }
  NeighboringType(e, t) {
    const i = e - t;
    if (
      (i == -1 && t % exports.ROWNUM == 0) ||
      (i == 1 && e % exports.ROWNUM == 0)
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
  dPe(e) {
    return (
      (this.uPe[e].Color === IAction_1.EPieceColorType.White &&
        !this.uPe[e].IsFinished) ||
      this.uPe[e].Color === this.CurrentColor
    );
  }
  CheckLinking(e) {
    let t;
    this.cPe.length !== 0 &&
      ((t = this.cPe[this.cPe.length - 1]),
      this.GetGridColor(t) !== this.CurrentColor || this.cPe.length === 1
        ? this.CancelCurrentLinking()
        : this.MarkCurrentLinking());
  }
  MarkCurrentLinking() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnSignalDeviceLinkingCheck,
      !0,
      Array.from(this.cPe),
    );
    for (const e of this.cPe) this.uPe[e].IsFinished = !0;
    this.mPe(), this.CPe() && this.SDe();
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
    for (const e of this.uPe)
      if (e.Color !== IAction_1.EPieceColorType.White && !e.IsFinished)
        return !1;
    return !0;
  }
  SDe() {
    EventSystem_1.EventSystem.Emit(
      EventDefine_1.EEventName.OnSignalDeviceFinish,
    ),
      TimerSystem_1.TimerSystem.Delay(() => {
        const e = Protocol_1.Aki.Protocol.UKn.create();
        (e.ykn = "0"),
          (e.Ikn = Protocol_1.Aki.Protocol.dqs.Proto_SignalDevice),
          Net_1.Net.Call(19172, e, (e) => {
            e.uvs === Protocol_1.Aki.Protocol.lkn.Sys &&
              (this.gPe(),
              SignalDeviceController_1.SignalDeviceController.CallFinishCallback(),
              UiManager_1.UiManager.CloseView("SignalDeviceView"));
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
// # sourceMappingURL=SignalDeviceModel.js.map
