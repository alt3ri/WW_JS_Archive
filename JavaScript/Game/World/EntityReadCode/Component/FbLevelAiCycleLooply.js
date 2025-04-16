"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLevelAiCycleLooply = void 0);
class FbLevelAiCycleLooply {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.QRh = !1),
      (this.KRh = !1);
  }
  static Create(t) {
    if (t) return new FbLevelAiCycleLooply(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get IsCircle() {
    return (
      this.QRh ||
        ((this.QRh = !0), (this.KRh = this.FbDataInternal.isCircle())),
      this.KRh
    );
  }
}
exports.FbLevelAiCycleLooply = FbLevelAiCycleLooply;
//# sourceMappingURL=FbLevelAiCycleLooply.js.map
