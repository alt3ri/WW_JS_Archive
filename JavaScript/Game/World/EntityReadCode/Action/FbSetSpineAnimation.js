"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetSpineAnimation = void 0);
const UnionSetSpineAnimationHelper_1 = require("./UnionSetSpineAnimationHelper");
class FbSetSpineAnimation {
  constructor(i) {
    (this.FbDataInternal = i), (this.bSh = !1), (this.TAe = void 0);
  }
  static Create(i) {
    if (i) return new FbSetSpineAnimation(i);
  }
  get Config() {
    var i, e;
    return (
      !this.bSh &&
        ((this.bSh = !0),
        (i = this.FbDataInternal.configType()),
        (e =
          UnionSetSpineAnimationHelper_1.UnionSetSpineAnimationHelper.GetUnionSetSpineAnimationObject(
            i,
          ))) &&
        (this.TAe =
          UnionSetSpineAnimationHelper_1.UnionSetSpineAnimationHelper.ReadUnionSetSpineAnimation(
            i,
            this.FbDataInternal.config(e),
          )),
      this.TAe
    );
  }
}
exports.FbSetSpineAnimation = FbSetSpineAnimation;
//# sourceMappingURL=FbSetSpineAnimation.js.map
