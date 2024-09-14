"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.ProgressControlHeadState = void 0);
const UE = require("ue"),
  MathUtils_1 = require("../../../../../Core/Utils/MathUtils"),
  HeadStateViewBase_1 = require("./HeadStateViewBase");
class ProgressControlHeadState extends HeadStateViewBase_1.HeadStateViewBase {
  constructor() {
    super(...arguments),
      (this.Wlt = 0),
      (this.OnProgressControlDataChange = (t) => {
        switch (t.ProgressCtrlType) {
          case "CaptureStrategicPoint":
          case "ChargingDevice":
            this.x_t(t.CurrentValue / t.MaxValue);
        }
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
    var e = this.GetSprite(0),
      s = this.GetText(1),
      i = e.GetStretchLeft(),
      a = e.GetParentAsUIItem().GetWidth(),
      r =
        ((this.Wlt = a - 2 * i),
        e.SetUIActive(!0),
        s.SetUIActive(!0),
        t.GetProgressControlData());
    switch (r.ProgressCtrlType) {
      case "CaptureStrategicPoint":
      case "ChargingDevice":
        this.x_t(r.CurrentValue / r.MaxValue);
    }
  }
  BindCallback() {
    super.BindCallback(),
      this.HeadStateData.BindOnProgressControlDataChange(
        this.OnProgressControlDataChange,
      );
  }
  x_t(t) {
    var e = MathUtils_1.MathUtils.Clamp(t, 0, 1) * this.Wlt,
      e =
        (this.GetSprite(0).SetWidth(e),
        Math.round(MathUtils_1.MathUtils.RangeClamp(t, 0, 1, 0, 100)));
    this.GetText(1).SetText(e + "%");
  }
}
exports.ProgressControlHeadState = ProgressControlHeadState;
//# sourceMappingURL=ProgressControlHeadState.js.map
