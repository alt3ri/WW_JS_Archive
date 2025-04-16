"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSoaringChallengeSettlement = void 0);
class FbSoaringChallengeSettlement {
  constructor(t) {
    (this.FbDataInternal = t), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(t) {
    if (t) return new FbSoaringChallengeSettlement(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbSoaringChallengeSettlement = FbSoaringChallengeSettlement;
//# sourceMappingURL=FbSoaringChallengeSettlement.js.map
