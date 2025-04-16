"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSceneInteractionOperationHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbDisableSceneInteractionOperation_1 = require("./FbDisableSceneInteractionOperation"),
  FbEnableSceneInteractionOperation_1 = require("./FbEnableSceneInteractionOperation");
class UnionSceneInteractionOperationHelper {
  static GetUnionSceneInteractionOperationObject(e) {
    switch (e) {
      case fb_action_1.UnionSceneInteractionOperation
        .DisableSceneInteractionOperation:
        return new fb_action_1.DisableSceneInteractionOperation();
      case fb_action_1.UnionSceneInteractionOperation
        .EnableSceneInteractionOperation:
        return new fb_action_1.EnableSceneInteractionOperation();
      default:
        return;
    }
  }
  static ReadUnionSceneInteractionOperation(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_action_1.UnionSceneInteractionOperation
          .DisableSceneInteractionOperation:
          return FbDisableSceneInteractionOperation_1.FbDisableSceneInteractionOperation.Create(
            n,
          );
        case fb_action_1.UnionSceneInteractionOperation
          .EnableSceneInteractionOperation:
          return FbEnableSceneInteractionOperation_1.FbEnableSceneInteractionOperation.Create(
            n,
          );
        default:
          return;
      }
  }
}
exports.UnionSceneInteractionOperationHelper =
  UnionSceneInteractionOperationHelper;
//# sourceMappingURL=UnionSceneInteractionOperationHelper.js.map
