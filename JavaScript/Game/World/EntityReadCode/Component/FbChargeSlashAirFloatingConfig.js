"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChargeSlashAirFloatingConfig = void 0);
class FbChargeSlashAirFloatingConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Ec1 = !1),
      (this.Ic1 = void 0),
      (this.Tc1 = !1),
      (this.bc1 = 0);
  }
  static Create(t) {
    if (t) return new FbChargeSlashAirFloatingConfig(t);
  }
  get AirFloatingCurvePath() {
    return (
      this.Ec1 ||
        ((this.Ec1 = !0),
        (this.Ic1 = this.FbDataInternal.airFloatingCurvePath())),
      this.Ic1
    );
  }
  get FloatingAmplitude() {
    return (
      this.Tc1 ||
        ((this.Tc1 = !0), (this.bc1 = this.FbDataInternal.floatingAmplitude())),
      this.bc1
    );
  }
}
exports.FbChargeSlashAirFloatingConfig = FbChargeSlashAirFloatingConfig;
//# sourceMappingURL=FbChargeSlashAirFloatingConfig.js.map
