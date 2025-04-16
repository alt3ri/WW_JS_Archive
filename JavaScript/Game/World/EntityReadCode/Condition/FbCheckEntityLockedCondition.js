"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckEntityLockedCondition = void 0);
class FbCheckEntityLockedCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Ayh = !1),
      (this.xyh = void 0),
      (this.$ph = !1),
      (this.Xph = !1);
  }
  static Create(t) {
    if (t) return new FbCheckEntityLockedCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Entities() {
    if (!this.Ayh) {
      (this.Ayh = !0), (this.xyh = new Array());
      var i = this.FbDataInternal.entitiesLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.xyh.push(this.FbDataInternal.entities(t));
    }
    return this.xyh;
  }
  get IsLocked() {
    return (
      this.$ph ||
        ((this.$ph = !0), (this.Xph = this.FbDataInternal.isLocked())),
      this.Xph
    );
  }
}
exports.FbCheckEntityLockedCondition = FbCheckEntityLockedCondition;
//# sourceMappingURL=FbCheckEntityLockedCondition.js.map
