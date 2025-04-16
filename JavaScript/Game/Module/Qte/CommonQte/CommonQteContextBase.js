"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.CommonQteContextBase = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  TimeUtil_1 = require("../../../Common/TimeUtil"),
  ModelManager_1 = require("../../../Manager/ModelManager");
class CommonQteContextBase {
  constructor() {
    (this.Type = void 0),
      (this.HandleId = -1),
      (this.QteId = 0),
      (this.Source = void 0),
      (this.State = 0),
      (this.Config = void 0),
      (this.Duration = 0),
      (this.LeastDuration = 0),
      (this.IsPermanent = !1),
      (this.SuccessCallback = void 0),
      (this.FailCallback = void 0);
  }
  IsPending() {
    return 0 === this.State;
  }
  IsPendingSuccess() {
    return 1 === this.State;
  }
  IsSuccess() {
    return 2 === this.State;
  }
  IsFail() {
    return 3 === this.State;
  }
  IsInvalid() {
    return 4 === this.State;
  }
  IsActive() {
    return (
      this.HandleId ===
      ModelManager_1.ModelManager.CommonQteModel?.GetQteHandleId()
    );
  }
  Response() {
    this.OnResponse();
  }
  OnResponse() {}
  QtePendingSuccess() {
    1 !== this.State && ((this.State = 1), this.OnQtePendingSuccess());
  }
  OnQtePendingSuccess() {}
  QteSuccess() {
    2 !== this.State &&
      ((this.State = 2),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "CommonQte",
          67,
          "通用Qte触发成功",
          ["HandleId", this.HandleId],
          ["QteId", this.QteId],
        ),
      this.OnQteSuccess());
  }
  OnQteSuccess() {}
  QteFail() {
    3 !== this.State &&
      ((this.State = 3),
      Log_1.Log.CheckDebug() &&
        Log_1.Log.Debug(
          "CommonQte",
          67,
          "通用Qte触发失败",
          ["HandleId", this.HandleId],
          ["Id", this.QteId],
        ),
      this.OnQteFail());
  }
  OnQteFail() {}
  UpdateTime(t) {
    this.OnUpdateTime(t);
  }
  OnUpdateTime(t) {}
  Clear() {
    this.IsPending() && (this.State = 4),
      this.OnClear(),
      (this.SuccessCallback = void 0),
      (this.FailCallback = void 0);
  }
  OnClear() {}
  GetAction() {
    return this.OnGetAction();
  }
  OnGetAction() {}
  SetConfig(t) {
    (this.Config = t).BaseConfig.Duration < 0
      ? (this.IsPermanent = !0)
      : (this.Duration =
          t.BaseConfig.Duration * TimeUtil_1.TimeUtil.InverseMillisecond),
      (this.LeastDuration =
        t.BaseConfig.LeastDuration * TimeUtil_1.TimeUtil.InverseMillisecond),
      this.OnSetConfig(t);
  }
  OnSetConfig(t) {}
  GetUiConfig() {
    return this.OnGetUiConfig();
  }
  OnGetUiConfig() {}
}
exports.CommonQteContextBase = CommonQteContextBase;
//# sourceMappingURL=CommonQteContextBase.js.map
