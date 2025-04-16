"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMontageAsset = void 0);
class FbMontageAsset {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.hRh = !1),
      (this.lRh = void 0);
  }
  static Create(t) {
    if (t) return new FbMontageAsset(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Asset() {
    return (
      this.hRh || ((this.hRh = !0), (this.lRh = this.FbDataInternal.asset())),
      this.lRh
    );
  }
}
exports.FbMontageAsset = FbMontageAsset;
//# sourceMappingURL=FbMontageAsset.js.map
