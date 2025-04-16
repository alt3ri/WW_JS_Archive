"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SdkEnterTipsView = void 0);
const UE = require("ue"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiLayer_1 = require("../../../Ui/UiLayer");
class SdkEnterTipsView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), (this.bWe = !1), (this.Pe = void 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [1, UE.UIItem],
      [0, UE.UIText],
    ];
  }
  OnStart() {
    (this.Pe = this.OpenParam),
      this.UiViewSequence.AddSequenceFinishEvent("Start", () => {
        this.bWe = !0;
      }),
      this.T2e(this.Pe);
  }
  OnBeforeShow() {
    this.Pe?.NeedMask && UiLayer_1.UiLayer.SetShowMaskLayer("SdkLoading", !0);
  }
  OnBeforeHide() {
    this.Pe?.NeedMask && UiLayer_1.UiLayer.SetShowMaskLayer("SdkLoading", !1);
  }
  OnTick(i) {
    this.bWe && this.IsShow && ((this.bWe = !1), this.CloseMe());
  }
  T2e(i) {
    this.GetText(0)?.SetText(i.Text);
  }
}
exports.SdkEnterTipsView = SdkEnterTipsView;
//# sourceMappingURL=SdkEnterTipsView.js.map
