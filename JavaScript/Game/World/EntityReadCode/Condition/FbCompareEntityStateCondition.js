"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCompareEntityStateCondition = void 0);
class FbCompareEntityStateCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.a_h = !1),
      (this.I9o = 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.Bch = !1),
      (this.Cbo = void 0);
  }
  static Create(t) {
    if (t) return new FbCompareEntityStateCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get Compare() {
    return (
      this._ch || ((this._ch = !0), (this.cch = this.FbDataInternal.compare())),
      this.cch
    );
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
}
exports.FbCompareEntityStateCondition = FbCompareEntityStateCondition;
//# sourceMappingURL=FbCompareEntityStateCondition.js.map
