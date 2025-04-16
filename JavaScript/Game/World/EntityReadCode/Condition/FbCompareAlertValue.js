"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCompareAlertValue = void 0);
const UnionComparedAlertValueHelper_1 = require("./UnionComparedAlertValueHelper");
class FbCompareAlertValue {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Yph = !1),
      (this.zph = 0),
      (this.OJh = !1),
      (this.FJh = void 0),
      (this.KJh = !1),
      (this.$Jh = void 0);
  }
  static Create(t) {
    if (t) return new FbCompareAlertValue(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get AreaId() {
    return (
      this.Yph || ((this.Yph = !0), (this.zph = this.FbDataInternal.areaId())),
      this.zph
    );
  }
  get CompareType() {
    return (
      this.OJh ||
        ((this.OJh = !0), (this.FJh = this.FbDataInternal.compareType())),
      this.FJh
    );
  }
  get CompareValue() {
    var t, e;
    return (
      !this.KJh &&
        ((this.KJh = !0),
        (t = this.FbDataInternal.compareValueType()),
        (e =
          UnionComparedAlertValueHelper_1.UnionComparedAlertValueHelper.GetUnionComparedAlertValueObject(
            t,
          ))) &&
        (this.$Jh =
          UnionComparedAlertValueHelper_1.UnionComparedAlertValueHelper.ReadUnionComparedAlertValue(
            t,
            this.FbDataInternal.compareValue(e),
          )),
      this.$Jh
    );
  }
}
exports.FbCompareAlertValue = FbCompareAlertValue;
//# sourceMappingURL=FbCompareAlertValue.js.map
