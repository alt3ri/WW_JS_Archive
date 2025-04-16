"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionCameraOperationHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbDisableCameraOperation_1 = require("./FbDisableCameraOperation"),
  FbEnableCameraOperation_1 = require("./FbEnableCameraOperation");
class UnionCameraOperationHelper {
  static GetUnionCameraOperationObject(e) {
    switch (e) {
      case fb_action_1.UnionCameraOperation.DisableCameraOperation:
        return new fb_action_1.DisableCameraOperation();
      case fb_action_1.UnionCameraOperation.EnableCameraOperation:
        return new fb_action_1.EnableCameraOperation();
      default:
        return;
    }
  }
  static ReadUnionCameraOperation(e, a) {
    if (void 0 !== a)
      switch (e) {
        case fb_action_1.UnionCameraOperation.DisableCameraOperation:
          return FbDisableCameraOperation_1.FbDisableCameraOperation.Create(a);
        case fb_action_1.UnionCameraOperation.EnableCameraOperation:
          return FbEnableCameraOperation_1.FbEnableCameraOperation.Create(a);
        default:
          return;
      }
  }
}
exports.UnionCameraOperationHelper = UnionCameraOperationHelper;
//# sourceMappingURL=UnionCameraOperationHelper.js.map
