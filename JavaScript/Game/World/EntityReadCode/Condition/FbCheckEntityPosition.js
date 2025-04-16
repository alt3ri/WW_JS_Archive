"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckEntityPosition = void 0);
const UnionRangeHelper_1 = require("../Shape/UnionRangeHelper");
class FbCheckEntityPosition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.M_h = !1),
      (this.E_h = void 0),
      (this.kzh = !1),
      (this.Gzh = !1);
  }
  static Create(t) {
    if (t) return new FbCheckEntityPosition(t);
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
  get Range() {
    var t, i;
    return (
      !this.M_h &&
        ((this.M_h = !0),
        (t = this.FbDataInternal.rangeType()),
        (i = UnionRangeHelper_1.UnionRangeHelper.GetUnionRangeObject(t))) &&
        (this.E_h = UnionRangeHelper_1.UnionRangeHelper.ReadUnionRange(
          t,
          this.FbDataInternal.range(i),
        )),
      this.E_h
    );
  }
  get IsOnRange() {
    return (
      this.kzh ||
        ((this.kzh = !0), (this.Gzh = this.FbDataInternal.isOnRange())),
      this.Gzh
    );
  }
}
exports.FbCheckEntityPosition = FbCheckEntityPosition;
//# sourceMappingURL=FbCheckEntityPosition.js.map
