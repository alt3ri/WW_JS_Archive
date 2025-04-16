"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbUniversalTone = void 0);
class FbUniversalTone {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.Zfh = !1),
      (this.eph = 0),
      (this.tph = !1),
      (this.iph = 0);
  }
  static Create(t) {
    if (t) return new FbUniversalTone(t);
  }
  get UniversalToneId() {
    return (
      this.Zfh ||
        ((this.Zfh = !0), (this.eph = this.FbDataInternal.universalToneId())),
      this.eph
    );
  }
  get TimberId() {
    return (
      this.tph ||
        ((this.tph = !0), (this.iph = this.FbDataInternal.timberId())),
      this.iph
    );
  }
}
exports.FbUniversalTone = FbUniversalTone;
//# sourceMappingURL=FbUniversalTone.js.map
