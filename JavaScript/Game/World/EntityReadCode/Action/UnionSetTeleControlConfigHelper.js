"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSetTeleControlConfigHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbOpenGravity_1 = require("./FbOpenGravity"),
  FbSetResetPosition_1 = require("./FbSetResetPosition");
class UnionSetTeleControlConfigHelper {
  static GetUnionSetTeleControlConfigObject(e) {
    switch (e) {
      case fb_action_1.UnionSetTeleControlConfig.OpenGravity:
        return new fb_action_1.OpenGravity();
      case fb_action_1.UnionSetTeleControlConfig.SetResetPosition:
        return new fb_action_1.SetResetPosition();
      default:
        return;
    }
  }
  static ReadUnionSetTeleControlConfig(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionSetTeleControlConfig.OpenGravity:
          return FbOpenGravity_1.FbOpenGravity.Create(t);
        case fb_action_1.UnionSetTeleControlConfig.SetResetPosition:
          return FbSetResetPosition_1.FbSetResetPosition.Create(t);
        default:
          return;
      }
  }
}
exports.UnionSetTeleControlConfigHelper = UnionSetTeleControlConfigHelper;
//# sourceMappingURL=UnionSetTeleControlConfigHelper.js.map
