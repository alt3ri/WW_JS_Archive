"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbClientPreEnableSubLevels = void 0);
const UnionEnableSubLevelTransitionHelper_1 = require("./UnionEnableSubLevelTransitionHelper");
class FbClientPreEnableSubLevels {
  constructor(e) {
    (this.FbDataInternal = e),
      (this.R8_ = !1),
      (this.A8_ = void 0),
      (this.x8_ = !1),
      (this.P8_ = void 0),
      (this.L0h = !1),
      (this.khi = void 0);
  }
  static Create(e) {
    if (e) return new FbClientPreEnableSubLevels(e);
  }
  get EnableLevels() {
    if (!this.R8_) {
      (this.R8_ = !0), (this.A8_ = new Array());
      var i = this.FbDataInternal.enableLevelsLength();
      if (i)
        for (let e = 0; e < i; ++e)
          this.A8_.push(this.FbDataInternal.enableLevels(e));
    }
    return this.A8_;
  }
  get DisableLevels() {
    if (!this.x8_) {
      (this.x8_ = !0), (this.P8_ = new Array());
      var i = this.FbDataInternal.disableLevelsLength();
      if (i)
        for (let e = 0; e < i; ++e)
          this.P8_.push(this.FbDataInternal.disableLevels(e));
    }
    return this.P8_;
  }
  get TransitionOption() {
    var e, i;
    return (
      !this.L0h &&
        ((this.L0h = !0),
        (e = this.FbDataInternal.transitionOptionType()),
        (i =
          UnionEnableSubLevelTransitionHelper_1.UnionEnableSubLevelTransitionHelper.GetUnionEnableSubLevelTransitionObject(
            e,
          ))) &&
        (this.khi =
          UnionEnableSubLevelTransitionHelper_1.UnionEnableSubLevelTransitionHelper.ReadUnionEnableSubLevelTransition(
            e,
            this.FbDataInternal.transitionOption(i),
          )),
      this.khi
    );
  }
}
exports.FbClientPreEnableSubLevels = FbClientPreEnableSubLevels;
//# sourceMappingURL=FbClientPreEnableSubLevels.js.map
