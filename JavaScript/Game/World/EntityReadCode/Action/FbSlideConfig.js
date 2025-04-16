"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSlideConfig = void 0);
class FbSlideConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.$bh = !1),
      (this.Xbh = 0);
  }
  static Create(t) {
    if (t) return new FbSlideConfig(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get SlideId() {
    return (
      this.$bh || ((this.$bh = !0), (this.Xbh = this.FbDataInternal.slideId())),
      this.Xbh
    );
  }
}
exports.FbSlideConfig = FbSlideConfig;
//# sourceMappingURL=FbSlideConfig.js.map
