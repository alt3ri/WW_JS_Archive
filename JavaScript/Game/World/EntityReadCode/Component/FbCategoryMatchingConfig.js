"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCategoryMatchingConfig = void 0);
const FbCategoryMatchingAnimation_1 = require("./FbCategoryMatchingAnimation"),
  FbCategoryMatchingCondition_1 = require("./FbCategoryMatchingCondition"),
  FbCategoryMatchingSucceed_1 = require("./FbCategoryMatchingSucceed"),
  FbItemLockingConfig_1 = require("./FbItemLockingConfig");
class FbCategoryMatchingConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this._Fh = !1),
      (this.cFh = void 0),
      (this.uFh = !1),
      (this.dFh = void 0),
      (this.mFh = !1),
      (this.CFh = void 0);
  }
  static Create(t) {
    if (t) return new FbCategoryMatchingConfig(t);
  }
  get Condition() {
    return (
      this.f_h ||
        ((this.f_h = !0),
        (this.X6o =
          FbCategoryMatchingCondition_1.FbCategoryMatchingCondition.Create(
            this.FbDataInternal.condition(),
          ))),
      this.X6o
    );
  }
  get Animation() {
    return (
      this._Fh ||
        ((this._Fh = !0),
        (this.cFh =
          FbCategoryMatchingAnimation_1.FbCategoryMatchingAnimation.Create(
            this.FbDataInternal.animation(),
          ))),
      this.cFh
    );
  }
  get Callback() {
    return (
      this.uFh ||
        ((this.uFh = !0),
        (this.dFh =
          FbCategoryMatchingSucceed_1.FbCategoryMatchingSucceed.Create(
            this.FbDataInternal.callback(),
          ))),
      this.dFh
    );
  }
  get ItemLockingConfig() {
    return (
      this.mFh ||
        ((this.mFh = !0),
        (this.CFh = FbItemLockingConfig_1.FbItemLockingConfig.Create(
          this.FbDataInternal.itemLockingConfig(),
        ))),
      this.CFh
    );
  }
}
exports.FbCategoryMatchingConfig = FbCategoryMatchingConfig;
//# sourceMappingURL=FbCategoryMatchingConfig.js.map
