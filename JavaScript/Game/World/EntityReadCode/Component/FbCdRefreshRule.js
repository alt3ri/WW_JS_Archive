"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCdRefreshRule = void 0);
class FbCdRefreshRule {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.zDh = !1),
      (this.JDh = 0);
  }
  static Create(t) {
    if (t) return new FbCdRefreshRule(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Cd() {
    return (
      this.zDh || ((this.zDh = !0), (this.JDh = this.FbDataInternal.cd())),
      this.JDh
    );
  }
}
exports.FbCdRefreshRule = FbCdRefreshRule;
//# sourceMappingURL=FbCdRefreshRule.js.map
