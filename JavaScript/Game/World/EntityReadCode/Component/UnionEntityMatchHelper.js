"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionEntityMatchHelper = void 0);
const fb_component_1 = require("../../../../Game/World/EntityFb/fb-component"),
  FbEntityMatchAllCharacter_1 = require("./FbEntityMatchAllCharacter"),
  FbEntityMatchDynamic_1 = require("./FbEntityMatchDynamic"),
  FbEntityMatchPlayer_1 = require("./FbEntityMatchPlayer");
class UnionEntityMatchHelper {
  static GetUnionEntityMatchObject(t) {
    switch (t) {
      case fb_component_1.UnionEntityMatch.EntityMatchAllCharacter:
        return new fb_component_1.EntityMatchAllCharacter();
      case fb_component_1.UnionEntityMatch.EntityMatchDynamic:
        return new fb_component_1.EntityMatchDynamic();
      case fb_component_1.UnionEntityMatch.EntityMatchPlayer:
        return new fb_component_1.EntityMatchPlayer();
      default:
        return;
    }
  }
  static ReadUnionEntityMatch(t, e) {
    if (void 0 !== e)
      switch (t) {
        case fb_component_1.UnionEntityMatch.EntityMatchAllCharacter:
          return FbEntityMatchAllCharacter_1.FbEntityMatchAllCharacter.Create(
            e,
          );
        case fb_component_1.UnionEntityMatch.EntityMatchDynamic:
          return FbEntityMatchDynamic_1.FbEntityMatchDynamic.Create(e);
        case fb_component_1.UnionEntityMatch.EntityMatchPlayer:
          return FbEntityMatchPlayer_1.FbEntityMatchPlayer.Create(e);
        default:
          return;
      }
  }
}
exports.UnionEntityMatchHelper = UnionEntityMatchHelper;
//# sourceMappingURL=UnionEntityMatchHelper.js.map
