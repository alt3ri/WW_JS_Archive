"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDirectionFill = void 0);
class FbDirectionFill {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.iNh = !1),
      (this.rNh = !1),
      (this.oNh = !1),
      (this.nNh = !1),
      (this.Uuh = !1),
      (this.Duh = !1),
      (this.sNh = !1),
      (this.aNh = !1);
  }
  static Create(t) {
    if (t) return new FbDirectionFill(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get W() {
    return (
      this.iNh || ((this.iNh = !0), (this.rNh = this.FbDataInternal.w())),
      this.rNh
    );
  }
  get S() {
    return (
      this.oNh || ((this.oNh = !0), (this.nNh = this.FbDataInternal.s())),
      this.nNh
    );
  }
  get A() {
    return (
      this.Uuh || ((this.Uuh = !0), (this.Duh = this.FbDataInternal.a())),
      this.Duh
    );
  }
  get D() {
    return (
      this.sNh || ((this.sNh = !0), (this.aNh = this.FbDataInternal.d())),
      this.aNh
    );
  }
}
exports.FbDirectionFill = FbDirectionFill;
//# sourceMappingURL=FbDirectionFill.js.map
