"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCompareCustomAlertValue = void 0);
class FbCompareCustomAlertValue {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.KJh = !1),
      (this.$Jh = 0);
  }
  static Create(t) {
    if (t) return new FbCompareCustomAlertValue(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CompareValue() {
    return (
      this.KJh ||
        ((this.KJh = !0), (this.$Jh = this.FbDataInternal.compareValue())),
      this.$Jh
    );
  }
}
exports.FbCompareCustomAlertValue = FbCompareCustomAlertValue;
//# sourceMappingURL=FbCompareCustomAlertValue.js.map
