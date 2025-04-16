"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAdsorbComponent = void 0);
const FbEntityState_1 = require("./FbEntityState");
class FbAdsorbComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.M_h = !1),
      (this.E_h = 0),
      (this.DVh = !1),
      (this.BVh = 0),
      (this.KEh = !1),
      (this.$Eh = 0),
      (this.qVh = !1),
      (this.kVh = void 0),
      (this.GVh = !1),
      (this.OVh = 0);
  }
  static Create(t) {
    if (t) return new FbAdsorbComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get Range() {
    return (
      this.M_h || ((this.M_h = !0), (this.E_h = this.FbDataInternal.range())),
      this.E_h
    );
  }
  get StartVelocity() {
    return (
      this.DVh ||
        ((this.DVh = !0), (this.BVh = this.FbDataInternal.startVelocity())),
      this.BVh
    );
  }
  get Acceleration() {
    return (
      this.KEh ||
        ((this.KEh = !0), (this.$Eh = this.FbDataInternal.acceleration())),
      this.$Eh
    );
  }
  get ActiveStateCondition() {
    return (
      this.qVh ||
        ((this.qVh = !0),
        (this.kVh = FbEntityState_1.FbEntityState.Create(
          this.FbDataInternal.activeStateCondition(),
        ))),
      this.kVh
    );
  }
  get AdsorbLimitedTime() {
    return (
      this.GVh ||
        ((this.GVh = !0), (this.OVh = this.FbDataInternal.adsorbLimitedTime())),
      this.OVh
    );
  }
}
exports.FbAdsorbComponent = FbAdsorbComponent;
//# sourceMappingURL=FbAdsorbComponent.js.map
