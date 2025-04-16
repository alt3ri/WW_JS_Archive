"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonQteSingleClickContext = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  ControllerHolder_1 = require("../../../Manager/ControllerHolder"),
  QteDefine_1 = require("../QteDefine"),
  CommonQteContextBase_1 = require("./CommonQteContextBase");
class CommonQteSingleClickContext extends CommonQteContextBase_1.CommonQteContextBase {
  constructor() {
    super(),
      (this.PassTime = 0),
      (this.ResponseCount = 0),
      (this.TargetCount = -1),
      (this.Type = 0);
  }
  OnSetConfig(t) {
    this.TargetCount = 1;
  }
  OnResponse() {
    this.Config &&
      (this.IsPending() || this.IsPendingSuccess()
        ? (this.IsPending() && (this.ResponseCount += 1),
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
  OnUpdateTime(t) {
    this.Config
      ? ((this.PassTime += t),
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
      0 < (t = this.Config.BaseConfig.SingleClickConfig.UIConfig.Action) &&
      t < QteDefine_1.qteInputActions.length
      ? QteDefine_1.qteInputActions[t]
      : void 0;
  }
  OnGetUiConfig() {
    if (this.Config) return this.Config.BaseConfig.SingleClickConfig;
  }
  DC1() {
    return this.ResponseCount >= this.TargetCount;
  }
}
exports.CommonQteSingleClickContext = CommonQteSingleClickContext;
//# sourceMappingURL=CommonQteSingleClickContext.js.map
