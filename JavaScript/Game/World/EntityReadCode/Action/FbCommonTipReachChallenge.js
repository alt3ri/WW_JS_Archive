"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCommonTipReachChallenge = void 0);
class FbCommonTipReachChallenge {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this._yh = !1),
      (this.cyh = void 0);
  }
  static Create(t) {
    if (t) return new FbCommonTipReachChallenge(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TidMainText() {
    return (
      this._yh ||
        ((this._yh = !0), (this.cyh = this.FbDataInternal.tidMainText())),
      this.cyh
    );
  }
}
exports.FbCommonTipReachChallenge = FbCommonTipReachChallenge;
//# sourceMappingURL=FbCommonTipReachChallenge.js.map
