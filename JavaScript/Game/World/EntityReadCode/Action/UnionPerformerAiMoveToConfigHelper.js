"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionPerformerAiMoveToConfigHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbPerformerAiMoveToEntity_1 = require("./FbPerformerAiMoveToEntity"),
  FbPerformerAiMoveToPlayer_1 = require("./FbPerformerAiMoveToPlayer"),
  FbPerformerAiMoveToPosition_1 = require("./FbPerformerAiMoveToPosition");
class UnionPerformerAiMoveToConfigHelper {
  static GetUnionPerformerAiMoveToConfigObject(e) {
    switch (e) {
      case fb_action_1.UnionPerformerAiMoveToConfig.PerformerAiMoveToEntity:
        return new fb_action_1.PerformerAiMoveToEntity();
      case fb_action_1.UnionPerformerAiMoveToConfig.PerformerAiMoveToPlayer:
        return new fb_action_1.PerformerAiMoveToPlayer();
      case fb_action_1.UnionPerformerAiMoveToConfig.PerformerAiMoveToPosition:
        return new fb_action_1.PerformerAiMoveToPosition();
      default:
        return;
    }
  }
  static ReadUnionPerformerAiMoveToConfig(e, r) {
    if (void 0 !== r)
      switch (e) {
        case fb_action_1.UnionPerformerAiMoveToConfig.PerformerAiMoveToEntity:
          return FbPerformerAiMoveToEntity_1.FbPerformerAiMoveToEntity.Create(
            r,
          );
        case fb_action_1.UnionPerformerAiMoveToConfig.PerformerAiMoveToPlayer:
          return FbPerformerAiMoveToPlayer_1.FbPerformerAiMoveToPlayer.Create(
            r,
          );
        case fb_action_1.UnionPerformerAiMoveToConfig.PerformerAiMoveToPosition:
          return FbPerformerAiMoveToPosition_1.FbPerformerAiMoveToPosition.Create(
            r,
          );
        default:
          return;
      }
  }
}
exports.UnionPerformerAiMoveToConfigHelper = UnionPerformerAiMoveToConfigHelper;
//# sourceMappingURL=UnionPerformerAiMoveToConfigHelper.js.map
