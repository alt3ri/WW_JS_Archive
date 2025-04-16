"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeBehaviorState = void 0);
class FbChangeBehaviorState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Q_h = !1),
      (this.K_h = 0),
      (this.qch = !1),
      (this.kch = !1);
  }
  static Create(t) {
    if (t) return new FbChangeBehaviorState(t);
  }
  get StateId() {
    return (
      this.Q_h || ((this.Q_h = !0), (this.K_h = this.FbDataInternal.stateId())),
      this.K_h
    );
  }
  get IsInstant() {
    return (
      this.qch ||
        ((this.qch = !0), (this.kch = this.FbDataInternal.isInstant())),
      this.kch
    );
  }
}
exports.FbChangeBehaviorState = FbChangeBehaviorState;
//# sourceMappingURL=FbChangeBehaviorState.js.map
