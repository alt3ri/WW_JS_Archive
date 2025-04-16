"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbExchangeSlideRailConfig = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbNextSlideRail_1 = require("./FbNextSlideRail");
class FbExchangeSlideRailConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.$Gc = !1),
      (this.WGc = 0),
      (this.aqc = !1),
      (this.hqc = void 0);
  }
  static Create(t) {
    if (t) return new FbExchangeSlideRailConfig(t);
  }
  get MaxExchangeDistance() {
    return (
      this.$Gc ||
        ((this.$Gc = !0),
        (this.WGc = this.FbDataInternal.maxExchangeDistance())),
      this.WGc
    );
  }
  get NextRails() {
    if (!this.aqc) {
      (this.aqc = !0), (this.hqc = new Array());
      var i = this.FbDataInternal.nextRailsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.nextRails(
            t,
            new fb_component_1.NextSlideRail(),
          );
          this.hqc.push(FbNextSlideRail_1.FbNextSlideRail.Create(e));
        }
    }
    return this.hqc;
  }
}
exports.FbExchangeSlideRailConfig = FbExchangeSlideRailConfig;
//# sourceMappingURL=FbExchangeSlideRailConfig.js.map
