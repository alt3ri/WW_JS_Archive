"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCategoryMatchingAnimation = void 0);
const FbVectorInfo_1 = require("../Var/FbVectorInfo");
class FbCategoryMatchingAnimation {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.bFh = !1),
      (this.LFh = void 0),
      (this.AFh = !1),
      (this.xFh = void 0),
      (this.RFh = !1),
      (this.wFh = void 0),
      (this.PFh = !1),
      (this.UFh = void 0),
      (this.DFh = !1),
      (this.BFh = void 0);
  }
  static Create(t) {
    if (t) return new FbCategoryMatchingAnimation(t);
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
  get MatchSequence() {
    return (
      this.PFh ||
        ((this.PFh = !0), (this.UFh = this.FbDataInternal.matchSequence())),
      this.UFh
    );
  }
  get MatchSequenceOffset() {
    return (
      this.DFh ||
        ((this.DFh = !0),
        (this.BFh = FbVectorInfo_1.FbVectorInfo.Create(
          this.FbDataInternal.matchSequenceOffset(),
        ))),
      this.BFh
    );
  }
}
exports.FbCategoryMatchingAnimation = FbCategoryMatchingAnimation;
//# sourceMappingURL=FbCategoryMatchingAnimation.js.map
