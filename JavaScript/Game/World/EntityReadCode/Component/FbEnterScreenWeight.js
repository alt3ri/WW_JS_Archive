"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnterScreenWeight = void 0);
class FbEnterScreenWeight {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.jDh = !1),
      (this.HDh = 0);
  }
  static Create(t) {
    if (t) return new FbEnterScreenWeight(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Weight() {
    return (
      this.jDh || ((this.jDh = !0), (this.HDh = this.FbDataInternal.weight())),
      this.HDh
    );
  }
}
exports.FbEnterScreenWeight = FbEnterScreenWeight;
//# sourceMappingURL=FbEnterScreenWeight.js.map
