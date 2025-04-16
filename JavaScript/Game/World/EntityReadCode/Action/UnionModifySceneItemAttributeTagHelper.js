"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionModifySceneItemAttributeTagHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbModifySelfSceneItemAttributeTag_1 = require("./FbModifySelfSceneItemAttributeTag"),
  FbModifyTargetSceneItemAttributeTag_1 = require("./FbModifyTargetSceneItemAttributeTag");
class UnionModifySceneItemAttributeTagHelper {
  static GetUnionModifySceneItemAttributeTagObject(e) {
    switch (e) {
      case fb_action_1.UnionModifySceneItemAttributeTag
        .ModifySelfSceneItemAttributeTag:
        return new fb_action_1.ModifySelfSceneItemAttributeTag();
      case fb_action_1.UnionModifySceneItemAttributeTag
        .ModifyTargetSceneItemAttributeTag:
        return new fb_action_1.ModifyTargetSceneItemAttributeTag();
      default:
        return;
    }
  }
  static ReadUnionModifySceneItemAttributeTag(e, t) {
    if (void 0 !== t)
      switch (e) {
        case fb_action_1.UnionModifySceneItemAttributeTag
          .ModifySelfSceneItemAttributeTag:
          return FbModifySelfSceneItemAttributeTag_1.FbModifySelfSceneItemAttributeTag.Create(
            t,
          );
        case fb_action_1.UnionModifySceneItemAttributeTag
          .ModifyTargetSceneItemAttributeTag:
          return FbModifyTargetSceneItemAttributeTag_1.FbModifyTargetSceneItemAttributeTag.Create(
            t,
          );
        default:
          return;
      }
  }
}
exports.UnionModifySceneItemAttributeTagHelper =
  UnionModifySceneItemAttributeTagHelper;
//# sourceMappingURL=UnionModifySceneItemAttributeTagHelper.js.map
