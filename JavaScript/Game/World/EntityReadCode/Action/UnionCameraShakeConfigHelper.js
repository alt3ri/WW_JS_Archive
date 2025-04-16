"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionCameraShakeConfigHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbConstantCameraShake_1 = require("./FbConstantCameraShake"),
  FbLinearOverRangeCameraShake_1 = require("./FbLinearOverRangeCameraShake");
class UnionCameraShakeConfigHelper {
  static GetUnionCameraShakeConfigObject(e) {
    switch (e) {
      case fb_action_1.UnionCameraShakeConfig.ConstantCameraShake:
        return new fb_action_1.ConstantCameraShake();
      case fb_action_1.UnionCameraShakeConfig.LinearOverRangeCameraShake:
        return new fb_action_1.LinearOverRangeCameraShake();
      default:
        return;
    }
  }
  static ReadUnionCameraShakeConfig(e, a) {
    if (void 0 !== a)
      switch (e) {
        case fb_action_1.UnionCameraShakeConfig.ConstantCameraShake:
          return FbConstantCameraShake_1.FbConstantCameraShake.Create(a);
        case fb_action_1.UnionCameraShakeConfig.LinearOverRangeCameraShake:
          return FbLinearOverRangeCameraShake_1.FbLinearOverRangeCameraShake.Create(
            a,
          );
        default:
          return;
      }
  }
}
exports.UnionCameraShakeConfigHelper = UnionCameraShakeConfigHelper;
//# sourceMappingURL=UnionCameraShakeConfigHelper.js.map
