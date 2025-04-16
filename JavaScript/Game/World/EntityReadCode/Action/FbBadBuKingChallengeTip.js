"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbBadBuKingChallengeTip = void 0);
class FbBadBuKingChallengeTip {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.hyh = !1),
      (this.lyh = void 0);
  }
  static Create(t) {
    if (t) return new FbBadBuKingChallengeTip(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get WarningText() {
    return (
      this.hyh ||
        ((this.hyh = !0), (this.lyh = this.FbDataInternal.warningText())),
      this.lyh
    );
  }
}
exports.FbBadBuKingChallengeTip = FbBadBuKingChallengeTip;
//# sourceMappingURL=FbBadBuKingChallengeTip.js.map
