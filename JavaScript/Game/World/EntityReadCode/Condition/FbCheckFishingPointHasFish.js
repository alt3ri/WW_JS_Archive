"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckFishingPointHasFish = void 0);
class FbCheckFishingPointHasFish {
  constructor(s) {
    (this.FbDataInternal = s),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.$P_ = !1),
      (this.WP_ = !1);
  }
  static Create(s) {
    if (s) return new FbCheckFishingPointHasFish(s);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get HasFish() {
    return (
      this.$P_ || ((this.$P_ = !0), (this.WP_ = this.FbDataInternal.hasFish())),
      this.WP_
    );
  }
}
exports.FbCheckFishingPointHasFish = FbCheckFishingPointHasFish;
//# sourceMappingURL=FbCheckFishingPointHasFish.js.map
