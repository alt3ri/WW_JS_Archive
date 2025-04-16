"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCommonTipEnterInRange = void 0);
class FbCommonTipEnterInRange {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.myh = !1),
      (this.Cyh = void 0);
  }
  static Create(t) {
    if (t) return new FbCommonTipEnterInRange(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TidText() {
    return (
      this.myh || ((this.myh = !0), (this.Cyh = this.FbDataInternal.tidText())),
      this.Cyh
    );
  }
}
exports.FbCommonTipEnterInRange = FbCommonTipEnterInRange;
//# sourceMappingURL=FbCommonTipEnterInRange.js.map
