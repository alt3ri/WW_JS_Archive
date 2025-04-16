"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionGuestOperateUiAnimationHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbPlayGuestUiAnimation_1 = require("./FbPlayGuestUiAnimation"),
  FbStopGuestUiAnimation_1 = require("./FbStopGuestUiAnimation");
class UnionGuestOperateUiAnimationHelper {
  static GetUnionGuestOperateUiAnimationObject(t) {
    switch (t) {
      case fb_action_1.UnionGuestOperateUiAnimation.PlayGuestUiAnimation:
        return new fb_action_1.PlayGuestUiAnimation();
      case fb_action_1.UnionGuestOperateUiAnimation.StopGuestUiAnimation:
        return new fb_action_1.StopGuestUiAnimation();
      default:
        return;
    }
  }
  static ReadUnionGuestOperateUiAnimation(t, e) {
    if (void 0 !== e)
      switch (t) {
        case fb_action_1.UnionGuestOperateUiAnimation.PlayGuestUiAnimation:
          return FbPlayGuestUiAnimation_1.FbPlayGuestUiAnimation.Create(e);
        case fb_action_1.UnionGuestOperateUiAnimation.StopGuestUiAnimation:
          return FbStopGuestUiAnimation_1.FbStopGuestUiAnimation.Create(e);
        default:
          return;
      }
  }
}
exports.UnionGuestOperateUiAnimationHelper = UnionGuestOperateUiAnimationHelper;
//# sourceMappingURL=UnionGuestOperateUiAnimationHelper.js.map
