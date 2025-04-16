"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionAdjustPlayerCameraOptionHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbAdjustAxisLockCamera_1 = require("./FbAdjustAxisLockCamera"),
  FbAdjustBasicCamera_1 = require("./FbAdjustBasicCamera"),
  FbAdjustDialogCamera_1 = require("./FbAdjustDialogCamera"),
  FbAdjustFirstPersonCamera_1 = require("./FbAdjustFirstPersonCamera"),
  FbAdjustFixedCamera_1 = require("./FbAdjustFixedCamera"),
  FbAdjustHorizontalCamera_1 = require("./FbAdjustHorizontalCamera");
class UnionAdjustPlayerCameraOptionHelper {
  static GetUnionAdjustPlayerCameraOptionObject(a) {
    switch (a) {
      case fb_action_1.UnionAdjustPlayerCameraOption.AdjustAxisLockCamera:
        return new fb_action_1.AdjustAxisLockCamera();
      case fb_action_1.UnionAdjustPlayerCameraOption.AdjustBasicCamera:
        return new fb_action_1.AdjustBasicCamera();
      case fb_action_1.UnionAdjustPlayerCameraOption.AdjustDialogCamera:
        return new fb_action_1.AdjustDialogCamera();
      case fb_action_1.UnionAdjustPlayerCameraOption.AdjustFirstPersonCamera:
        return new fb_action_1.AdjustFirstPersonCamera();
      case fb_action_1.UnionAdjustPlayerCameraOption.AdjustFixedCamera:
        return new fb_action_1.AdjustFixedCamera();
      case fb_action_1.UnionAdjustPlayerCameraOption.AdjustHorizontalCamera:
        return new fb_action_1.AdjustHorizontalCamera();
      default:
        return;
    }
  }
  static ReadUnionAdjustPlayerCameraOption(a, e) {
    if (void 0 !== e)
      switch (a) {
        case fb_action_1.UnionAdjustPlayerCameraOption.AdjustAxisLockCamera:
          return FbAdjustAxisLockCamera_1.FbAdjustAxisLockCamera.Create(e);
        case fb_action_1.UnionAdjustPlayerCameraOption.AdjustBasicCamera:
          return FbAdjustBasicCamera_1.FbAdjustBasicCamera.Create(e);
        case fb_action_1.UnionAdjustPlayerCameraOption.AdjustDialogCamera:
          return FbAdjustDialogCamera_1.FbAdjustDialogCamera.Create(e);
        case fb_action_1.UnionAdjustPlayerCameraOption.AdjustFirstPersonCamera:
          return FbAdjustFirstPersonCamera_1.FbAdjustFirstPersonCamera.Create(
            e,
          );
        case fb_action_1.UnionAdjustPlayerCameraOption.AdjustFixedCamera:
          return FbAdjustFixedCamera_1.FbAdjustFixedCamera.Create(e);
        case fb_action_1.UnionAdjustPlayerCameraOption.AdjustHorizontalCamera:
          return FbAdjustHorizontalCamera_1.FbAdjustHorizontalCamera.Create(e);
        default:
          return;
      }
  }
}
exports.UnionAdjustPlayerCameraOptionHelper =
  UnionAdjustPlayerCameraOptionHelper;
//# sourceMappingURL=UnionAdjustPlayerCameraOptionHelper.js.map
