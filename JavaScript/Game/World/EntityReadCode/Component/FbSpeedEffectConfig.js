"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSpeedEffectConfig = void 0);
class FbSpeedEffectConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.d7l = !1),
      (this.m7l = 0),
      (this.C7l = !1),
      (this.g7l = 0),
      (this.Vq_ = !1),
      (this.jq_ = void 0);
  }
  static Create(t) {
    if (t) return new FbSpeedEffectConfig(t);
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
  get GameplayCueIds() {
    if (!this.Vq_) {
      (this.Vq_ = !0), (this.jq_ = new Array());
      var e = this.FbDataInternal.gameplayCueIdsLength();
      if (e)
        for (let t = 0; t < e; ++t)
          this.jq_.push(Number(this.FbDataInternal.gameplayCueIds(t) ?? 0));
    }
    return this.jq_;
  }
}
exports.FbSpeedEffectConfig = FbSpeedEffectConfig;
//# sourceMappingURL=FbSpeedEffectConfig.js.map
