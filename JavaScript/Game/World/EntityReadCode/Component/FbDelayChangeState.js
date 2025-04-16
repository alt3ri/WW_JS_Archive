"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbDelayChangeState = void 0);
class FbDelayChangeState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Fph = !1),
      (this.Nph = 0),
      (this.JUh = !1),
      (this.ZUh = void 0);
  }
  static Create(t) {
    if (t) return new FbDelayChangeState(t);
  }
  get Time() {
    return (
      this.Fph || ((this.Fph = !0), (this.Nph = this.FbDataInternal.time())),
      this.Nph
    );
  }
  get NewState() {
    return (
      this.JUh ||
        ((this.JUh = !0), (this.ZUh = this.FbDataInternal.newState())),
      this.ZUh
    );
  }
}
exports.FbDelayChangeState = FbDelayChangeState;
//# sourceMappingURL=FbDelayChangeState.js.map
