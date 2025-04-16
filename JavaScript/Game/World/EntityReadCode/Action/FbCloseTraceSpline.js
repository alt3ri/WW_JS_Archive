"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCloseTraceSpline = void 0);
class FbCloseTraceSpline {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.kuh = !1),
      (this.Guh = 0);
  }
  static Create(t) {
    if (t) return new FbCloseTraceSpline(t);
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
}
exports.FbCloseTraceSpline = FbCloseTraceSpline;
//# sourceMappingURL=FbCloseTraceSpline.js.map
