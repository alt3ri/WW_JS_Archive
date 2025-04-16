"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHideTargetRange = void 0);
const UnionHideRangeConfigHelper_1 = require("./UnionHideRangeConfigHelper");
class FbHideTargetRange {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.ILh = !1),
      (this.TLh = 0),
      (this.JAh = !1),
      (this.ZAh = void 0),
      (this.exh = !1),
      (this.txh = !1),
      (this.ixh = !1),
      (this.rxh = !1);
  }
  static Create(i) {
    if (i) return new FbHideTargetRange(i);
  }
  get RangeEntity() {
    return (
      this.ILh ||
        ((this.ILh = !0), (this.TLh = this.FbDataInternal.rangeEntity())),
      this.TLh
    );
  }
  get HideConfig() {
    var i, t;
    return (
      !this.JAh &&
        ((this.JAh = !0),
        (i = this.FbDataInternal.hideConfigType()),
        (t =
          UnionHideRangeConfigHelper_1.UnionHideRangeConfigHelper.GetUnionHideRangeConfigObject(
            i,
          ))) &&
        (this.ZAh =
          UnionHideRangeConfigHelper_1.UnionHideRangeConfigHelper.ReadUnionHideRangeConfig(
            i,
            this.FbDataInternal.hideConfig(t),
          )),
      this.ZAh
    );
  }
  get IsHideSimpleNpc() {
    return (
      this.exh ||
        ((this.exh = !0), (this.txh = this.FbDataInternal.isHideSimpleNpc())),
      this.txh
    );
  }
  get IsHidePasserByNpc() {
    return (
      this.ixh ||
        ((this.ixh = !0), (this.rxh = this.FbDataInternal.isHidePasserByNpc())),
      this.rxh
    );
  }
}
exports.FbHideTargetRange = FbHideTargetRange;
//# sourceMappingURL=FbHideTargetRange.js.map
