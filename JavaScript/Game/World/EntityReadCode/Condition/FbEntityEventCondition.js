"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEntityEventCondition = void 0);
class FbEntityEventCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.Bch = !1),
      (this.Cbo = void 0),
      (this.azh = !1),
      (this.hzh = !1),
      (this.$ph = !1),
      (this.Xph = !1);
  }
  static Create(t) {
    if (t) return new FbEntityEventCondition(t);
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
  get IsDead() {
    return (
      this.azh || ((this.azh = !0), (this.hzh = this.FbDataInternal.isDead())),
      this.hzh
    );
  }
  get IsLocked() {
    return (
      this.$ph ||
        ((this.$ph = !0), (this.Xph = this.FbDataInternal.isLocked())),
      this.Xph
    );
  }
}
exports.FbEntityEventCondition = FbEntityEventCondition;
//# sourceMappingURL=FbEntityEventCondition.js.map
