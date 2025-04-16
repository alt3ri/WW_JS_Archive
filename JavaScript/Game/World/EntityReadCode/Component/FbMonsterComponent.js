"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbMonsterComponent = void 0);
const FbBossStateViewConfig_1 = require("./FbBossStateViewConfig"),
  FbMonsterPerformConfig_1 = require("./FbMonsterPerformConfig");
class FbMonsterComponent {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.q_h = !1),
      (this.k_h = !1),
      (this.$5h = !1),
      (this.X5h = 0),
      (this.Y5h = !1),
      (this.z5h = void 0),
      (this.J5h = !1),
      (this.Z5h = void 0),
      (this.e8h = !1),
      (this.t8h = 0),
      (this.i8h = !1),
      (this.r8h = void 0);
  }
  static Create(t) {
    if (t) return new FbMonsterComponent(t);
  }
  get Disabled() {
    return (
      this.q_h ||
        ((this.q_h = !0), (this.k_h = this.FbDataInternal.disabled())),
      this.k_h
    );
  }
  get FightConfigId() {
    return (
      this.$5h ||
        ((this.$5h = !0), (this.X5h = this.FbDataInternal.fightConfigId())),
      this.X5h
    );
  }
  get BossViewConfig() {
    return (
      this.Y5h ||
        ((this.Y5h = !0),
        (this.z5h = FbBossStateViewConfig_1.FbBossStateViewConfig.Create(
          this.FbDataInternal.bossViewConfig(),
        ))),
      this.z5h
    );
  }
  get InitGasTag() {
    if (!this.J5h) {
      (this.J5h = !0), (this.Z5h = new Array());
      var i = this.FbDataInternal.initGasTagLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.Z5h.push(this.FbDataInternal.initGasTag(t));
    }
    return this.Z5h;
  }
  get SpecialHateAndSenseConfig() {
    return (
      this.e8h ||
        ((this.e8h = !0),
        (this.t8h = this.FbDataInternal.specialHateAndSenseConfig())),
      this.t8h
    );
  }
  get PerformConfig() {
    return (
      this.i8h ||
        ((this.i8h = !0),
        (this.r8h = FbMonsterPerformConfig_1.FbMonsterPerformConfig.Create(
          this.FbDataInternal.performConfig(),
        ))),
      this.r8h
    );
  }
}
exports.FbMonsterComponent = FbMonsterComponent;
//# sourceMappingURL=FbMonsterComponent.js.map
