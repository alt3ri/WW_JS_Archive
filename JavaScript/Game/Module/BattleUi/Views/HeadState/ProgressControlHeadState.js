"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ProgressControlHeadState = void 0);
const UE = require("ue");
const MathUtils_1 = require("../../../../../Core/Utils/MathUtils");
const HeadStateViewBase_1 = require("./HeadStateViewBase");
class ProgressControlHeadState extends HeadStateViewBase_1.HeadStateViewBase {
  constructor() {
    super(...arguments),
      (this.xht = 0),
      (this.OnProgressControlDataChange = (t) => {
        t.ProgressCtrlType === "CaptureStrategicPoint" &&
          this.M1t(t.CurrentValue / t.MaxValue);
      });
  }
  OnRegisterComponent() {
    this.ComponentRegisterInfos = [
      [0, UE.UISprite],
      [1, UE.UIText],
    ];
  }
  GetResourceId() {
    return "UiItem_BarInteractive";
  }
  ActiveBattleHeadState(t) {
    super.ActiveBattleHeadState(t);
    const e = this.GetSprite(0);
    const s = this.GetText(1);
    const r = e.GetStretchLeft();
    var i = e.GetParentAsUIItem().GetWidth();
    var i =
      ((this.xht = i - 2 * r),
      e.SetUIActive(!0),
      s.SetUIActive(!0),
      t.GetProgressControlData());
    i.ProgressCtrlType === "CaptureStrategicPoint" &&
      this.M1t(i.CurrentValue / i.MaxValue);
  }
  BindCallback() {
    super.BindCallback(),
      this.HeadStateData.BindOnProgressControlDataChange(
        this.OnProgressControlDataChange,
      );
  }
  M1t(t) {
    var e = MathUtils_1.MathUtils.Clamp(t, 0, 1) * this.xht;
    var e =
      (this.GetSprite(0).SetWidth(e),
      Math.round(MathUtils_1.MathUtils.RangeClamp(t, 0, 1, 0, 100)));
    this.GetText(1).SetText(e + "%");
  }
}
exports.ProgressControlHeadState = ProgressControlHeadState;
// # sourceMappingURL=ProgressControlHeadState.js.map
