"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbFailureConditionSequentialState = void 0);
class FbFailureConditionSequentialState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.FOh = !1),
      (this.NOh = void 0);
  }
  static Create(t) {
    if (t) return new FbFailureConditionSequentialState(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get Order() {
    if (!this.FOh) {
      (this.FOh = !0), (this.NOh = new Array());
      var i = this.FbDataInternal.orderLength();
      if (i)
        for (let t = 0; t < i; ++t) this.NOh.push(this.FbDataInternal.order(t));
    }
    return this.NOh;
  }
}
exports.FbFailureConditionSequentialState = FbFailureConditionSequentialState;
//# sourceMappingURL=FbFailureConditionSequentialState.js.map
