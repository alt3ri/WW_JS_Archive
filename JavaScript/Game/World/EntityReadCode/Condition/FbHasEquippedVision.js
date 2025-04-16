"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHasEquippedVision = void 0);
class FbHasEquippedVision {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.s_h = !1),
      (this.Hye = void 0);
  }
  static Create(t) {
    if (t) return new FbHasEquippedVision(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Option() {
    return (
      this.s_h || ((this.s_h = !0), (this.Hye = this.FbDataInternal.option())),
      this.Hye
    );
  }
}
exports.FbHasEquippedVision = FbHasEquippedVision;
//# sourceMappingURL=FbHasEquippedVision.js.map
