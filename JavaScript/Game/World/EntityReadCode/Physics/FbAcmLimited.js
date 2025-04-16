"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAcmLimited = void 0);
class FbAcmLimited {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.SZh = !1),
      (this.MZh = 0);
  }
  static Create(t) {
    if (t) return new FbAcmLimited(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get LimitValue() {
    return (
      this.SZh ||
        ((this.SZh = !0), (this.MZh = this.FbDataInternal.limitValue())),
      this.MZh
    );
  }
}
exports.FbAcmLimited = FbAcmLimited;
//# sourceMappingURL=FbAcmLimited.js.map
