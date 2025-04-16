"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbLockConfig = void 0);
class FbLockConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.eDh = !1),
      (this.tDh = !1),
      (this.iDh = !1),
      (this.rDh = void 0);
  }
  static Create(t) {
    if (t) return new FbLockConfig(t);
  }
  get IsInitLock() {
    return (
      this.eDh ||
        ((this.eDh = !0), (this.tDh = this.FbDataInternal.isInitLock())),
      this.tDh
    );
  }
  get LockType() {
    return (
      this.iDh ||
        ((this.iDh = !0), (this.rDh = this.FbDataInternal.lockType())),
      this.rDh
    );
  }
}
exports.FbLockConfig = FbLockConfig;
//# sourceMappingURL=FbLockConfig.js.map
