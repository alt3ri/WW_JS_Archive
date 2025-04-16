"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAxisLockScreenConfig = void 0);
class FbAxisLockScreenConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.hTh = !1),
      (this.lTh = 0),
      (this.mch = !1),
      (this.Cch = 0),
      (this.pch = !1),
      (this.vch = 0);
  }
  static Create(t) {
    if (t) return new FbAxisLockScreenConfig(t);
  }
  get TriggerAngle() {
    return (
      this.hTh ||
        ((this.hTh = !0), (this.lTh = this.FbDataInternal.triggerAngle())),
      this.lTh
    );
  }
  get FadeInTime() {
    return (
      this.mch ||
        ((this.mch = !0), (this.Cch = this.FbDataInternal.fadeInTime())),
      this.Cch
    );
  }
  get FadeOutTime() {
    return (
      this.pch ||
        ((this.pch = !0), (this.vch = this.FbDataInternal.fadeOutTime())),
      this.vch
    );
  }
}
exports.FbAxisLockScreenConfig = FbAxisLockScreenConfig;
//# sourceMappingURL=FbAxisLockScreenConfig.js.map
