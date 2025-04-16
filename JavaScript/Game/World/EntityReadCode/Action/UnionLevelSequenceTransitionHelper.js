"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionLevelSequenceTransitionHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbCameraTransition_1 = require("./FbCameraTransition"),
  FbMaskTransition_1 = require("./FbMaskTransition");
class UnionLevelSequenceTransitionHelper {
  static GetUnionLevelSequenceTransitionObject(e) {
    switch (e) {
      case fb_action_1.UnionLevelSequenceTransition.CameraTransition:
        return new fb_action_1.CameraTransition();
      case fb_action_1.UnionLevelSequenceTransition.MaskTransition:
        return new fb_action_1.MaskTransition();
      default:
        return;
    }
  }
  static ReadUnionLevelSequenceTransition(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_action_1.UnionLevelSequenceTransition.CameraTransition:
          return FbCameraTransition_1.FbCameraTransition.Create(n);
        case fb_action_1.UnionLevelSequenceTransition.MaskTransition:
          return FbMaskTransition_1.FbMaskTransition.Create(n);
        default:
          return;
      }
  }
}
exports.UnionLevelSequenceTransitionHelper = UnionLevelSequenceTransitionHelper;
//# sourceMappingURL=UnionLevelSequenceTransitionHelper.js.map
