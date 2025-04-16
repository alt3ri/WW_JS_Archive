"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAudioPointNearbyTracking = void 0);
class FbAudioPointNearbyTracking {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Ijh = !1),
      (this.Tjh = 0),
      (this.bjh = !1),
      (this.Ljh = 0),
      (this.Ajh = !1),
      (this.xjh = 0);
  }
  static Create(t) {
    if (t) return new FbAudioPointNearbyTracking(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get NearRadius() {
    return (
      this.Ijh ||
        ((this.Ijh = !0), (this.Tjh = this.FbDataInternal.nearRadius())),
      this.Tjh
    );
  }
  get MiddleRadius() {
    return (
      this.bjh ||
        ((this.bjh = !0), (this.Ljh = this.FbDataInternal.middleRadius())),
      this.Ljh
    );
  }
  get FarRadius() {
    return (
      this.Ajh ||
        ((this.Ajh = !0), (this.xjh = this.FbDataInternal.farRadius())),
      this.xjh
    );
  }
}
exports.FbAudioPointNearbyTracking = FbAudioPointNearbyTracking;
//# sourceMappingURL=FbAudioPointNearbyTracking.js.map
