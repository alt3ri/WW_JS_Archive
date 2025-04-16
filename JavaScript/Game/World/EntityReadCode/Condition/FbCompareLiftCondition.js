"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCompareLiftCondition = void 0);
class FbCompareLiftCondition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.tIh = !1),
      (this.iIh = !1),
      (this.a_h = !1),
      (this.I9o = 0),
      (this._ch = !1),
      (this.cch = void 0),
      (this.rIh = !1),
      (this.oIh = 0);
  }
  static Create(t) {
    if (t) return new FbCompareLiftCondition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get IsSelf() {
    return (
      this.tIh || ((this.tIh = !0), (this.iIh = this.FbDataInternal.isSelf())),
      this.iIh
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
  get Location() {
    return (
      this.rIh ||
        ((this.rIh = !0), (this.oIh = this.FbDataInternal.location())),
      this.oIh
    );
  }
}
exports.FbCompareLiftCondition = FbCompareLiftCondition;
//# sourceMappingURL=FbCompareLiftCondition.js.map
