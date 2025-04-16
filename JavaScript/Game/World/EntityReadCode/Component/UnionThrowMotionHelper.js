"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionThrowMotionHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbCircumnutation_1 = require("./FbCircumnutation"),
  FbProjectileMotion_1 = require("./FbProjectileMotion"),
  FbThrowMotionLevitate_1 = require("./FbThrowMotionLevitate"),
  FbThrowMotionTrackTarget_1 = require("./FbThrowMotionTrackTarget");
class UnionThrowMotionHelper {
  static GetUnionThrowMotionObject(o) {
    switch (o) {
      case fb_component_1.UnionThrowMotion.Circumnutation:
        return new fb_component_1.Circumnutation();
      case fb_component_1.UnionThrowMotion.ProjectileMotion:
        return new fb_component_1.ProjectileMotion();
      case fb_component_1.UnionThrowMotion.ThrowMotionLevitate:
        return new fb_component_1.ThrowMotionLevitate();
      case fb_component_1.UnionThrowMotion.ThrowMotionTrackTarget:
        return new fb_component_1.ThrowMotionTrackTarget();
      default:
        return;
    }
  }
  static ReadUnionThrowMotion(o, e) {
    if (void 0 !== e)
      switch (o) {
        case fb_component_1.UnionThrowMotion.Circumnutation:
          return FbCircumnutation_1.FbCircumnutation.Create(e);
        case fb_component_1.UnionThrowMotion.ProjectileMotion:
          return FbProjectileMotion_1.FbProjectileMotion.Create(e);
        case fb_component_1.UnionThrowMotion.ThrowMotionLevitate:
          return FbThrowMotionLevitate_1.FbThrowMotionLevitate.Create(e);
        case fb_component_1.UnionThrowMotion.ThrowMotionTrackTarget:
          return FbThrowMotionTrackTarget_1.FbThrowMotionTrackTarget.Create(e);
        default:
          return;
      }
  }
}
exports.UnionThrowMotionHelper = UnionThrowMotionHelper;
//# sourceMappingURL=UnionThrowMotionHelper.js.map
