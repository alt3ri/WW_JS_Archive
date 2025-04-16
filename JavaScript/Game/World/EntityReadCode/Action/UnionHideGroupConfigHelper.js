"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionHideGroupConfigHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbHideSpecifyEntityGroup_1 = require("./FbHideSpecifyEntityGroup"),
  FbHideWorldEntityAndLevelPlayGroup_1 = require("./FbHideWorldEntityAndLevelPlayGroup"),
  FbHideWorldMonsterAndMonsterTreasureGroup_1 = require("./FbHideWorldMonsterAndMonsterTreasureGroup");
class UnionHideGroupConfigHelper {
  static GetUnionHideGroupConfigObject(e) {
    switch (e) {
      case fb_action_1.UnionHideGroupConfig.HideSpecifyEntityGroup:
        return new fb_action_1.HideSpecifyEntityGroup();
      case fb_action_1.UnionHideGroupConfig.HideWorldEntityAndLevelPlayGroup:
        return new fb_action_1.HideWorldEntityAndLevelPlayGroup();
      case fb_action_1.UnionHideGroupConfig
        .HideWorldMonsterAndMonsterTreasureGroup:
        return new fb_action_1.HideWorldMonsterAndMonsterTreasureGroup();
      default:
        return;
    }
  }
  static ReadUnionHideGroupConfig(e, r) {
    if (void 0 !== r)
      switch (e) {
        case fb_action_1.UnionHideGroupConfig.HideSpecifyEntityGroup:
          return FbHideSpecifyEntityGroup_1.FbHideSpecifyEntityGroup.Create(r);
        case fb_action_1.UnionHideGroupConfig.HideWorldEntityAndLevelPlayGroup:
          return FbHideWorldEntityAndLevelPlayGroup_1.FbHideWorldEntityAndLevelPlayGroup.Create(
            r,
          );
        case fb_action_1.UnionHideGroupConfig
          .HideWorldMonsterAndMonsterTreasureGroup:
          return FbHideWorldMonsterAndMonsterTreasureGroup_1.FbHideWorldMonsterAndMonsterTreasureGroup.Create(
            r,
          );
        default:
          return;
      }
  }
}
exports.UnionHideGroupConfigHelper = UnionHideGroupConfigHelper;
//# sourceMappingURL=UnionHideGroupConfigHelper.js.map
