"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionTalkBackgroundHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbTalkBackgroundClean_1 = require("./FbTalkBackgroundClean"),
  FbTalkBackgroundIcon_1 = require("./FbTalkBackgroundIcon"),
  FbTalkBackgroundImage_1 = require("./FbTalkBackgroundImage"),
  FbTalkBackgroundImageByMcGender_1 = require("./FbTalkBackgroundImageByMcGender"),
  FbTalkBackgroundSpineImage_1 = require("./FbTalkBackgroundSpineImage");
class UnionTalkBackgroundHelper {
  static GetUnionTalkBackgroundObject(a) {
    switch (a) {
      case fb_action_1.UnionTalkBackground.TalkBackgroundClean:
        return new fb_action_1.TalkBackgroundClean();
      case fb_action_1.UnionTalkBackground.TalkBackgroundIcon:
        return new fb_action_1.TalkBackgroundIcon();
      case fb_action_1.UnionTalkBackground.TalkBackgroundImage:
        return new fb_action_1.TalkBackgroundImage();
      case fb_action_1.UnionTalkBackground.TalkBackgroundImageByMcGender:
        return new fb_action_1.TalkBackgroundImageByMcGender();
      case fb_action_1.UnionTalkBackground.TalkBackgroundSpineImage:
        return new fb_action_1.TalkBackgroundSpineImage();
      default:
        return;
    }
  }
  static ReadUnionTalkBackground(a, e) {
    if (void 0 !== e)
      switch (a) {
        case fb_action_1.UnionTalkBackground.TalkBackgroundClean:
          return FbTalkBackgroundClean_1.FbTalkBackgroundClean.Create(e);
        case fb_action_1.UnionTalkBackground.TalkBackgroundIcon:
          return FbTalkBackgroundIcon_1.FbTalkBackgroundIcon.Create(e);
        case fb_action_1.UnionTalkBackground.TalkBackgroundImage:
          return FbTalkBackgroundImage_1.FbTalkBackgroundImage.Create(e);
        case fb_action_1.UnionTalkBackground.TalkBackgroundImageByMcGender:
          return FbTalkBackgroundImageByMcGender_1.FbTalkBackgroundImageByMcGender.Create(
            e,
          );
        case fb_action_1.UnionTalkBackground.TalkBackgroundSpineImage:
          return FbTalkBackgroundSpineImage_1.FbTalkBackgroundSpineImage.Create(
            e,
          );
        default:
          return;
      }
  }
}
exports.UnionTalkBackgroundHelper = UnionTalkBackgroundHelper;
//# sourceMappingURL=UnionTalkBackgroundHelper.js.map
