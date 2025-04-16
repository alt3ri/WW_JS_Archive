"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbVehicleAudioConfig = void 0);
class FbVehicleAudioConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.d7l = !1),
      (this.m7l = 0),
      (this.C7l = !1),
      (this.g7l = 0),
      (this.Hq_ = !1),
      (this.$q_ = void 0);
  }
  static Create(t) {
    if (t) return new FbVehicleAudioConfig(t);
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
  get AudioEvent() {
    return (
      this.Hq_ ||
        ((this.Hq_ = !0), (this.$q_ = this.FbDataInternal.audioEvent())),
      this.$q_
    );
  }
}
exports.FbVehicleAudioConfig = FbVehicleAudioConfig;
//# sourceMappingURL=FbVehicleAudioConfig.js.map
