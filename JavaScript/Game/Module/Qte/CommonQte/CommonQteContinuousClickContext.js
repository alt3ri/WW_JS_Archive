"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonQteContinuousClickContext = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  MathUtils_1 = require("../../../../Core/Utils/MathUtils"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  QteDefine_1 = require("../QteDefine"),
  CommonQteContextBase_1 = require("./CommonQteContextBase");
class CommonQteContinuousClickContext extends CommonQteContextBase_1.CommonQteContextBase {
  constructor() {
    super(),
      (this.PassTime = 0),
      (this.CurrentEnergyPercent = 0),
      (this.TargetEnergyPercent = -1),
      (this.DeltaEnergyPercentPerResponse = 0),
      (this.DeltaEnergyPercentPerMs = 0),
      (this.Type = 1);
  }
  OnSetConfig(t) {
    t = t.BaseConfig.ContinuousClickConfig;
    (this.CurrentEnergyPercent = t.InitialEnergyPercent),
      (this.TargetEnergyPercent = t.TargetEnergyPercent),
      (this.DeltaEnergyPercentPerMs =
        t.DeltaEnergyPercentPerSecond * TimeUtil_1.TimeUtil.Millisecond),
      (this.DeltaEnergyPercentPerResponse = t.DeltaEnergyPercentPerClick);
  }
  OnResponse() {
    this.Config &&
      (this.IsPending() || this.IsPendingSuccess()
        ? (this.IsPending() &&
            (this.CurrentEnergyPercent = MathUtils_1.MathUtils.Clamp(
              this.CurrentEnergyPercent + this.DeltaEnergyPercentPerResponse,
              0,
              100,
            )),
          this.DC1() &&
            (this.PassTime < this.LeastDuration
              ? this.QtePendingSuccess()
              : this.QteSuccess()))
        : Log_1.Log.CheckDebug() &&
          Log_1.Log.Debug(
            "CommonQte",
            67,
            "Qte无法接收响应",
            ["HandleId", this.HandleId],
            ["QteId", this.QteId],
            ["State", this.State],
          ));
  }
  OnQteSuccess() {
    this.SuccessCallback && this.SuccessCallback(this),
      (this.SuccessCallback = void 0),
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(
        this.HandleId,
      );
  }
  OnQteFail() {
    this.FailCallback && this.FailCallback(this),
      (this.FailCallback = void 0),
      ControllerHolder_1.ControllerHolder.CommonQteController.StopQte(
        this.HandleId,
      );
  }
  DC1() {
    var t =
        0 < this.DeltaEnergyPercentPerResponse &&
        this.CurrentEnergyPercent >= this.TargetEnergyPercent,
      i =
        this.DeltaEnergyPercentPerResponse < 0 &&
        this.CurrentEnergyPercent <= this.TargetEnergyPercent;
    return t || i;
  }
  OnUpdateTime(t) {
    this.Config
      ? ((this.PassTime += t),
        this.IsPending() &&
          (this.CurrentEnergyPercent = MathUtils_1.MathUtils.Clamp(
            this.CurrentEnergyPercent + this.DeltaEnergyPercentPerMs * t,
            0,
            100,
          )),
        this.DC1()
          ? this.PassTime < this.LeastDuration
            ? this.QtePendingSuccess()
            : this.QteSuccess()
          : !this.IsPermanent &&
            this.PassTime > this.Duration &&
            this.QteFail())
      : (Log_1.Log.CheckError() &&
          Log_1.Log.Error("CommonQte", 67, "Context中获取不到Config", [
            "QteId",
            this.QteId,
          ]),
        ControllerHolder_1.ControllerHolder.CommonQteController.StopCurrentQte());
  }
  OnGetAction() {
    var t;
    return this.Config &&
      0 < (t = this.Config.BaseConfig.ContinuousClickConfig.UIConfig.Action) &&
      t < QteDefine_1.qteInputActions.length
      ? QteDefine_1.qteInputActions[t]
      : void 0;
  }
  OnGetUiConfig() {
    if (this.Config) return this.Config.BaseConfig.ContinuousClickConfig;
  }
}
exports.CommonQteContinuousClickContext = CommonQteContinuousClickContext;
//# sourceMappingURL=CommonQteContinuousClickContext.js.map
