"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbEnableTemporaryTeleport = void 0);
class FbEnableTemporaryTeleport {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Jch = !1),
      (this.l7 = !1),
      (this.ILh = !1),
      (this.TLh = 0);
  }
  static Create(t) {
    if (t) return new FbEnableTemporaryTeleport(t);
  }
  get Enable() {
    return (
      this.Jch || ((this.Jch = !0), (this.l7 = this.FbDataInternal.enable())),
      this.l7
    );
  }
  get RangeEntity() {
    return (
      this.ILh ||
        ((this.ILh = !0), (this.TLh = this.FbDataInternal.rangeEntity())),
      this.TLh
    );
  }
}
exports.FbEnableTemporaryTeleport = FbEnableTemporaryTeleport;
//# sourceMappingURL=FbEnableTemporaryTeleport.js.map
