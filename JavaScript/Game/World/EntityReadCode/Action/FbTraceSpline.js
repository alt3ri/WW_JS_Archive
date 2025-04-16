"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbTraceSpline = void 0);
class FbTraceSpline {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.xEh = !1),
      (this.REh = void 0),
      (this.I_h = !1),
      (this.y6o = 0),
      (this.kuh = !1),
      (this.Guh = 0);
  }
  static Create(t) {
    if (t) return new FbTraceSpline(t);
  }
  get EffectPath() {
    return (
      this.xEh ||
        ((this.xEh = !0), (this.REh = this.FbDataInternal.effectPath())),
      this.REh
    );
  }
  get Duration() {
    return (
      this.I_h ||
        ((this.I_h = !0), (this.y6o = this.FbDataInternal.duration())),
      this.y6o
    );
  }
  get SplineEntityId() {
    return (
      this.kuh ||
        ((this.kuh = !0), (this.Guh = this.FbDataInternal.splineEntityId())),
      this.Guh
    );
  }
}
exports.FbTraceSpline = FbTraceSpline;
//# sourceMappingURL=FbTraceSpline.js.map
