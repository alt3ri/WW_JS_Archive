"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLinearOverRangeCameraShake = void 0);
class FbLinearOverRangeCameraShake {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.eAh = !1),
      (this.tAh = 0),
      (this.iAh = !1),
      (this.rAh = 0),
      (this.oAh = !1),
      (this.nAh = 0);
  }
  static Create(t) {
    if (t) return new FbLinearOverRangeCameraShake(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get CenterEntityId() {
    return (
      this.eAh ||
        ((this.eAh = !0), (this.tAh = this.FbDataInternal.centerEntityId())),
      this.tAh
    );
  }
  get MinRange() {
    return (
      this.iAh ||
        ((this.iAh = !0), (this.rAh = this.FbDataInternal.minRange())),
      this.rAh
    );
  }
  get MaxRange() {
    return (
      this.oAh ||
        ((this.oAh = !0), (this.nAh = this.FbDataInternal.maxRange())),
      this.nAh
    );
  }
}
exports.FbLinearOverRangeCameraShake = FbLinearOverRangeCameraShake;
//# sourceMappingURL=FbLinearOverRangeCameraShake.js.map
