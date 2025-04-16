"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionFireBulletHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbFireBulletForwardFront_1 = require("./FbFireBulletForwardFront"),
  FbFireBulletTrackPosition_1 = require("./FbFireBulletTrackPosition"),
  FbFireBulletTrackTarget_1 = require("./FbFireBulletTrackTarget");
class UnionFireBulletHelper {
  static GetUnionFireBulletObject(e) {
    switch (e) {
      case fb_action_1.UnionFireBullet.FireBulletForwardFront:
        return new fb_action_1.FireBulletForwardFront();
      case fb_action_1.UnionFireBullet.FireBulletTrackPosition:
        return new fb_action_1.FireBulletTrackPosition();
      case fb_action_1.UnionFireBullet.FireBulletTrackTarget:
        return new fb_action_1.FireBulletTrackTarget();
      default:
        return;
    }
  }
  static ReadUnionFireBullet(e, r) {
    if (void 0 !== r)
      switch (e) {
        case fb_action_1.UnionFireBullet.FireBulletForwardFront:
          return FbFireBulletForwardFront_1.FbFireBulletForwardFront.Create(r);
        case fb_action_1.UnionFireBullet.FireBulletTrackPosition:
          return FbFireBulletTrackPosition_1.FbFireBulletTrackPosition.Create(
            r,
          );
        case fb_action_1.UnionFireBullet.FireBulletTrackTarget:
          return FbFireBulletTrackTarget_1.FbFireBulletTrackTarget.Create(r);
        default:
          return;
      }
  }
}
exports.UnionFireBulletHelper = UnionFireBulletHelper;
//# sourceMappingURL=UnionFireBulletHelper.js.map
