"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbItemLockingConfig = void 0);
class FbItemLockingConfig {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.xEh = !1),
      (this.REh = void 0),
      (this.$Fh = !1),
      (this.XFh = void 0);
  }
  static Create(t) {
    if (t) return new FbItemLockingConfig(t);
  }
  get EffectPath() {
    return (
      this.xEh ||
        ((this.xEh = !0), (this.REh = this.FbDataInternal.effectPath())),
      this.REh
    );
  }
  get TeleControlPerform() {
    return (
      this.$Fh ||
        ((this.$Fh = !0),
        (this.XFh = this.FbDataInternal.teleControlPerform())),
      this.XFh
    );
  }
}
exports.FbItemLockingConfig = FbItemLockingConfig;
//# sourceMappingURL=FbItemLockingConfig.js.map
