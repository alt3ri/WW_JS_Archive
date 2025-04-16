"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbSetReviveRegion = void 0);
class FbSetReviveRegion {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.u0h = !1),
      (this.d0h = void 0),
      (this.m0h = !1),
      (this.C0h = 0);
  }
  static Create(t) {
    if (t) return new FbSetReviveRegion(t);
  }
  get SetReviveType() {
    return (
      this.u0h ||
        ((this.u0h = !0), (this.d0h = this.FbDataInternal.setReviveType())),
      this.d0h
    );
  }
  get ReviveId() {
    return (
      this.m0h ||
        ((this.m0h = !0), (this.C0h = this.FbDataInternal.reviveId())),
      this.C0h
    );
  }
}
exports.FbSetReviveRegion = FbSetReviveRegion;
//# sourceMappingURL=FbSetReviveRegion.js.map
