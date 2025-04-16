"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionOpenSystemBoardWithReturnHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbOpenConfirmBoxWithReturn_1 = require("./FbOpenConfirmBoxWithReturn"),
  FbOpenFishingItemDeliveryWithReturn_1 = require("./FbOpenFishingItemDeliveryWithReturn"),
  FbOpenSoaringChallengeResultWithReturn_1 = require("./FbOpenSoaringChallengeResultWithReturn");
class UnionOpenSystemBoardWithReturnHelper {
  static GetUnionOpenSystemBoardWithReturnObject(e) {
    switch (e) {
      case fb_action_1.UnionOpenSystemBoardWithReturn.OpenConfirmBoxWithReturn:
        return new fb_action_1.OpenConfirmBoxWithReturn();
      case fb_action_1.UnionOpenSystemBoardWithReturn
        .OpenFishingItemDeliveryWithReturn:
        return new fb_action_1.OpenFishingItemDeliveryWithReturn();
      case fb_action_1.UnionOpenSystemBoardWithReturn
        .OpenSoaringChallengeResultWithReturn:
        return new fb_action_1.OpenSoaringChallengeResultWithReturn();
      default:
        return;
    }
  }
  static ReadUnionOpenSystemBoardWithReturn(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionOpenSystemBoardWithReturn
          .OpenConfirmBoxWithReturn:
          return FbOpenConfirmBoxWithReturn_1.FbOpenConfirmBoxWithReturn.Create(
            t,
          );
        case fb_action_1.UnionOpenSystemBoardWithReturn
          .OpenFishingItemDeliveryWithReturn:
          return FbOpenFishingItemDeliveryWithReturn_1.FbOpenFishingItemDeliveryWithReturn.Create(
            t,
          );
        case fb_action_1.UnionOpenSystemBoardWithReturn
          .OpenSoaringChallengeResultWithReturn:
          return FbOpenSoaringChallengeResultWithReturn_1.FbOpenSoaringChallengeResultWithReturn.Create(
            t,
          );
        default:
          return;
      }
  }
}
exports.UnionOpenSystemBoardWithReturnHelper =
  UnionOpenSystemBoardWithReturnHelper;
//# sourceMappingURL=UnionOpenSystemBoardWithReturnHelper.js.map
