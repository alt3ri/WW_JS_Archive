"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetTimeLockState = void 0);
class FbSetTimeLockState {
  constructor(t) {
    (this.FbDataInternal = t), (this.ibh = !1), (this.rbh = void 0);
  }
  static Create(t) {
    if (t) return new FbSetTimeLockState(t);
  }
  get LockState() {
    return (
      this.ibh ||
        ((this.ibh = !0), (this.rbh = this.FbDataInternal.lockState())),
      this.rbh
    );
  }
}
exports.FbSetTimeLockState = FbSetTimeLockState;
//# sourceMappingURL=FbSetTimeLockState.js.map
