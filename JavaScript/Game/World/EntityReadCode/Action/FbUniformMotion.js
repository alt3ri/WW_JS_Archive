"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbUniformMotion = void 0);
class FbUniformMotion {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Fph = !1),
      (this.Nph = 0);
  }
  static Create(t) {
    if (t) return new FbUniformMotion(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Time() {
    return (
      this.Fph || ((this.Fph = !0), (this.Nph = this.FbDataInternal.time())),
      this.Nph
    );
  }
}
exports.FbUniformMotion = FbUniformMotion;
//# sourceMappingURL=FbUniformMotion.js.map
