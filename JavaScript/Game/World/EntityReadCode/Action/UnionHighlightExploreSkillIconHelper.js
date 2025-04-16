"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionHighlightExploreSkillIconHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbHideHighlightExploreSkillIcon_1 = require("./FbHideHighlightExploreSkillIcon"),
  FbShowHighlightExploreSkillIcon_1 = require("./FbShowHighlightExploreSkillIcon");
class UnionHighlightExploreSkillIconHelper {
  static GetUnionHighlightExploreSkillIconObject(i) {
    switch (i) {
      case fb_action_1.UnionHighlightExploreSkillIcon
        .HideHighlightExploreSkillIcon:
        return new fb_action_1.HideHighlightExploreSkillIcon();
      case fb_action_1.UnionHighlightExploreSkillIcon
        .ShowHighlightExploreSkillIcon:
        return new fb_action_1.ShowHighlightExploreSkillIcon();
      default:
        return;
    }
  }
  static ReadUnionHighlightExploreSkillIcon(i, e) {
    if (void 0 !== e)
      switch (i) {
        case fb_action_1.UnionHighlightExploreSkillIcon
          .HideHighlightExploreSkillIcon:
          return FbHideHighlightExploreSkillIcon_1.FbHideHighlightExploreSkillIcon.Create(
            e,
          );
        case fb_action_1.UnionHighlightExploreSkillIcon
          .ShowHighlightExploreSkillIcon:
          return FbShowHighlightExploreSkillIcon_1.FbShowHighlightExploreSkillIcon.Create(
            e,
          );
        default:
          return;
      }
  }
}
exports.UnionHighlightExploreSkillIconHelper =
  UnionHighlightExploreSkillIconHelper;
//# sourceMappingURL=UnionHighlightExploreSkillIconHelper.js.map
