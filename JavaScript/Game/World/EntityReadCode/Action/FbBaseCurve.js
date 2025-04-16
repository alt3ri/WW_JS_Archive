"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBaseCurve = void 0);
class FbBaseCurve {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.sTh = !1),
      (this.aTh = 0);
  }
  static Create(t) {
    if (t) return new FbBaseCurve(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get N() {
    return (
      this.sTh || ((this.sTh = !0), (this.aTh = this.FbDataInternal.n())),
      this.aTh
    );
  }
}
exports.FbBaseCurve = FbBaseCurve;
//# sourceMappingURL=FbBaseCurve.js.map
