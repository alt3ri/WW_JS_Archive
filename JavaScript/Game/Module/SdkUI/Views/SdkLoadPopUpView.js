"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SdkLoadPopUpView = void 0);
const Log_1 = require("../../../../Core/Common/Log"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  UiViewBase_1 = require("../../../Ui/Base/UiViewBase"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  TIMERGAP = 1e3;
class SdkLoadPopUpView extends UiViewBase_1.UiViewBase {
  constructor() {
    super(...arguments),
      (this.Pe = void 0),
      (this.TDe = void 0),
      (this.qnl = 0);
  }
  OnStart() {
    this.OpenParam && (this.Pe = this.OpenParam), this.Gnl();
  }
  R6t() {
    this.TDe &&
      (TimerSystem_1.TimerSystem.Remove(this.TDe), (this.TDe = void 0));
  }
  Gnl() {
    var e = this.Pe?.ForceCloseTime;
    e &&
      0 < e &&
      ((this.qnl = e),
      this.R6t(),
      (this.TDe = TimerSystem_1.TimerSystem.Forever(() => {
        this.qnl--,
          this.qnl < 0 &&
            (this.CloseMe(), Log_1.Log.CheckWarn()) &&
            Log_1.Log.Warn("KuroSdk", 27, "SDK:读取中弹窗触发自动关闭", [
              "reason",
              this.Pe.OpenReason,
            ]);
      }, TIMERGAP)));
  }
  OnBeforeShow() {
    UiLayer_1.UiLayer.SetShowMaskLayer("SdkLoading", !0);
  }
  OnBeforeHide() {
    UiLayer_1.UiLayer.SetShowMaskLayer("SdkLoading", !1), this.R6t();
  }
}
exports.SdkLoadPopUpView = SdkLoadPopUpView;
//# sourceMappingURL=SdkLoadPopUpView.js.map
