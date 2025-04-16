"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbUnlockTeleportTrigger = void 0);
class FbUnlockTeleportTrigger {
  constructor(t) {
    (this.FbDataInternal = t), (this.h0h = !1), (this.l0h = 0);
  }
  static Create(t) {
    if (t) return new FbUnlockTeleportTrigger(t);
  }
  get TeleportId() {
    return (
      this.h0h ||
        ((this.h0h = !0), (this.l0h = this.FbDataInternal.teleportId())),
      this.l0h
    );
  }
}
exports.FbUnlockTeleportTrigger = FbUnlockTeleportTrigger;
//# sourceMappingURL=FbUnlockTeleportTrigger.js.map
