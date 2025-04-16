"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.UnionSetSpineAnimationHelper = void 0);
const fb_action_1 = require("../../../../Game/World/EntityFb/fb-action"),
  FbPlaySpineAnimation_1 = require("./FbPlaySpineAnimation");
class UnionSetSpineAnimationHelper {
  static GetUnionSetSpineAnimationObject(i) {
    if (i === fb_action_1.UnionSetSpineAnimation.PlaySpineAnimation)
      return new fb_action_1.PlaySpineAnimation();
  }
  static ReadUnionSetSpineAnimation(i, n) {
    return void 0 !== n &&
      i === fb_action_1.UnionSetSpineAnimation.PlaySpineAnimation
      ? FbPlaySpineAnimation_1.FbPlaySpineAnimation.Create(n)
      : void 0;
  }
}
exports.UnionSetSpineAnimationHelper = UnionSetSpineAnimationHelper;
//# sourceMappingURL=UnionSetSpineAnimationHelper.js.map
