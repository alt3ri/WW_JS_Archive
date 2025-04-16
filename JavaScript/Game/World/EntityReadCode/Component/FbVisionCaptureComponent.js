"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVisionCaptureComponent = void 0);
class FbVisionCaptureComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.uVh = !1),
      (this.dVh = 0),
      (this.mVh = !1),
      (this.CVh = 0);
  }
  static Create(t) {
    if (t) return new FbVisionCaptureComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get VisionCaptureId() {
    return (
      this.uVh ||
        ((this.uVh = !0), (this.dVh = this.FbDataInternal.visionCaptureId())),
      this.dVh
    );
  }
  get VisionCaptureProb() {
    return (
      this.mVh ||
        ((this.mVh = !0), (this.CVh = this.FbDataInternal.visionCaptureProb())),
      this.CVh
    );
  }
}
exports.FbVisionCaptureComponent = FbVisionCaptureComponent;
//# sourceMappingURL=FbVisionCaptureComponent.js.map
