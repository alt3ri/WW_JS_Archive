"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionHideRangeConfigHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbHideWorldEntityAndLevelPlay_1 = require("./FbHideWorldEntityAndLevelPlay"),
  FbHideWorldMonsterAndMonsterTreasure_1 = require("./FbHideWorldMonsterAndMonsterTreasure");
class UnionHideRangeConfigHelper {
  static GetUnionHideRangeConfigObject(e) {
    switch (e) {
      case fb_action_1.UnionHideRangeConfig.HideWorldEntityAndLevelPlay:
        return new fb_action_1.HideWorldEntityAndLevelPlay();
      case fb_action_1.UnionHideRangeConfig.HideWorldMonsterAndMonsterTreasure:
        return new fb_action_1.HideWorldMonsterAndMonsterTreasure();
      default:
        return;
    }
  }
  static ReadUnionHideRangeConfig(e, n) {
    if (void 0 !== n)
      switch (e) {
        case fb_action_1.UnionHideRangeConfig.HideWorldEntityAndLevelPlay:
          return FbHideWorldEntityAndLevelPlay_1.FbHideWorldEntityAndLevelPlay.Create(
            n,
          );
        case fb_action_1.UnionHideRangeConfig
          .HideWorldMonsterAndMonsterTreasure:
          return FbHideWorldMonsterAndMonsterTreasure_1.FbHideWorldMonsterAndMonsterTreasure.Create(
            n,
          );
        default:
          return;
      }
  }
}
exports.UnionHideRangeConfigHelper = UnionHideRangeConfigHelper;
//# sourceMappingURL=UnionHideRangeConfigHelper.js.map
