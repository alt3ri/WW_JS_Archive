"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckLordGymFinishCondition = void 0);
class FbCheckLordGymFinishCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Kzh = !1),
      (this.$zh = 0);
  }
  static Create(t) {
    if (t) return new FbCheckLordGymFinishCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get LordGymId() {
    return (
      this.Kzh ||
        ((this.Kzh = !0), (this.$zh = this.FbDataInternal.lordGymId())),
      this.$zh
    );
  }
}
exports.FbCheckLordGymFinishCondition = FbCheckLordGymFinishCondition;
//# sourceMappingURL=FbCheckLordGymFinishCondition.js.map
