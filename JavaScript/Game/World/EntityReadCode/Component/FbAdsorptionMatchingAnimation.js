"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbAdsorptionMatchingAnimation = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbAdsorptionMatchingAnimation {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.bFh = !1),
      (this.LFh = void 0),
      (this.AFh = !1),
      (this.xFh = void 0),
      (this.RFh = !1),
      (this.wFh = void 0),
      (this.JFh = !1),
      (this.ZFh = void 0);
  }
  static Create(t) {
    if (t) return new FbAdsorptionMatchingAnimation(t);
  }
  get MatchPos() {
    return (
      this.bFh ||
        ((this.bFh = !0),
        (this.LFh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.matchPos(),
        ))),
      this.LFh
    );
  }
  get MatchRot() {
    return (
      this.AFh ||
        ((this.AFh = !0),
        (this.xFh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.matchRot(),
        ))),
      this.xFh
    );
  }
  get MatchReferenceKey() {
    return (
      this.RFh ||
        ((this.RFh = !0), (this.wFh = this.FbDataInternal.matchReferenceKey())),
      this.wFh
    );
  }
  get MoveCurve() {
    return (
      this.JFh ||
        ((this.JFh = !0), (this.ZFh = this.FbDataInternal.moveCurve())),
      this.ZFh
    );
  }
}
exports.FbAdsorptionMatchingAnimation = FbAdsorptionMatchingAnimation;
//# sourceMappingURL=FbAdsorptionMatchingAnimation.js.map
