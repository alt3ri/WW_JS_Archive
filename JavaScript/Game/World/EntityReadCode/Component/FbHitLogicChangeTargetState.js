"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHitLogicChangeTargetState = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbConditionHitConfig_1 = require("./FbConditionHitConfig"),
  FbConditionHitConfigWithBullet_1 = require("./FbConditionHitConfigWithBullet");
class FbHitLogicChangeTargetState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.tK_ = !1),
      (this.iK_ = void 0),
      (this.rK_ = !1),
      (this.oK_ = void 0);
  }
  static Create(t) {
    if (t) return new FbHitLogicChangeTargetState(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TargetBulletHitConfigs() {
    if (!this.tK_) {
      (this.tK_ = !0), (this.iK_ = new Array());
      var i = this.FbDataInternal.targetBulletHitConfigsLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.targetBulletHitConfigs(
            t,
            new fb_component_1.ConditionHitConfigWithBullet(),
          );
          this.iK_.push(
            FbConditionHitConfigWithBullet_1.FbConditionHitConfigWithBullet.Create(
              e,
            ),
          );
        }
    }
    return this.iK_;
  }
  get OtherBulletsHitConfig() {
    if (!this.rK_) {
      (this.rK_ = !0), (this.oK_ = new Array());
      var i = this.FbDataInternal.otherBulletsHitConfigLength();
      if (i)
        for (let t = 0; t < i; ++t) {
          var e = this.FbDataInternal.otherBulletsHitConfig(
            t,
            new fb_component_1.ConditionHitConfig(),
          );
          this.oK_.push(FbConditionHitConfig_1.FbConditionHitConfig.Create(e));
        }
    }
    return this.oK_;
  }
}
exports.FbHitLogicChangeTargetState = FbHitLogicChangeTargetState;
//# sourceMappingURL=FbHitLogicChangeTargetState.js.map
