"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbRestorePhantomFormation = void 0);
class FbRestorePhantomFormation {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.$Th = !1),
      (this.XTh = 0),
      (this.ybh = !1),
      (this.Sbh = !1);
  }
  static Create(t) {
    if (t) return new FbRestorePhantomFormation(t);
  }
  get TeleportEntityId() {
    return (
      this.$Th ||
        ((this.$Th = !0), (this.XTh = this.FbDataInternal.teleportEntityId())),
      this.XTh
    );
  }
  get RetainPhantom() {
    return (
      this.ybh ||
        ((this.ybh = !0), (this.Sbh = this.FbDataInternal.retainPhantom())),
      this.Sbh
    );
  }
}
exports.FbRestorePhantomFormation = FbRestorePhantomFormation;
//# sourceMappingURL=FbRestorePhantomFormation.js.map
