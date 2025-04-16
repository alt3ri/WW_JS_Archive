"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionRemovePreloadResourceConfigHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbRemovePreloadResourcePhantomCharacter_1 = require("./FbRemovePreloadResourcePhantomCharacter"),
  FbRemovePreloadResourceTrialCharacter_1 = require("./FbRemovePreloadResourceTrialCharacter");
class UnionRemovePreloadResourceConfigHelper {
  static GetUnionRemovePreloadResourceConfigObject(e) {
    switch (e) {
      case fb_action_1.UnionRemovePreloadResourceConfig
        .RemovePreloadResourcePhantomCharacter:
        return new fb_action_1.RemovePreloadResourcePhantomCharacter();
      case fb_action_1.UnionRemovePreloadResourceConfig
        .RemovePreloadResourceTrialCharacter:
        return new fb_action_1.RemovePreloadResourceTrialCharacter();
      default:
        return;
    }
  }
  static ReadUnionRemovePreloadResourceConfig(e, r) {
    if (void 0 !== r)
      switch (e) {
        case fb_action_1.UnionRemovePreloadResourceConfig
          .RemovePreloadResourcePhantomCharacter:
          return FbRemovePreloadResourcePhantomCharacter_1.FbRemovePreloadResourcePhantomCharacter.Create(
            r,
          );
        case fb_action_1.UnionRemovePreloadResourceConfig
          .RemovePreloadResourceTrialCharacter:
          return FbRemovePreloadResourceTrialCharacter_1.FbRemovePreloadResourceTrialCharacter.Create(
            r,
          );
        default:
          return;
      }
  }
}
exports.UnionRemovePreloadResourceConfigHelper =
  UnionRemovePreloadResourceConfigHelper;
//# sourceMappingURL=UnionRemovePreloadResourceConfigHelper.js.map
