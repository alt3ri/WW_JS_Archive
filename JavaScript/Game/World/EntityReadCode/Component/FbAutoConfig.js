"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAutoConfig = void 0);
class FbAutoConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.QRh = !1),
      (this.KRh = !1),
      (this.W6h = !1),
      (this.e6o = 0);
  }
  static Create(t) {
    if (t) return new FbAutoConfig(t);
  }
  get IsCircle() {
    return (
      this.QRh ||
        ((this.QRh = !0), (this.KRh = this.FbDataInternal.isCircle())),
      this.KRh
    );
  }
  get Interval() {
    return (
      this.W6h ||
        ((this.W6h = !0), (this.e6o = this.FbDataInternal.interval())),
      this.e6o
    );
  }
}
exports.FbAutoConfig = FbAutoConfig;
//# sourceMappingURL=FbAutoConfig.js.map
