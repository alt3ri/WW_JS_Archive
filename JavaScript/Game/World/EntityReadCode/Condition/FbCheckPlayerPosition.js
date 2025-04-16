"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckPlayerPosition = void 0);
const UnionRangeHelper_1 = require("../Shape/UnionRangeHelper");
class FbCheckPlayerPosition {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.M_h = !1),
      (this.E_h = void 0),
      (this.kzh = !1),
      (this.Gzh = !1);
  }
  static Create(t) {
    if (t) return new FbCheckPlayerPosition(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Range() {
    var t, e;
    return (
      !this.M_h &&
        ((this.M_h = !0),
        (t = this.FbDataInternal.rangeType()),
        (e = UnionRangeHelper_1.UnionRangeHelper.GetUnionRangeObject(t))) &&
        (this.E_h = UnionRangeHelper_1.UnionRangeHelper.ReadUnionRange(
          t,
          this.FbDataInternal.range(e),
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
exports.FbCheckPlayerPosition = FbCheckPlayerPosition;
//# sourceMappingURL=FbCheckPlayerPosition.js.map
