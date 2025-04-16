"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTeleportConfigHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbFixedPos_1 = require("./FbFixedPos"),
  FbGravityFlipFixedPos_1 = require("./FbGravityFlipFixedPos"),
  FbNearestEntity_1 = require("./FbNearestEntity"),
  FbSafePos_1 = require("./FbSafePos");
class UnionTeleportConfigHelper {
  static GetUnionTeleportConfigObject(e) {
    switch (e) {
      case fb_action_1.UnionTeleportConfig.FixedPos:
        return new fb_action_1.FixedPos();
      case fb_action_1.UnionTeleportConfig.GravityFlipFixedPos:
        return new fb_action_1.GravityFlipFixedPos();
      case fb_action_1.UnionTeleportConfig.NearestEntity:
        return new fb_action_1.NearestEntity();
      case fb_action_1.UnionTeleportConfig.SafePos:
        return new fb_action_1.SafePos();
      default:
        return;
    }
  }
  static ReadUnionTeleportConfig(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionTeleportConfig.FixedPos:
          return FbFixedPos_1.FbFixedPos.Create(t);
        case fb_action_1.UnionTeleportConfig.GravityFlipFixedPos:
          return FbGravityFlipFixedPos_1.FbGravityFlipFixedPos.Create(t);
        case fb_action_1.UnionTeleportConfig.NearestEntity:
          return FbNearestEntity_1.FbNearestEntity.Create(t);
        case fb_action_1.UnionTeleportConfig.SafePos:
          return FbSafePos_1.FbSafePos.Create(t);
        default:
          return;
      }
  }
}
exports.UnionTeleportConfigHelper = UnionTeleportConfigHelper;
//# sourceMappingURL=UnionTeleportConfigHelper.js.map
