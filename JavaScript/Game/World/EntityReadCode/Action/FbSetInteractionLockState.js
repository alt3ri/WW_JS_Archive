"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetInteractionLockState = void 0);
class FbSetInteractionLockState {
  constructor(t) {
    (this.FbDataInternal = t), (this.OAh = !1), (this.FAh = !1);
  }
  static Create(t) {
    if (t) return new FbSetInteractionLockState(t);
  }
  get IsLock() {
    return (
      this.OAh || ((this.OAh = !0), (this.FAh = this.FbDataInternal.isLock())),
      this.FAh
    );
  }
}
exports.FbSetInteractionLockState = FbSetInteractionLockState;
//# sourceMappingURL=FbSetInteractionLockState.js.map
