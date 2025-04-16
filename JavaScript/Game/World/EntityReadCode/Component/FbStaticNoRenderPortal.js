"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbStaticNoRenderPortal = void 0);
const UnionTeleportTransitionOptionHelper_1 = require("../Action/UnionTeleportTransitionOptionHelper"),
  FbGravityFlipTeleportConfig_1 = require("./FbGravityFlipTeleportConfig"),
  FbTeleportSceneEffect_1 = require("./FbTeleportSceneEffect"),
  FbConditionGroup_1 = require("../Condition/FbConditionGroup"),
  FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbStaticNoRenderPortal {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.DKh = !1),
      (this.BKh = void 0),
      (this.HKh = !1),
      (this.WKh = 0),
      (this.$Kh = !1),
      (this.XKh = void 0),
      (this.YKh = !1),
      (this.zKh = void 0),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this.yd_ = !1),
      (this.Sd_ = void 0),
      (this.yPh = !1),
      (this.SPh = void 0);
  }
  static Create(t) {
    if (t) return new FbStaticNoRenderPortal(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get PortalModel() {
    return (
      this.DKh ||
        ((this.DKh = !0), (this.BKh = this.FbDataInternal.portalModel())),
      this.BKh
    );
  }
  get LinkPortalEntityId() {
    return (
      this.HKh ||
        ((this.HKh = !0),
        (this.WKh = this.FbDataInternal.linkPortalEntityId())),
      this.WKh
    );
  }
  get TeleportSceneEffect() {
    return (
      this.$Kh ||
        ((this.$Kh = !0),
        (this.XKh = FbTeleportSceneEffect_1.FbTeleportSceneEffect.Create(
          this.FbDataInternal.teleportSceneEffect(),
        ))),
      this.XKh
    );
  }
  get TeleportLoadingEffect() {
    var t, i;
    return (
      !this.YKh &&
        ((this.YKh = !0),
        (t = this.FbDataInternal.teleportLoadingEffectType()),
        (i =
          UnionTeleportTransitionOptionHelper_1.UnionTeleportTransitionOptionHelper.GetUnionTeleportTransitionOptionObject(
            t,
          ))) &&
        (this.zKh =
          UnionTeleportTransitionOptionHelper_1.UnionTeleportTransitionOptionHelper.ReadUnionTeleportTransitionOption(
            t,
            this.FbDataInternal.teleportLoadingEffect(i),
          )),
      this.zKh
    );
  }
  get Condition() {
    return (
      this.f_h ||
        ((this.f_h = !0),
        (this.X6o = FbConditionGroup_1.FbConditionGroup.Create(
          this.FbDataInternal.condition(),
        ))),
      this.X6o
    );
  }
  get TeleportToSelfPos() {
    return (
      this.yd_ ||
        ((this.yd_ = !0),
        (this.Sd_ = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.teleportToSelfPos(),
        ))),
      this.Sd_
    );
  }
  get GravityConfig() {
    return (
      this.yPh ||
        ((this.yPh = !0),
        (this.SPh =
          FbGravityFlipTeleportConfig_1.FbGravityFlipTeleportConfig.Create(
            this.FbDataInternal.gravityConfig(),
          ))),
      this.SPh
    );
  }
}
exports.FbStaticNoRenderPortal = FbStaticNoRenderPortal;
//# sourceMappingURL=FbStaticNoRenderPortal.js.map
