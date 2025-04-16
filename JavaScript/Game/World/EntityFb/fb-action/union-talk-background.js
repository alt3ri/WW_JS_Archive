"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.unionListToUnionTalkBackground =
    exports.unionToUnionTalkBackground =
    exports.UnionTalkBackground =
      void 0);
const talk_background_clean_js_1 = require("../fb-action/talk-background-clean.js"),
  talk_background_icon_js_1 = require("../fb-action/talk-background-icon.js"),
  talk_background_image_js_1 = require("../fb-action/talk-background-image.js"),
  talk_background_image_by_mc_gender_js_1 = require("../fb-action/talk-background-image-by-mc-gender.js"),
  talk_background_spine_image_js_1 = require("../fb-action/talk-background-spine-image.js");
var UnionTalkBackground;
function unionToUnionTalkBackground(a, n) {
  switch (UnionTalkBackground[a]) {
    case "NONE":
      return;
    case "TalkBackgroundClean":
      return n(new talk_background_clean_js_1.TalkBackgroundClean());
    case "TalkBackgroundIcon":
      return n(new talk_background_icon_js_1.TalkBackgroundIcon());
    case "TalkBackgroundImage":
      return n(new talk_background_image_js_1.TalkBackgroundImage());
    case "TalkBackgroundImageByMcGender":
      return n(
        new talk_background_image_by_mc_gender_js_1.TalkBackgroundImageByMcGender(),
      );
    case "TalkBackgroundSpineImage":
      return n(new talk_background_spine_image_js_1.TalkBackgroundSpineImage());
    default:
      return;
  }
}
function unionListToUnionTalkBackground(a, n, e) {
  switch (UnionTalkBackground[a]) {
    case "NONE":
      return;
    case "TalkBackgroundClean":
      return n(e, new talk_background_clean_js_1.TalkBackgroundClean());
    case "TalkBackgroundIcon":
      return n(e, new talk_background_icon_js_1.TalkBackgroundIcon());
    case "TalkBackgroundImage":
      return n(e, new talk_background_image_js_1.TalkBackgroundImage());
    case "TalkBackgroundImageByMcGender":
      return n(
        e,
        new talk_background_image_by_mc_gender_js_1.TalkBackgroundImageByMcGender(),
      );
    case "TalkBackgroundSpineImage":
      return n(
        e,
        new talk_background_spine_image_js_1.TalkBackgroundSpineImage(),
      );
    default:
      return;
  }
}
!(function (a) {
  (a[(a.NONE = 0)] = "NONE"),
    (a[(a.TalkBackgroundClean = 1)] = "TalkBackgroundClean"),
    (a[(a.TalkBackgroundIcon = 2)] = "TalkBackgroundIcon"),
    (a[(a.TalkBackgroundImage = 3)] = "TalkBackgroundImage"),
    (a[(a.TalkBackgroundImageByMcGender = 4)] =
      "TalkBackgroundImageByMcGender"),
    (a[(a.TalkBackgroundSpineImage = 5)] = "TalkBackgroundSpineImage");
})(
  (UnionTalkBackground =
    exports.UnionTalkBackground || (exports.UnionTalkBackground = {})),
),
  (exports.unionToUnionTalkBackground = unionToUnionTalkBackground),
  (exports.unionListToUnionTalkBackground = unionListToUnionTalkBackground);
//# sourceMappingURL=union-talk-background.js.map
