"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCompassTracking = void 0);
const FbIconNearByTrackingConfig_1 = require("./FbIconNearByTrackingConfig");
class FbCompassTracking {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Rjh = !1),
      (this.wjh = 0),
      (this.Pjh = !1),
      (this.Ujh = 0),
      (this.nJl = !1),
      (this.sJl = void 0),
      (this.t5_ = !1),
      (this.i5_ = void 0);
  }
  static Create(t) {
    if (t) return new FbCompassTracking(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get ShowRange() {
    return (
      this.Rjh ||
        ((this.Rjh = !0), (this.wjh = this.FbDataInternal.showRange())),
      this.wjh
    );
  }
  get HideRange() {
    return (
      this.Pjh ||
        ((this.Pjh = !0), (this.Ujh = this.FbDataInternal.hideRange())),
      this.Ujh
    );
  }
  get IconTrackingConfig() {
    return (
      this.nJl ||
        ((this.nJl = !0),
        (this.sJl =
          FbIconNearByTrackingConfig_1.FbIconNearByTrackingConfig.Create(
            this.FbDataInternal.iconTrackingConfig(),
          ))),
      this.sJl
    );
  }
  get VehicleTypes() {
    if (!this.t5_) {
      (this.t5_ = !0), (this.i5_ = new Array());
      var i = this.FbDataInternal.vehicleTypesLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.i5_.push(this.FbDataInternal.vehicleTypes(t));
    }
    return this.i5_;
  }
}
exports.FbCompassTracking = FbCompassTracking;
//# sourceMappingURL=FbCompassTracking.js.map
