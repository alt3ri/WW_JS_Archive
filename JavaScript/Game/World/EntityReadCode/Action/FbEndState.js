"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEndState = void 0);
class FbEndState {
  constructor(t) {
    (this.FbDataInternal = t), (this.q1_ = !1), (this.k1_ = void 0);
  }
  static Create(t) {
    if (t) return new FbEndState(t);
  }
  get StayFlowMontageActors() {
    if (!this.q1_) {
      (this.q1_ = !0), (this.k1_ = new Array());
      var s = this.FbDataInternal.stayFlowMontageActorsLength();
      if (s)
        for (let t = 0; t < s; ++t)
          this.k1_.push(this.FbDataInternal.stayFlowMontageActors(t));
    }
    return this.k1_;
  }
}
exports.FbEndState = FbEndState;
//# sourceMappingURL=FbEndState.js.map
