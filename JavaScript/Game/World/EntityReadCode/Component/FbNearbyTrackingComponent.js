"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbNearbyTrackingComponent = void 0);
const UnionNearbyTrackingHelper_1 = require("./UnionNearbyTrackingHelper");
class FbNearbyTrackingComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.Dch = !1),
      (this.bSo = !1),
      (this.pjh = !1),
      (this.vjh = !1),
      (this.yjh = !1),
      (this.Sjh = !1),
      (this.Mjh = !1),
      (this.Ejh = void 0);
  }
  static Create(t) {
    if (t) return new FbNearbyTrackingComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get IsEnable() {
    return (
      this.Dch ||
        ((this.Dch = !0), (this.bSo = this.FbDataInternal.isEnable())),
      this.bSo
    );
  }
  get IsEnableWhileUnlock() {
    return (
      this.pjh ||
        ((this.pjh = !0),
        (this.vjh = this.FbDataInternal.isEnableWhileUnlock())),
      this.vjh
    );
  }
  get IsEnbaleWhileHoming() {
    return (
      this.yjh ||
        ((this.yjh = !0),
        (this.Sjh = this.FbDataInternal.isEnbaleWhileHoming())),
      this.Sjh
    );
  }
  get TrackingType() {
    var t, i;
    return (
      !this.Mjh &&
        ((this.Mjh = !0),
        (t = this.FbDataInternal.trackingTypeType()),
        (i =
          UnionNearbyTrackingHelper_1.UnionNearbyTrackingHelper.GetUnionNearbyTrackingObject(
            t,
          ))) &&
        (this.Ejh =
          UnionNearbyTrackingHelper_1.UnionNearbyTrackingHelper.ReadUnionNearbyTracking(
            t,
            this.FbDataInternal.trackingType(i),
          )),
      this.Ejh
    );
  }
}
exports.FbNearbyTrackingComponent = FbNearbyTrackingComponent;
//# sourceMappingURL=FbNearbyTrackingComponent.js.map
