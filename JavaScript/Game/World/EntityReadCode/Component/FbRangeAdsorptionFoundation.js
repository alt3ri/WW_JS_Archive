"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRangeAdsorptionFoundation = void 0);
const FbAdsorptionMatchingAnimation_1 = require("./FbAdsorptionMatchingAnimation"),
  FbCategoryMatchingAnimation_1 = require("./FbCategoryMatchingAnimation"),
  FbCategoryMatchingCondition_1 = require("./FbCategoryMatchingCondition"),
  FbCategoryMatchingSucceed_1 = require("./FbCategoryMatchingSucceed");
class FbRangeAdsorptionFoundation {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.f_h = !1),
      (this.X6o = void 0),
      (this._Fh = !1),
      (this.cFh = void 0),
      (this.YFh = !1),
      (this.zFh = void 0),
      (this.uFh = !1),
      (this.dFh = void 0);
  }
  static Create(t) {
    if (t) return new FbRangeAdsorptionFoundation(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
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
          FbAdsorptionMatchingAnimation_1.FbAdsorptionMatchingAnimation.Create(
            this.FbDataInternal.animation(),
          ))),
      this.cFh
    );
  }
  get CategoryAnimation() {
    return (
      this.YFh ||
        ((this.YFh = !0),
        (this.zFh =
          FbCategoryMatchingAnimation_1.FbCategoryMatchingAnimation.Create(
            this.FbDataInternal.categoryAnimation(),
          ))),
      this.zFh
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
}
exports.FbRangeAdsorptionFoundation = FbRangeAdsorptionFoundation;
//# sourceMappingURL=FbRangeAdsorptionFoundation.js.map
