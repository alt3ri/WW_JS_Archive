"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbInitStateBirth = void 0);
class FbInitStateBirth {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.$Rh = !1),
      (this.XRh = void 0);
  }
  static Create(t) {
    if (t) return new FbInitStateBirth(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get BirthTag() {
    return (
      this.$Rh ||
        ((this.$Rh = !0), (this.XRh = this.FbDataInternal.birthTag())),
      this.XRh
    );
  }
}
exports.FbInitStateBirth = FbInitStateBirth;
//# sourceMappingURL=FbInitStateBirth.js.map
