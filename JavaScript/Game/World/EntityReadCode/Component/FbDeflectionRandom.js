"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDeflectionRandom = void 0);
class FbDeflectionRandom {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Oc1 = !1),
      (this.qc1 = 0),
      (this.Gc1 = !1),
      (this.Fc1 = !1);
  }
  static Create(t) {
    if (t) return new FbDeflectionRandom(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MaxAngleSpeed() {
    return (
      this.Oc1 ||
        ((this.Oc1 = !0), (this.qc1 = this.FbDataInternal.maxAngleSpeed())),
      this.qc1
    );
  }
  get IsReverse() {
    return (
      this.Gc1 ||
        ((this.Gc1 = !0), (this.Fc1 = this.FbDataInternal.isReverse())),
      this.Fc1
    );
  }
}
exports.FbDeflectionRandom = FbDeflectionRandom;
//# sourceMappingURL=FbDeflectionRandom.js.map
