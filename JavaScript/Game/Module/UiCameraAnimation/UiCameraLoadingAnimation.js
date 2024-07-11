"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraLoadingAnimation = void 0);
const MathUtils_1 = require("../../../Core/Utils/MathUtils"),
  UiCameraPostEffectComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraPostEffectComponent"),
  UiCameraManager_1 = require("../UiCamera/UiCameraManager");
class UiCameraLoadingAnimation {
  constructor() {
    (this.Cce = 0),
      (this.uAo = -0),
      (this.jPo = -0),
      (this.WPo = -0),
      (this.KPo = -0),
      (this.QPo = -0),
      (this.IsPlaying = !1),
      (this.XPo = void 0),
      (this.XUo = void 0),
      (this.$Po = void 0);
  }
  Initialize() {}
  Play(i, t, s) {
    (this.XUo = UiCameraManager_1.UiCameraManager.Get()),
      (this.$Po = this.XUo.GetUiCameraComponent(
        UiCameraPostEffectComponent_1.UiCameraPostEffectComponent,
      )),
      (this.Cce = 0),
      (this.uAo = i),
      (this.KPo = this.$Po.GetManualFocusDistance()),
      (this.QPo = this.$Po.GetCurrentAperture()),
      (this.jPo = t),
      (this.WPo = s),
      (this.IsPlaying = !0);
  }
  Stop() {
    (this.uAo = 0), (this.IsPlaying = !1), (this.XPo = void 0);
  }
  Tick(i) {
    var t, s;
    this.uAo &&
      this.IsPlaying &&
      (this.Cce >= this.uAo
        ? (this.XPo?.SetResult(), this.Stop())
        : ((t = MathUtils_1.MathUtils.Lerp(
            this.KPo,
            this.jPo,
            this.Cce / this.uAo,
          )),
          (s = MathUtils_1.MathUtils.Lerp(
            this.QPo,
            this.WPo,
            this.Cce / this.uAo,
          )),
          this.$Po.SetCameraFocalDistance(t),
          this.$Po.SetCameraAperture(s),
          (this.Cce += 10)));
  }
}
exports.UiCameraLoadingAnimation = UiCameraLoadingAnimation;
//# sourceMappingURL=UiCameraLoadingAnimation.js.map
