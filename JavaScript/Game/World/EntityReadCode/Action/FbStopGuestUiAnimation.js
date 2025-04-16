"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbStopGuestUiAnimation = void 0);
const UnionStopGuestUiAnimationTypeHelper_1 = require("./UnionStopGuestUiAnimationTypeHelper");
class FbStopGuestUiAnimation {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Mqc = !1),
      (this.Eqc = void 0);
  }
  static Create(t) {
    if (t) return new FbStopGuestUiAnimation(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get StopGuestUiAnimation() {
    var t, i;
    return (
      !this.Mqc &&
        ((this.Mqc = !0),
        (t = this.FbDataInternal.stopGuestUiAnimationType()),
        (i =
          UnionStopGuestUiAnimationTypeHelper_1.UnionStopGuestUiAnimationTypeHelper.GetUnionStopGuestUiAnimationTypeObject(
            t,
          ))) &&
        (this.Eqc =
          UnionStopGuestUiAnimationTypeHelper_1.UnionStopGuestUiAnimationTypeHelper.ReadUnionStopGuestUiAnimationType(
            t,
            this.FbDataInternal.stopGuestUiAnimation(i),
          )),
      this.Eqc
    );
  }
}
exports.FbStopGuestUiAnimation = FbStopGuestUiAnimation;
//# sourceMappingURL=FbStopGuestUiAnimation.js.map
