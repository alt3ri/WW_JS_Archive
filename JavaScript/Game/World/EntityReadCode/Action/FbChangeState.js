"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeState = void 0);
class FbChangeState {
  constructor(t) {
    (this.FbDataInternal = t), (this.Q_h = !1), (this.K_h = 0);
  }
  static Create(t) {
    if (t) return new FbChangeState(t);
  }
  get StateId() {
    return (
      this.Q_h || ((this.Q_h = !0), (this.K_h = this.FbDataInternal.stateId())),
      this.K_h
    );
  }
}
exports.FbChangeState = FbChangeState;
//# sourceMappingURL=FbChangeState.js.map
