"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMovementPerformConfig = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbSpeedEffectConfig_1 = require("./FbSpeedEffectConfig"),
  FbVehicleMontagePlayConfig_1 = require("./FbVehicleMontagePlayConfig");
class FbMovementPerformConfig {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.a7l = !1),
      (this.h7l = void 0),
      (this.Fq_ = !1),
      (this.Nq_ = void 0);
  }
  static Create(e) {
    if (e) return new FbMovementPerformConfig(e);
  }
  get VehicleMontagePlayConfigs() {
    if (!this.a7l) {
      (this.a7l = !0), (this.h7l = new Array());
      var t = this.FbDataInternal.vehicleMontagePlayConfigsLength();
      if (t)
        for (let e = 0; e < t; ++e) {
          var i = this.FbDataInternal.vehicleMontagePlayConfigs(
            e,
            new fb_component_1.VehicleMontagePlayConfig(),
          );
          this.h7l.push(
            FbVehicleMontagePlayConfig_1.FbVehicleMontagePlayConfig.Create(i),
          );
        }
    }
    return this.h7l;
  }
  get PlayerSpeedEffectConfigs() {
    if (!this.Fq_) {
      (this.Fq_ = !0), (this.Nq_ = new Array());
      var t = this.FbDataInternal.playerSpeedEffectConfigsLength();
      if (t)
        for (let e = 0; e < t; ++e) {
          var i = this.FbDataInternal.playerSpeedEffectConfigs(
            e,
            new fb_component_1.SpeedEffectConfig(),
          );
          this.Nq_.push(FbSpeedEffectConfig_1.FbSpeedEffectConfig.Create(i));
        }
    }
    return this.Nq_;
  }
}
exports.FbMovementPerformConfig = FbMovementPerformConfig;
//# sourceMappingURL=FbMovementPerformConfig.js.map
