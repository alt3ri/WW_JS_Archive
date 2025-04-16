"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAudioVehicleFeature = void 0);
const FbVehicleAudioConfig_1 = require("./FbVehicleAudioConfig");
class FbAudioVehicleFeature {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Oq_ = !1),
      (this.Gq_ = void 0);
  }
  static Create(i) {
    if (i) return new FbAudioVehicleFeature(i);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get AudioConfigs() {
    return (
      this.Oq_ ||
        ((this.Oq_ = !0),
        (this.Gq_ = FbVehicleAudioConfig_1.FbVehicleAudioConfig.Create(
          this.FbDataInternal.audioConfigs(),
        ))),
      this.Gq_
    );
  }
}
exports.FbAudioVehicleFeature = FbAudioVehicleFeature;
//# sourceMappingURL=FbAudioVehicleFeature.js.map
