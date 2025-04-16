"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbPlayGuestUiAnimation = void 0);
const UnionPlayGuestUiAnimationTypeHelper_1 = require("./UnionPlayGuestUiAnimationTypeHelper");
class FbPlayGuestUiAnimation {
  constructor(i) {
    (this.FbDataInternal = i),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.yqc = !1),
      (this.Sqc = void 0);
  }
  static Create(i) {
    if (i) return new FbPlayGuestUiAnimation(i);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get PlayGuestUiAnimation() {
    var i, t;
    return (
      !this.yqc &&
        ((this.yqc = !0),
        (i = this.FbDataInternal.playGuestUiAnimationType()),
        (t =
          UnionPlayGuestUiAnimationTypeHelper_1.UnionPlayGuestUiAnimationTypeHelper.GetUnionPlayGuestUiAnimationTypeObject(
            i,
          ))) &&
        (this.Sqc =
          UnionPlayGuestUiAnimationTypeHelper_1.UnionPlayGuestUiAnimationTypeHelper.ReadUnionPlayGuestUiAnimationType(
            i,
            this.FbDataInternal.playGuestUiAnimation(t),
          )),
      this.Sqc
    );
  }
}
exports.FbPlayGuestUiAnimation = FbPlayGuestUiAnimation;
//# sourceMappingURL=FbPlayGuestUiAnimation.js.map
