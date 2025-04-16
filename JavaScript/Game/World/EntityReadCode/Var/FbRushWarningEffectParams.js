"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRushWarningEffectParams = void 0);
class FbRushWarningEffectParams {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.H9h = !1),
      (this.W9h = 0),
      (this.V9h = !1),
      (this.j9h = 0),
      (this.Fph = !1),
      (this.Nph = 0);
  }
  static Create(t) {
    if (t) return new FbRushWarningEffectParams(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Length() {
    return (
      this.H9h || ((this.H9h = !0), (this.W9h = this.FbDataInternal.length())),
      this.W9h
    );
  }
  get Width() {
    return (
      this.V9h || ((this.V9h = !0), (this.j9h = this.FbDataInternal.width())),
      this.j9h
    );
  }
  get Time() {
    return (
      this.Fph || ((this.Fph = !0), (this.Nph = this.FbDataInternal.time())),
      this.Nph
    );
  }
}
exports.FbRushWarningEffectParams = FbRushWarningEffectParams;
//# sourceMappingURL=FbRushWarningEffectParams.js.map
