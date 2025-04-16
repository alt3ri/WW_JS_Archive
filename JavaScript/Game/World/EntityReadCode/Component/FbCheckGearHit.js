"use strict";
Object.defineProperty(exports, "__esModule", { value: !0 }),
  (exports.FbCheckGearHit = void 0);
class FbCheckGearHit {
  constructor(t) {
    (this.FbDataInternal = t),
      (this.VOh = !1),
      (this.jOh = 0),
      (this.HOh = !1),
      (this.WOh = void 0),
      (this.QOh = !1),
      (this.KOh = void 0);
  }
  static Create(t) {
    if (t) return new FbCheckGearHit(t);
  }
  get HitIndex() {
    return (
      this.VOh ||
        ((this.VOh = !0), (this.jOh = this.FbDataInternal.hitIndex())),
      this.jOh
    );
  }
  get AffectIndex() {
    if (!this.HOh) {
      (this.HOh = !0), (this.WOh = new Array());
      var i = this.FbDataInternal.affectIndexLength();
      if (i)
        for (let t = 0; t < i; ++t)
          this.WOh.push(this.FbDataInternal.affectIndex(t));
    }
    return this.WOh;
  }
  get AffectType() {
    return (
      this.QOh ||
        ((this.QOh = !0), (this.KOh = this.FbDataInternal.affectType())),
      this.KOh
    );
  }
}
exports.FbCheckGearHit = FbCheckGearHit;
//# sourceMappingURL=FbCheckGearHit.js.map
