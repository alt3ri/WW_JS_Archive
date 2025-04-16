"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetForceLock = void 0);
class FbSetForceLock {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.a_h = !1),
      (this.I9o = 0),
      (this.$ph = !1),
      (this.Xph = !1);
  }
  static Create(t) {
    if (t) return new FbSetForceLock(t);
  }
  get EntityId() {
    return (
      this.a_h ||
        ((this.a_h = !0), (this.I9o = this.FbDataInternal.entityId())),
      this.I9o
    );
  }
  get IsLocked() {
    return (
      this.$ph ||
        ((this.$ph = !0), (this.Xph = this.FbDataInternal.isLocked())),
      this.Xph
    );
  }
}
exports.FbSetForceLock = FbSetForceLock;
//# sourceMappingURL=FbSetForceLock.js.map
