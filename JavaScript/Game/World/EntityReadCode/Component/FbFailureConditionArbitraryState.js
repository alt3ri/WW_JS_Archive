"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFailureConditionArbitraryState = void 0);
class FbFailureConditionArbitraryState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.Bch = !1),
      (this.Cbo = void 0);
  }
  static Create(t) {
    if (t) return new FbFailureConditionArbitraryState(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
}
exports.FbFailureConditionArbitraryState = FbFailureConditionArbitraryState;
//# sourceMappingURL=FbFailureConditionArbitraryState.js.map
