"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbGuestOperateUiAnimation = void 0);
const UnionGuestOperateUiAnimationHelper_1 = require("./UnionGuestOperateUiAnimationHelper");
class FbGuestOperateUiAnimation {
  constructor(t) {
    (this.FbDataInternal = t), (this.Nkc = !1), (this.Vkc = void 0);
  }
  static Create(t) {
    if (t) return new FbGuestOperateUiAnimation(t);
  }
  get UiAnimationConfig() {
    var t, e;
    return (
      !this.Nkc &&
        ((this.Nkc = !0),
        (t = this.FbDataInternal.uiAnimationConfigType()),
        (e =
          UnionGuestOperateUiAnimationHelper_1.UnionGuestOperateUiAnimationHelper.GetUnionGuestOperateUiAnimationObject(
            t,
          ))) &&
        (this.Vkc =
          UnionGuestOperateUiAnimationHelper_1.UnionGuestOperateUiAnimationHelper.ReadUnionGuestOperateUiAnimation(
            t,
            this.FbDataInternal.uiAnimationConfig(e),
          )),
      this.Vkc
    );
  }
}
exports.FbGuestOperateUiAnimation = FbGuestOperateUiAnimation;
//# sourceMappingURL=FbGuestOperateUiAnimation.js.map
