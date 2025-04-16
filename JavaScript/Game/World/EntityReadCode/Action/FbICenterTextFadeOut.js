"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbICenterTextFadeOut = void 0);
class FbICenterTextFadeOut {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.mch = !1),
      (this.Cch = 0),
      (this.pch = !1),
      (this.vch = 0);
  }
  static Create(t) {
    if (t) return new FbICenterTextFadeOut(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
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
exports.FbICenterTextFadeOut = FbICenterTextFadeOut;
//# sourceMappingURL=FbICenterTextFadeOut.js.map
