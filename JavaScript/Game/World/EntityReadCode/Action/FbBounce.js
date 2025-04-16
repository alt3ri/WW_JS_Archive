"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBounce = void 0);
class FbBounce {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.mSh = !1),
      (this.CSh = 0),
      (this.Fph = !1),
      (this.Nph = 0),
      (this.gSh = !1),
      (this.fSh = void 0);
  }
  static Create(t) {
    if (t) return new FbBounce(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Height() {
    return (
      this.mSh || ((this.mSh = !0), (this.CSh = this.FbDataInternal.height())),
      this.CSh
    );
  }
  get Time() {
    return (
      this.Fph || ((this.Fph = !0), (this.Nph = this.FbDataInternal.time())),
      this.Nph
    );
  }
  get MotionCurve() {
    return (
      this.gSh ||
        ((this.gSh = !0), (this.fSh = this.FbDataInternal.motionCurve())),
      this.fSh
    );
  }
}
exports.FbBounce = FbBounce;
//# sourceMappingURL=FbBounce.js.map
