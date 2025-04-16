"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionPreloadObjectTypeConfigHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbPreloadFlows_1 = require("./FbPreloadFlows"),
  FbPreloadPhantomCharacterForSkill_1 = require("./FbPreloadPhantomCharacterForSkill"),
  FbPreloadTrialCharacterForSkill_1 = require("./FbPreloadTrialCharacterForSkill");
class UnionPreloadObjectTypeConfigHelper {
  static GetUnionPreloadObjectTypeConfigObject(e) {
    switch (e) {
      case fb_action_1.UnionPreloadObjectTypeConfig.PreloadFlows:
        return new fb_action_1.PreloadFlows();
      case fb_action_1.UnionPreloadObjectTypeConfig
        .PreloadPhantomCharacterForSkill:
        return new fb_action_1.PreloadPhantomCharacterForSkill();
      case fb_action_1.UnionPreloadObjectTypeConfig
        .PreloadTrialCharacterForSkill:
        return new fb_action_1.PreloadTrialCharacterForSkill();
      default:
        return;
    }
  }
  static ReadUnionPreloadObjectTypeConfig(e, r) {
    if (void 0 !== r)
      switch (e) {
        case fb_action_1.UnionPreloadObjectTypeConfig.PreloadFlows:
          return FbPreloadFlows_1.FbPreloadFlows.Create(r);
        case fb_action_1.UnionPreloadObjectTypeConfig
          .PreloadPhantomCharacterForSkill:
          return FbPreloadPhantomCharacterForSkill_1.FbPreloadPhantomCharacterForSkill.Create(
            r,
          );
        case fb_action_1.UnionPreloadObjectTypeConfig
          .PreloadTrialCharacterForSkill:
          return FbPreloadTrialCharacterForSkill_1.FbPreloadTrialCharacterForSkill.Create(
            r,
          );
        default:
          return;
      }
  }
}
exports.UnionPreloadObjectTypeConfigHelper = UnionPreloadObjectTypeConfigHelper;
//# sourceMappingURL=UnionPreloadObjectTypeConfigHelper.js.map
