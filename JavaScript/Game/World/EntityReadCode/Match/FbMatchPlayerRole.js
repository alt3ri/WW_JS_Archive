"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMatchPlayerRole = void 0);
class FbMatchPlayerRole {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.cZh = !1),
      (this.uZh = !1);
  }
  static Create(t) {
    if (t) return new FbMatchPlayerRole(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get MatchPhantomSkill() {
    return (
      this.cZh ||
        ((this.cZh = !0), (this.uZh = this.FbDataInternal.matchPhantomSkill())),
      this.uZh
    );
  }
}
exports.FbMatchPlayerRole = FbMatchPlayerRole;
//# sourceMappingURL=FbMatchPlayerRole.js.map
