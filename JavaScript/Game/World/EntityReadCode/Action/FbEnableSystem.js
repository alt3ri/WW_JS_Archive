"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnableSystem = void 0);
class FbEnableSystem {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.udh = !1),
      (this.ddh = void 0),
      (this.Dch = !1),
      (this.bSo = !1);
  }
  static Create(t) {
    if (t) return new FbEnableSystem(t);
  }
  get SystemType() {
    return (
      this.udh ||
        ((this.udh = !0), (this.ddh = this.FbDataInternal.systemType())),
      this.ddh
    );
  }
  get IsEnable() {
    return (
      this.Dch ||
        ((this.Dch = !0), (this.bSo = this.FbDataInternal.isEnable())),
      this.bSo
    );
  }
}
exports.FbEnableSystem = FbEnableSystem;
//# sourceMappingURL=FbEnableSystem.js.map
