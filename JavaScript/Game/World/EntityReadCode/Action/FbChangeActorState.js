"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeActorState = void 0);
class FbChangeActorState {
  constructor(t) {
    (this.FbDataInternal = t), (this.Bch = !1), (this.Cbo = void 0);
  }
  static Create(t) {
    if (t) return new FbChangeActorState(t);
  }
  get State() {
    return (
      this.Bch || ((this.Bch = !0), (this.Cbo = this.FbDataInternal.state())),
      this.Cbo
    );
  }
}
exports.FbChangeActorState = FbChangeActorState;
//# sourceMappingURL=FbChangeActorState.js.map
