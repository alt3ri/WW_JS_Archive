"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbHitLogicChangeNextAndLockTargetState = void 0);
class FbHitLogicChangeNextAndLockTargetState {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u_h = !1),
      (this.f8o = void 0),
      (this.IOh = !1),
      (this.TOh = void 0);
  }
  static Create(t) {
    if (t) return new FbHitLogicChangeNextAndLockTargetState(t);
  }
  get Type() {
    return (
      this.u_h || ((this.u_h = !0), (this.f8o = this.FbDataInternal.type())),
      this.f8o
    );
  }
  get TargetState() {
    return (
      this.IOh ||
        ((this.IOh = !0), (this.TOh = this.FbDataInternal.targetState())),
      this.TOh
    );
  }
}
exports.FbHitLogicChangeNextAndLockTargetState =
  FbHitLogicChangeNextAndLockTargetState;
//# sourceMappingURL=FbHitLogicChangeNextAndLockTargetState.js.map
