"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UiCameraLoadingAnimation = void 0);
const MathUtils_1 = require("../../../Core/Utils/MathUtils");
const UiCameraPostEffectComponent_1 = require("../UiCamera/UiCameraComponent/UiCameraPostEffectComponent");
const UiCameraManager_1 = require("../UiCamera/UiCameraManager");
class UiCameraLoadingAnimation {
  constructor() {
    (this.Cce = 0),
      (this.dUo = -0),
      (this.QAo = -0),
      (this.XAo = -0),
      (this.$Ao = -0),
      (this.YAo = -0),
      (this.IsPlaying = !1),
      (this.JAo = void 0),
      (this.JRo = void 0),
      (this.zAo = void 0);
  }
  Initialize() {}
  Play(i, t, s) {
    (this.JRo = UiCameraManager_1.UiCameraManager.Get()),
      (this.zAo = this.JRo.GetUiCameraComponent(
        UiCameraPostEffectComponent_1.UiCameraPostEffectComponent,
      )),
      (this.Cce = 0),
      (this.dUo = i),
      (this.$Ao = this.zAo.GetManualFocusDistance()),
      (this.YAo = this.zAo.GetCurrentAperture()),
      (this.QAo = t),
      (this.XAo = s),
      (this.IsPlaying = !0);
  }
  Stop() {
    (this.dUo = 0), (this.IsPlaying = !1), (this.JAo = void 0);
  }
  Tick(i) {
    let t, s;
    this.dUo &&
      this.IsPlaying &&
      (this.Cce >= this.dUo
        ? (this.JAo?.SetResult(), this.Stop())
        : ((t = MathUtils_1.MathUtils.Lerp(
            this.$Ao,
            this.QAo,
            this.Cce / this.dUo,
          )),
          (s = MathUtils_1.MathUtils.Lerp(
            this.YAo,
            this.XAo,
            this.Cce / this.dUo,
          )),
          this.zAo.SetCameraFocalDistance(t),
          this.zAo.SetCameraAperture(s),
          (this.Cce += 10)));
  }
}
exports.UiCameraLoadingAnimation = UiCameraLoadingAnimation;
// # sourceMappingURL=UiCameraLoadingAnimation.js.map
