"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbOpenTraceSpline = void 0);
class FbOpenTraceSpline {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.kuh = !1),
      (this.Guh = 0),
      (this.I_h = !1),
      (this.y6o = 0);
  }
  static Create(t) {
    if (t) return new FbOpenTraceSpline(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get SplineEntityId() {
    return (
      this.kuh ||
        ((this.kuh = !0), (this.Guh = this.FbDataInternal.splineEntityId())),
      this.Guh
    );
  }
  get Duration() {
    return (
      this.I_h ||
        ((this.I_h = !0), (this.y6o = this.FbDataInternal.duration())),
      this.y6o
    );
  }
}
exports.FbOpenTraceSpline = FbOpenTraceSpline;
//# sourceMappingURL=FbOpenTraceSpline.js.map
