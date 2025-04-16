"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionEnableSubLevelTransitionHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbEnableSubLevelTransitionWithSceneCapture_1 = require("./FbEnableSubLevelTransitionWithSceneCapture");
class UnionEnableSubLevelTransitionHelper {
  static GetUnionEnableSubLevelTransitionObject(e) {
    if (
      e ===
      fb_action_1.UnionEnableSubLevelTransition
        .EnableSubLevelTransitionWithSceneCapture
    )
      return new fb_action_1.EnableSubLevelTransitionWithSceneCapture();
  }
  static ReadUnionEnableSubLevelTransition(e, n) {
    return void 0 !== n &&
      e ===
        fb_action_1.UnionEnableSubLevelTransition
          .EnableSubLevelTransitionWithSceneCapture
      ? FbEnableSubLevelTransitionWithSceneCapture_1.FbEnableSubLevelTransitionWithSceneCapture.Create(
          n,
        )
      : void 0;
  }
}
exports.UnionEnableSubLevelTransitionHelper =
  UnionEnableSubLevelTransitionHelper;
//# sourceMappingURL=UnionEnableSubLevelTransitionHelper.js.map
