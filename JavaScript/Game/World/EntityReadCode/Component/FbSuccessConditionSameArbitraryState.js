"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSuccessConditionSameArbitraryState = void 0);
class FbSuccessConditionSameArbitraryState {
  constructor(t) {
    (this.FbDataInternal = t), (this.u_h = !1), (this.f8o = void 0);
  }
  static Create(t) {
    if (t) return new FbSuccessConditionSameArbitraryState(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
}
exports.FbSuccessConditionSameArbitraryState =
  FbSuccessConditionSameArbitraryState;
//# sourceMappingURL=FbSuccessConditionSameArbitraryState.js.map
