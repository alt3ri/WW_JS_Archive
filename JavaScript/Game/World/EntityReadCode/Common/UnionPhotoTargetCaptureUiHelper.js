"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionPhotoTargetCaptureUiHelper = void 0);
const fb_common_1 = require("../../../../Game/World/EntityFb/fb-common"),
  FbPhotoTargetCaptureUiCustomPoints_1 = require("./FbPhotoTargetCaptureUiCustomPoints"),
  FbPhotoTargetCaptureUiEachRequiredPoints_1 = require("./FbPhotoTargetCaptureUiEachRequiredPoints"),
  FbPhotoTargetCaptureUiEntityZero_1 = require("./FbPhotoTargetCaptureUiEntityZero"),
  FbPhotoTargetCaptureUiRequiredPointsCenter_1 = require("./FbPhotoTargetCaptureUiRequiredPointsCenter");
class UnionPhotoTargetCaptureUiHelper {
  static GetUnionPhotoTargetCaptureUiObject(e) {
    switch (e) {
      case fb_common_1.UnionPhotoTargetCaptureUi
        .PhotoTargetCaptureUiCustomPoints:
        return new fb_common_1.PhotoTargetCaptureUiCustomPoints();
      case fb_common_1.UnionPhotoTargetCaptureUi
        .PhotoTargetCaptureUiEachRequiredPoints:
        return new fb_common_1.PhotoTargetCaptureUiEachRequiredPoints();
      case fb_common_1.UnionPhotoTargetCaptureUi.PhotoTargetCaptureUiEntityZero:
        return new fb_common_1.PhotoTargetCaptureUiEntityZero();
      case fb_common_1.UnionPhotoTargetCaptureUi
        .PhotoTargetCaptureUiRequiredPointsCenter:
        return new fb_common_1.PhotoTargetCaptureUiRequiredPointsCenter();
      default:
        return;
    }
  }
  static ReadUnionPhotoTargetCaptureUi(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_common_1.UnionPhotoTargetCaptureUi
          .PhotoTargetCaptureUiCustomPoints:
          return FbPhotoTargetCaptureUiCustomPoints_1.FbPhotoTargetCaptureUiCustomPoints.Create(
            t,
          );
        case fb_common_1.UnionPhotoTargetCaptureUi
          .PhotoTargetCaptureUiEachRequiredPoints:
          return FbPhotoTargetCaptureUiEachRequiredPoints_1.FbPhotoTargetCaptureUiEachRequiredPoints.Create(
            t,
          );
        case fb_common_1.UnionPhotoTargetCaptureUi
          .PhotoTargetCaptureUiEntityZero:
          return FbPhotoTargetCaptureUiEntityZero_1.FbPhotoTargetCaptureUiEntityZero.Create(
            t,
          );
        case fb_common_1.UnionPhotoTargetCaptureUi
          .PhotoTargetCaptureUiRequiredPointsCenter:
          return FbPhotoTargetCaptureUiRequiredPointsCenter_1.FbPhotoTargetCaptureUiRequiredPointsCenter.Create(
            t,
          );
        default:
          return;
      }
  }
}
exports.UnionPhotoTargetCaptureUiHelper = UnionPhotoTargetCaptureUiHelper;
//# sourceMappingURL=UnionPhotoTargetCaptureUiHelper.js.map
