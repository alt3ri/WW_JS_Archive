"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.SdkTipsPopUpView = void 0);
const UE = require("ue"),
  CommonDefine_1 = require("../../../../Core/Define/CommonDefine"),
  TimerSystem_1 = require("../../../../Core/Timer/TimerSystem"),
  UiTickViewBase_1 = require("../../../Ui/Base/UiTickViewBase"),
  UiLayer_1 = require("../../../Ui/UiLayer"),
  AUTOCLOSETIME = 10,
  LOGINCLOSETIME = 2e3;
class SdkTipsPopUpView extends UiTickViewBase_1.UiTickViewBase {
  constructor() {
    super(...arguments), (this.bWe = !1), (this.Pe = void 0), (this.Uqe = 0);
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UIItem],
      [1, UE.UIText],
      [2, UE.UIItem],
    ];
  }
  OnStart() {
    var e = this.OpenParam;
    1 === (this.Pe = e).ViewType
      ? this.UiViewSequence.AddSequenceFinishEvent("Start", () => {
          TimerSystem_1.TimerSystem.Delay(() => {
            this.bWe = !0;
          }, LOGINCLOSETIME);
        })
      : this.UiViewSequence.AddSequenceFinishEvent("Start", () => {
          this.UiViewSequence.PlaySequence("Loop");
        }),
      this.GetItem(2)?.SetUIActive(1 === e.ViewType),
      this.GetItem(0)?.SetUIActive(0 === e.ViewType),
      this.T2e(e);
  }
  OnBeforeShow() {
    this.Pe?.NeedMask && UiLayer_1.UiLayer.SetShowMaskLayer("SdkLoading", !0);
  }
  OnBeforeHide() {
    this.Pe?.NeedMask && UiLayer_1.UiLayer.SetShowMaskLayer("SdkLoading", !1);
  }
  OnTick(e) {
    this.bWe && this.IsShow && ((this.bWe = !1), this.CloseMe()),
      0 === this.Pe?.ViewType &&
        ((this.Uqe += e / CommonDefine_1.MILLIONSECOND_PER_SECOND),
        this.Uqe >= AUTOCLOSETIME) &&
        this.CloseMe();
  }
  T2e(e) {
    this.GetText(1)?.SetText(e.Text);
  }
}
exports.SdkTipsPopUpView = SdkTipsPopUpView;
//# sourceMappingURL=SdkTipsPopUpView.js.map
