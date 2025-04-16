"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbChangeEntityCamp = void 0);
class FbChangeEntityCamp {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Hch = !1),
      (this.Wch = 0),
      (this.qwh = !1),
      (this.kwh = void 0);
  }
  static Create(t) {
    if (t) return new FbChangeEntityCamp(t);
  }
  get TargetEntity() {
    return (
      this.Hch ||
        ((this.Hch = !0), (this.Wch = this.FbDataInternal.targetEntity())),
      this.Wch
    );
  }
  get Camp() {
    return (
      this.qwh || ((this.qwh = !0), (this.kwh = this.FbDataInternal.camp())),
      this.kwh
    );
  }
}
exports.FbChangeEntityCamp = FbChangeEntityCamp;
//# sourceMappingURL=FbChangeEntityCamp.js.map
