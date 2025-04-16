"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCategoryMatchingConfigBase = void 0);
const FbCategoryMatchingAnimationBase_1 = require("./FbCategoryMatchingAnimationBase"),
  FbCategoryMatchingCondition_1 = require("./FbCategoryMatchingCondition"),
  FbCategoryMatchingSucceedBase_1 = require("./FbCategoryMatchingSucceedBase");
class FbCategoryMatchingConfigBase {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this._Fh = !1),
      (this.cFh = void 0),
      (this.uFh = !1),
      (this.dFh = void 0);
  }
  static Create(t) {
    if (t) return new FbCategoryMatchingConfigBase(t);
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
          FbCategoryMatchingAnimationBase_1.FbCategoryMatchingAnimationBase.Create(
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
          FbCategoryMatchingSucceedBase_1.FbCategoryMatchingSucceedBase.Create(
            this.FbDataInternal.callback(),
          ))),
      this.dFh
    );
  }
}
exports.FbCategoryMatchingConfigBase = FbCategoryMatchingConfigBase;
//# sourceMappingURL=FbCategoryMatchingConfigBase.js.map
