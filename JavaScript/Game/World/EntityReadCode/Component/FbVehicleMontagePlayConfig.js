"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVehicleMontagePlayConfig = void 0);
class FbVehicleMontagePlayConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.l7l = !1),
      (this._7l = 0),
      (this.c7l = !1),
      (this.u7l = 0),
      (this.d7l = !1),
      (this.m7l = 0),
      (this.C7l = !1),
      (this.g7l = 0),
      (this.IOh = !1),
      (this.TOh = void 0);
  }
  static Create(t) {
    if (t) return new FbVehicleMontagePlayConfig(t);
  }
  get MinMontageSpeedFactor() {
    return (
      this.l7l ||
        ((this.l7l = !0),
        (this._7l = this.FbDataInternal.minMontageSpeedFactor())),
      this._7l
    );
  }
  get MaxMontageSpeedFactor() {
    return (
      this.c7l ||
        ((this.c7l = !0),
        (this.u7l = this.FbDataInternal.maxMontageSpeedFactor())),
      this.u7l
    );
  }
  get MinVehicleSpeed() {
    return (
      this.d7l ||
        ((this.d7l = !0), (this.m7l = this.FbDataInternal.minVehicleSpeed())),
      this.m7l
    );
  }
  get MaxVehicleSpeed() {
    return (
      this.C7l ||
        ((this.C7l = !0), (this.g7l = this.FbDataInternal.maxVehicleSpeed())),
      this.g7l
    );
  }
  get TargetState() {
    return (
      this.IOh ||
        ((this.IOh = !0), (this.TOh = this.FbDataInternal.targetState())),
      this.TOh
    );
  }
}
exports.FbVehicleMontagePlayConfig = FbVehicleMontagePlayConfig;
//# sourceMappingURL=FbVehicleMontagePlayConfig.js.map
